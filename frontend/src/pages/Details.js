import React, {useState, useEffect} from "react";

import DetailsNavigation from "../components/DetailsNavigation";

const Details = props => {
    const [summary, setSummary]=useState([]);

    useEffect(() => {
        const getStats = async () => {
            await fetch(`http://localhost:3001/`)
            .then(response=>response.json())
            .then(result=>{
                const setAll = (res) => {
                    setSummary(res[0].records.pvp.core.summary);
                }
            setAll(result);
            })
        }
        getStats();
        return;
    }, []);
    
    return (
        <div>
        <DetailsNavigation />

        <h1 className="absolute text-3xl font-bold text-white ml-40 mt-6">Halo Fakepoint</h1>
           
            <div className="flex justify-end">
            <div className="avatar absolute w-8 h-8 mt-4 mr-6"><p className="text-center mt-1">NC</p></div>
            </div>

        <div className="absolute top-20 left-28 text-white">
            <section>
                <h5 className="">Overall Gunfight Stats</h5>
                <ul>
                    <li>
                    <img className="-mb-5" src={require("../Icons-IMG/death-skull.png")} alt="" width="20" height="20" /> 
                    <span className="ml-8">Kills &nbsp; {summary.kills}</span>
                    </li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </section>
        </div>

        <img className="w-screen h-screen opacity-10 grayscale" src={require("../Icons-IMG/background.jpg")} alt="" width="2000" height="1270" />
        </div>
    )
}

export default Details;