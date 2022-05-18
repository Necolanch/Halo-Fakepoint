const lib = require("lib")({token: 'tok_dev_epDvcXBVJ6echxsc8BqwurRoWqHgUXJnigVzar9guAqyg3eG3RXh4oSpxxRwapox'});

const generalStats = async (gamertag,season) => {
    try {
        const res = await Promise.all([
            lib.halo.infinite["@1.3.1"].stats.players["service-record"].multiplayer.matchmade({
                gamertag:gamertag,
                season:parseInt(season)
            }),
            lib.halo.infinite['@1.3.1'].stats.players.csrs({
                gamertag: gamertag,
                season: parseInt(season)
            }),
            lib.halo.infinite['@1.3.1'].appearance.players['spartan-id']({
                gamertag: gamertag
            }),
            lib.halo.infinite['@1.3.1'].metadata.multiplayer.medals()
        ]);
        if (res[0].error) {
            const error = res.map(res=>res.error);
            return error;
        } else {
        const data = res.map(res=>res.data);
        return data;
        }
    } catch {
        throw Error("Promise failed");
    }
};

module.exports = {generalStats}