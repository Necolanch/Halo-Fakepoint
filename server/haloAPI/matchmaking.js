const lib = require("lib")({token: 'tok_dev_epDvcXBVJ6echxsc8BqwurRoWqHgUXJnigVzar9guAqyg3eG3RXh4oSpxxRwapox'});

const generalStats = async () => {
    try {
        const res = await Promise.all([
            lib.halo.infinite["@1.3.1"].stats.players["service-record"].multiplayer.matchmade({
                gamertag:"NecolanchTTV",
                season:1
            }),
            lib.halo.infinite['@1.3.1'].metadata.multiplayer.medals()
        ]);
        const data = res.map(res=>res.data);
        return data.flat();
    } catch {
        throw Error("Promise failed");
    }
    //const result = await lib.halo.infinite["@1.3.1"].stats.players["service-record"].multiplayer.matchmade({
    //    gamertag:"NecolanchTTV",
    //    season:1
    //});
    //return result
};

module.exports = {generalStats}