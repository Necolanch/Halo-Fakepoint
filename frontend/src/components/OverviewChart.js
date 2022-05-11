import React, {useState, useEffect} from "react";

const Overview = props => (
    <div>
    <p>{props.summary.kills}</p>
    <p>{props.damage.average}</p>
    </div>
)


export default function OverviewChart() {
    const [summary, setSummary] = useState([]);
    const [damage, setDamage] = useState([]);

    useEffect(() => {
        const getStats = async () => {
            await fetch(`http://localhost:3001/`)
            .then(response=>response.json())
            .then(result=>{
                const setAll = (res) => {
                setSummary(res[0].records.pvp.core.summary);
                setDamage(res[0].records.pvp.core.damage);
                }
            setAll(result);
            })
        }
        getStats();
        return;
    }, []);

    return(
        <Overview summary={summary} damage={damage}/>
    )
}