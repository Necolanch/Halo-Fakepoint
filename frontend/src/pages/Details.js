import React, {useState, useEffect} from "react";

import DetailsNavigation from "../components/DetailsNavigation";

import {GiDeathSkull, GiTargeted, GiStopwatch, GiLaurelsTrophy, GiStarMedal, GiFire, GiHealthDecrease, GiInternalInjury} from "react-icons/gi";
import {FaPercentage, FaHandshake} from "react-icons/fa";

import "../CSS/details.css";

const Details = props => {
    const [summary, setSummary]=useState([]);
    const [damage, setDamage]=useState([]);
    const [shots, setShots]=useState([]);
    const [kd, setKd]=useState([]);

    useEffect(() => {
        const getStats = async () => {
            await fetch(`http://localhost:3001/`)
            .then(response=>response.json())
            .then(result=>{
                const setAll = (res) => {
                    setSummary(res[0].records.pvp.core.summary);
                    setKd(res[0].records.pvp.core.kdr.toFixed(2));
                    setDamage(res[0].records.pvp.core.damage);
                    setShots(res[0].records.pvp.core.shots);
                }
            setAll(result);
            })
        }
        getStats();
        return;
    }, []);

    const damagePerGame = damage.average;
    const accuracy = shots.accuracy;
    
    return (
        <div>
        <DetailsNavigation />

        <h1 className="absolute text-3xl font-bold text-white ml-40 mt-6">Halo Fakepoint</h1>
           
            <div className="flex justify-end">
            <div className="avatar absolute w-8 h-8 mt-4 mr-6"><p className="text-center mt-1">NC</p></div>
            </div>

        <div className="serviceRecord absolute flex w-11/12 top-20 ml-32 text-white z-10">
            <section className="w-1/2 z-10">
              <section className="w-1/2">
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

              <section className="w-2/3 mt-4">
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
                        <span className="ml-16">Dealt/Game &nbsp; {Math.floor(damagePerGame)}</span>
                    </li>
                </ul>
              </section>

              <section className="w-2/3 mt-4">
                <h5 className="text-xl font-medium">Overall Accuracy Stats</h5>
                <ul className="flex flex-wrap">
                    <li>
                    <GiHealthDecrease className="damage -mb-5"/>
                    <span className="ml-8">Landed &nbsp; {shots.landed}</span>
                    </li>
                    <li>
                        <GiInternalInjury className="damage -mb-5 ml-8"/>
                        <span className="ml-16">Missed &nbsp; {shots.missed}</span>
                    </li>
                    <li>
                        <FaPercentage className="damage -mb-5 ml-8"/>
                        <span className="ml-16">Accuracy &nbsp; {Math.floor(accuracy)}%</span>
                    </li>
                </ul>
              </section>

              <section className="w-1/2">
                <h5 className="text-xl font-medium">Overall Gunfight Breakdown</h5>
                <ul className="flex flex-wrap">
                    <li>
                    <GiDeathSkull className="gunfight -mb-5"/>
                    <span className="ml-8">Kills &nbsp; {}</span>
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
            </section>

            <section className="w-1/2">
            <h5 className="text-xl font-medium">Ranked Gunfight Stats</h5>
            </section>
        </div>

        <img className="w-screen h-screen opacity-10 grayscale" src={require("../Icons-IMG/background.jpg")} alt="" width="2000" height="1270" />
        </div>
    )
}

export default Details;