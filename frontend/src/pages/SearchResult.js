import React, {useState, useEffect, useRef, useContext} from "react";

import SearchNavigation from "../components/SearchNavigation";
import TopSearch from "../components/TopSearch";

import {GiDeathSkull, GiFire, GiHealthDecrease, GiInternalInjury, GiBullseye, GiTargeted, GiMailedFist, GiGrenade, GiNinjaHead, GiMissileSwarm, GiBattleTank, GiLaurelsTrophy, GiStopwatch, GiExitDoor, GiStarMedal} from "react-icons/gi";
import {FaPercentage, FaHandshake, FaThumbsDown, FaEquals} from "react-icons/fa";
import {MdClose} from "react-icons/md";
import {ImSigma} from "react-icons/im"

import { GamertagContext } from "../contexts/Gamertag";

import "../CSS/details.css";

const SearchResult = props => {
    const {searchGamertag, searchSeason} = useContext(GamertagContext);

    const [summary, setSummary]=useState([]);
    const [damage, setDamage]=useState([]);
    const [shots, setShots]=useState([]);
    const [kd, setKd]=useState([]);
    const [matches, setMatches]=useState([]);
    const [matchStats, setMatchStats]=useState({})
    const [breakdown, setBreakdown]=useState({});
    const [vehicle, setVehicle]=useState({});
    const [timePlayed, setTimePlayed]=useState("");

    const [rankedSummary, setRankedSummary]=useState([]);
    const [rankedDamage, setRankedDamage]=useState([]);
    const [rankedShots, setRankedShots]=useState([]);
    const [rankedKd, setRankedKd]=useState([]);
    const [rankedMatches, setRankedMatches]=useState([]);
    const [rankedMatchStats, setRankedMatchStats]=useState({});
    const [rankedBreakdown, setRankedBreakdown]=useState({});
    const [rankedTimePlayed, setRankedTimePlayed]=useState("");
    const [rank, setRank]=useState({});

    const medals = useRef([]);
    const newMedals = useRef([]);

    useEffect(() => {
        const getStats = async () => {
            await fetch(`http://localhost:3001/${searchGamertag}/${searchSeason}`)
            .then(response=>response.json())
            .then(result=>{
                const setAll = (res) => {
                    console.log(res)
                    setSummary(res[0].records.pvp.core.summary);
                    setDamage(res[0].records.pvp.core.damage);
                    setShots(res[0].records.pvp.core.shots);
                    setMatches(res[0].records.pvp.matches.outcomes);
                    setMatchStats(res[0].records.pvp.matches);
                    setTimePlayed(res[0].records.pvp.time_played.human);
                    setBreakdown(res[0].records.pvp.core.breakdowns.kills);
                    setVehicle(res[0].records.pvp.core.breakdowns.kills.vehicles);
                    setKd(res[0].records.pvp.core.kdr.toFixed(2));

                    setRankedSummary(res[0].records.ranked.core.summary);
                    setRankedDamage(res[0].records.ranked.core.damage);
                    setRankedShots(res[0].records.ranked.core.shots);
                    setRankedMatches(res[0].records.ranked.matches.outcomes);
                    setRankedMatchStats(res[0].records.ranked.matches);
                    setRankedTimePlayed(res[0].records.ranked.time_played.human);
                    setRankedBreakdown(res[0].records.ranked.core.breakdowns.kills);
                    const crossplay = [...res[1]].filter(obj=>obj.input==="crossplay");
                    setRank(crossplay[0].response.all_time);
                    setRankedKd(res[0].records.ranked.core.kdr.toFixed(2));

                    newMedals.current=[];
                    medals.current=res[0].records.pvp.core.breakdowns.medals;
                    for (let i = 0; i < 15; i++) {
                        let newMedal = {};
                        res[3].forEach(medal=>{
                           if(medal.id === medals.current[i].id){
                                newMedal = {
                                    id:medal.id,
                                    name:medal.name,
                                    text:medal.description,
                                    icon:medal.image_urls.medium,
                                    count:medals.current[i].count
                                }
                                newMedals.current = [...newMedals.current, newMedal];
                            };
                        });
                    };
                }
            setAll(result);
            })
        }
        getStats();
        return;
    }, [searchGamertag, searchSeason, medals]);
    
    return (
        <div>
        <SearchNavigation />

        <h1 className="absolute text-3xl font-bold text-white ml-40 mt-6">Halo Fakepoint</h1>
           
            <div className="flex justify-end">
            <div className="avatar absolute w-8 h-8 mt-4 mr-6"><p className="text-center mt-1">NC</p></div>
            </div>

        <TopSearch/>

        <div className="serviceRecord absolute flex w-11/12 top-20 ml-32 text-white z-10">
        <section className="w-1/2">
            <section className="w-3/5">
                <h5 className="text-xl font-medium">Overall Gunfight Stats</h5>
                <ul className="flex flex-wrap">
                    <li>
                    <GiDeathSkull className="gunfight -mb-5"/>
                    <span className="ml-8">Kills &nbsp; {summary.kills}</span>
                    </li>
                    <li>
                        <img className="-mb-5 ml-8" src={require("../Icons-IMG/tombstone.png")} alt="" width="20" height="20"/>
                        <span className="ml-16">Deaths &nbsp; {summary.deaths}</span>
                    </li>
                    <li>
                        <FaPercentage className="gunfight kdratio ml-8"/>
                        <span className="ml-16">K/D Ratio &nbsp; {kd}</span>
                    </li>

                    <div className="mt-4 flex">
                    <li>
                    <FaHandshake className="gunfight -mb-5"/>
                        <span className="ml-8">Assists &nbsp; {summary.assists}</span>
                    </li>
                    <li className="ml-8">
                        <GiFire className="gunfight -mb-5"/>
                        <span className="ml-8">Highest Streak &nbsp; {summary.max_killing_spree}</span>
                    </li>
                    </div>
                </ul>
              </section>

              <section className="w-2/3 mt-8">
                <h5 className="text-xl font-medium">Overall Damage Stats</h5>
                <ul className="flex flex-wrap">
                    <li>
                    <GiHealthDecrease className="damage -mb-5"/>
                    <span className="ml-8">Taken &nbsp; {damage.taken}</span>
                    </li>
                    <li>
                        <GiInternalInjury className="damage -mb-5 ml-8"/>
                        <span className="ml-16">Dealt &nbsp; {damage.dealt}</span>
                    </li>
                    <li>
                        <FaPercentage className="damage -mb-5 ml-8"/>
                        <span className="ml-16">Dealt/Game &nbsp; {Math.floor(damage.average)}</span>
                    </li>
                </ul>
              </section>

              <section className="w-2/3 mt-8">
                <h5 className="text-xl font-medium">Overall Accuracy Stats</h5>
                <ul className="flex flex-wrap">
                    <li>
                    <GiBullseye className="gunfight -mb-5"/>
                    <span className="ml-8">Landed &nbsp; {shots.landed}</span>
                    </li>
                    <li>
                    <MdClose className="gunfight -mb-5 ml-8 relative top-0.5"/>
                        <span className="ml-16">Missed &nbsp; {shots.missed}</span>
                    </li>
                    <li>
                        <FaPercentage className="damage -mb-5 ml-8"/>
                        <span className="ml-16">Accuracy &nbsp; {Math.floor(shots.accuracy)}%</span>
                    </li>
                </ul>
              </section>

              <section className="w-3/5 mt-8">
                <h5 className="text-xl font-medium">Overall Gunfight Breakdown</h5>
                <ul className="flex flex-wrap">
                    <li>
                        <GiTargeted className="gunfight kdratio -mb-5"/>
                        <span className="ml-8">Headshots &nbsp; {breakdown.headshots}</span>
                    </li>
                    <li className="ml-8">
                    <GiMailedFist className="gunfight -mb-5"/>
                    <span className="ml-8">Melee &nbsp; {breakdown.melee}</span>
                    </li>
                    <li>
                        <GiGrenade className="gunfight -mb-5 ml-8"/>
                        <span className="ml-16">Grenade &nbsp; {breakdown.grenades}</span>
                    </li>

                    <div className="mt-8 flex">
                    <li>
                    <GiNinjaHead className="gunfight -mb-5"/>
                        <span className="ml-8">Assassinations &nbsp; {breakdown.assassinations}</span>
                    </li>
                    <li className="ml-8">
                        <GiMissileSwarm className="gunfight -mb-5"/>
                        <span className="ml-8">Power Weapon &nbsp; {breakdown.power_weapons}</span>
                    </li>
                    <li className="ml-8">
                        <GiBattleTank className="gunfight -mb-5"/>
                        <span className="ml-8">Vehicle &nbsp; {vehicle.splatters}</span>
                    </li>
                    </div>
                </ul>
              </section>

              <section className="w-3/4 mt-8">
                <h5 className="text-xl font-medium">Overall Match Stats</h5>
                <ul className="flex flex-wrap">
                    <li>
                        <GiLaurelsTrophy className="gunfight kdratio -mb-5"/>
                        <span className="ml-8">Wins &nbsp; {matches.wins}</span>
                    </li>
                    <li className="ml-8">
                    <FaThumbsDown className="gunfight -mb-5"/>
                    <span className="ml-8">Losses &nbsp; {matches.losses}</span>
                    </li>
                    <li>
                        <FaEquals className="gunfight -mb-5 ml-8"/>
                        <span className="ml-16">Draws &nbsp; {matches.draws}</span>
                    </li>
                    <li>
                        <GiStopwatch className="gunfight -mb-5 ml-8"/>
                        <span className="ml-16">Time Played &nbsp; {timePlayed}</span>
                    </li>

                    <div className="mt-8 flex">
                    <li>
                    <GiExitDoor className="gunfight -mb-5"/>
                        <span className="ml-8">Left &nbsp; {matches.left}</span>
                    </li>
                    <li className="ml-8">
                        <ImSigma className="gunfight -mb-5"/>
                        <span className="ml-8">Games Played &nbsp; {matchStats.total}</span>
                    </li>
                    <li className="ml-8">
                        <FaPercentage className="gunfight -mb-5"/>
                        <span className="ml-8">Win Rate &nbsp; {Math.floor(matchStats.win_rate)}%</span>
                    </li>
                    </div>
                </ul>
              </section>
            </section>

            <section className="w-1/2 z-10">
              <section className="w-3/5">
                <h5 className="text-xl font-medium">Ranked Gunfight Stats</h5>
                <ul className="flex flex-wrap">
                    <li>
                    <GiDeathSkull className="gunfight -mb-5"/>
                    <span className="ml-8">Kills &nbsp; {rankedSummary.kills}</span>
                    </li>
                    <li>
                        <img className="-mb-5 ml-8" src={require("../Icons-IMG/tombstone.png")} alt="" width="20" height="20"/>
                        <span className="ml-16">Deaths &nbsp; {rankedSummary.deaths}</span>
                    </li>
                    <li>
                        <FaPercentage className="gunfight kdratio ml-8"/>
                        <span className="ml-16">K/D Ratio &nbsp; {rankedKd}</span>
                    </li>

                    <div className="mt-4 flex">
                    <li>
                    <FaHandshake className="gunfight -mb-5"/>
                        <span className="ml-8">Assists &nbsp; {rankedSummary.assists}</span>
                    </li>
                    <li className="ml-8">
                        <GiFire className="gunfight -mb-5"/>
                        <span className="ml-8">Highest Streak &nbsp; {rankedSummary.max_killing_spree}</span>
                    </li>
                    </div>
                </ul>
              </section>

              <section className="w-2/3 mt-8">
                <h5 className="text-xl font-medium">Ranked Damage Stats</h5>
                <ul className="flex flex-wrap">
                    <li>
                    <GiHealthDecrease className="damage -mb-5"/>
                    <span className="ml-8">Taken &nbsp; {rankedDamage.taken}</span>
                    </li>
                    <li>
                        <GiInternalInjury className="damage -mb-5 ml-8"/>
                        <span className="ml-16">Dealt &nbsp; {rankedDamage.dealt}</span>
                    </li>
                    <li>
                        <FaPercentage className="damage -mb-5 ml-8"/>
                        <span className="ml-16">Dealt/Game &nbsp; {Math.floor(rankedDamage.average)}</span>
                    </li>
                </ul>
              </section>

              <section className="w-2/3 mt-8">
                <h5 className="text-xl font-medium">Ranked Accuracy Stats</h5>
                <ul className="flex flex-wrap">
                    <li>
                    <GiBullseye className="gunfight -mb-5"/>
                    <span className="ml-8">Landed &nbsp; {rankedShots.landed}</span>
                    </li>
                    <li>
                    <MdClose className="gunfight -mb-5 ml-8 relative top-0.5"/>
                        <span className="ml-16">Missed &nbsp; {rankedShots.missed}</span>
                    </li>
                    <li>
                        <FaPercentage className="damage -mb-5 ml-8"/>
                        <span className="ml-16">Accuracy &nbsp; {Math.floor(rankedShots.accuracy)}%</span>
                    </li>
                </ul>
              </section>

              <section className="w-3/5 mt-8">
                <h5 className="text-xl font-medium">Ranked Gunfight Breakdown</h5>
                <ul className="flex flex-wrap">
                    <li>
                        <GiTargeted className="gunfight kdratio -mb-5"/>
                        <span className="ml-8">Headshots &nbsp; {rankedBreakdown.headshots}</span>
                    </li>
                    <li className="ml-8">
                    <GiMailedFist className="gunfight -mb-5"/>
                    <span className="ml-8">Melee &nbsp; {rankedBreakdown.melee}</span>
                    </li>
                    <li>
                        <GiGrenade className="gunfight -mb-5 ml-8"/>
                        <span className="ml-16">Grenade &nbsp; {rankedBreakdown.grenades}</span>
                    </li>

                    <div className="mt-8 flex">
                    <li>
                    <GiNinjaHead className="gunfight -mb-5"/>
                        <span className="ml-8">Assassinations &nbsp; {rankedBreakdown.assassinations}</span>
                    </li>
                    <li className="ml-8">
                        <GiMissileSwarm className="gunfight -mb-5"/>
                        <span className="ml-8">Power Weapon &nbsp; {rankedBreakdown.power_weapons}</span>
                    </li>
                    </div>
                </ul>
              </section>

              <section className="w-3/4 mt-8">
                <h5 className="text-xl font-medium">Ranked Match Stats</h5>
                <ul className="flex flex-wrap">
                    <li>
                        <GiLaurelsTrophy className="gunfight kdratio -mb-5"/>
                        <span className="ml-8">Wins &nbsp; {rankedMatches.wins}</span>
                    </li>
                    <li className="ml-8">
                    <FaThumbsDown className="gunfight -mb-5"/>
                    <span className="ml-8">Losses &nbsp; {rankedMatches.losses}</span>
                    </li>
                    <li>
                        <FaEquals className="gunfight -mb-5 ml-8"/>
                        <span className="ml-16">Draws &nbsp; {rankedMatches.draws}</span>
                    </li>
                    <li>
                        <GiStopwatch className="gunfight -mb-5 ml-8"/>
                        <span className="ml-16">Time Played &nbsp; {rankedTimePlayed}</span>
                    </li>

                    <div className="mt-8 flex">
                    <li>
                    <GiStarMedal className="gunfight -mb-5"/>
                        <span className="ml-8">Rank &nbsp; <img className="-mt-6 ml-20" src={rank.tier_image_url} alt="" width="25" height="25"/> {rank.tier} {rank.sub_tier}</span>
                    </li>
                    <li className="ml-8">
                        <ImSigma className="gunfight -mb-5"/>
                        <span className="ml-8">Games Played &nbsp; {rankedMatchStats.total}</span>
                    </li>
                    <li className="ml-8">
                        <FaPercentage className="gunfight -mb-5"/>
                        <span className="ml-8">Win Rate &nbsp; {Math.floor(rankedMatchStats.win_rate)}%</span>
                    </li>
                    </div>
                </ul>
              </section>
            </section>
        </div>

        <section className="medals absolute top-3/4 ml-28 w-12/12 flex flex-wrap items-center z-10">
            <h3 className="absolute mb-72 text-white text-2xl font-semibold">Medals</h3>
            {
                newMedals.current.map((medal, index)=>{
                    if (index > 14) {
                        return null;
                    }
                    return(
                        <div key={medal.id} className="w-52 z-10 mb-10 flex items-center p-2 text-white">
                        <span className="text-lg">{medal.count}</span><span><img src={medal.icon} alt="" width="50" height="50"/></span>
                        <div className="font-medium">{medal.name}
                        <p className="text-xs">{medal.text}</p>
                        </div>
                        </div>
                    )
                })
            }
        </section>

        <img className="w-screen h-screen opacity-10 grayscale" src={require("../Icons-IMG/background.jpg")} alt="" width="2000" height="1270" />
        </div>
    )
}

export default SearchResult;