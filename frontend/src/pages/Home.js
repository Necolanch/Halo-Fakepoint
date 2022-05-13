import React, {useState, useEffect} from "react";

//import OverviewChart from "../components/OverviewChart";
import HomeNavigation from "../components/HomeNavigation";

import {GiDeathSkull, GiTargeted, GiStopwatch, GiLaurelsTrophy, GiStarMedal} from "react-icons/gi";
import {FaPercentage} from "react-icons/fa";

import "../CSS/home.css";

const Home = props => {
    const [summary, setSummary] = useState([]);
    const [breakdowns, setBreakdowns]=useState([]);
    const [timePlayed, setTimePlayed]=useState([]);
    const [wins, setWins]=useState([]);
    const [kd, setKd]=useState([]);
    const [rank, setRank]=useState([]);
    const [id, setId]=useState([]);

    useEffect(() => {
        const getStats = async () => {
            await fetch(`http://localhost:3001/`)
            .then(response=>response.json())
            .then(result=>{
                const setAll = (res) => {
                setSummary(res[0].records.pvp.core.summary);
                setBreakdowns(res[0].records.pvp.core.breakdowns.kills);
                setTimePlayed(res[0].records.pvp.time_played.human);
                setWins(res[0].records.pvp.matches.outcomes.wins);
                setKd(res[0].records.pvp.core.kdr.toFixed(2));

                const crossplay = [...res[1]].filter(obj=>obj.input==="crossplay");
                setRank(crossplay[0].response.all_time);
                setId(res[2].service_tag);
                }
            setAll(result);
            })
        }
        getStats();
        return;
    }, []);

    return(
        <div className="wrapper h-screen">
            <HomeNavigation/>
            <h1 className="absolute text-3xl font-bold text-white ml-40 mt-6">Halo Fakepoint</h1>
            <div className="flex justify-end">
            <div className="avatar absolute w-8 h-8 mt-4 mr-6"><p className="text-center mt-1">NC</p></div>
            </div>
        <section className="absolute w-screen text-white flex justify-end mt-72 -ml-40 text-xl">
            <h3 className="-mt-32 text-2xl font-semibold">Welcome Spartan <span className="serviceTag">{id}</span>!</h3>
          <div className="-mt-10 -mr-80 text-2xl font-semibold underline uppercase">
            Overview
          </div>
            <ul className="text-right mr-28">
                <li className="mb-4">
                    <GiDeathSkull className="skull -mb-6 ml-24"/> 
                    Kills &nbsp; {summary.kills}
                </li> 
                <li className="mb-4 mr-6"> 
                <GiTargeted className="headshots -mb-6 ml-6"/>
                Headshots &nbsp; {breakdowns.headshots}</li>
                <li className="mb-4">
                <GiStopwatch className="stopwatch -mb-6 -ml-10"/>
                    Time Played &nbsp; {timePlayed}</li>
            </ul>
            <ul className="">
                <li className="wins">
                    {wins} &nbsp; Wins <GiLaurelsTrophy className="trophy -mt-7 ml-24"/>
                </li>
                <li className="kd ml-6">
                    {kd} &nbsp; KDR <FaPercentage className="percentage -mt-6 ml-24"/>
                </li>
                <li className="rank">
                    {rank.tier} {rank.sub_tier} Rank <GiStarMedal className="medal -mt-6 ml-36"/>
                </li>
            </ul>
        </section>
            <img className="bg w-screen h-screen opacity-10 grayscale" src={require("../Icons-IMG/background.jpg")} alt="" width="2000" height="1270" />
        </div>
    )
}

export default Home;