import React, {useState, useEffect} from "react";

//import OverviewChart from "../components/OverviewChart";
import Navigation from "../components/Navigation";

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
            <Navigation/>
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
                    <img className="-mb-6 ml-24" src={require("../Icons-IMG/death-skull.png")} alt="" width="25" height="25" /> 
                    Kills &nbsp; {summary.kills}
                </li> 
                <li className="mb-4 mr-6"> 
                <img className="-mb-6 ml-6" src={require("../Icons-IMG/targeted.png")} alt="" width="25" height="25" />
                Headshots &nbsp; {breakdowns.headshots}</li>
                <li className="mb-4">
                <img className="-mb-6 -ml-10" src={require("../Icons-IMG/stopwatch.png")} alt="" width="25" height="25" />
                    Time Played &nbsp; {timePlayed}</li>
            </ul>
            <ul className="">
                <li className="mb-5">
                    {wins} &nbsp; Wins <img className="-mt-7 ml-24" src={require("../Icons-IMG/laurels-trophy.png")} alt="" width="25" height="25" />
                </li>
                <li className="mb-5 ml-6">
                    {kd} &nbsp; KDR <img className="-mt-6 ml-24" src={require("../Icons-IMG/percent-solid.png")} alt="" width="18" height="18" />
                </li>
                <li className="mb-4">
                    {rank.tier} {rank.sub_tier} Rank <img className="-mt-6 ml-36" src={require("../Icons-IMG/star-medal.png")} alt="" width="20" height="20" />
                </li>
            </ul>
        </section>
            <img className="w-screen h-screen opacity-10 grayscale" src={require("../Icons-IMG/background.jpg")} alt="" width="2000" height="1270" />
        </div>
    )
}

export default Home;