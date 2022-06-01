import React, {useEffect, useState} from "react";

const Avatar = () => {
    const [spartan, setSpartan]=useState({});
    useEffect(()=>{
        const getPic = async () => {
        await fetch(`http://localhost:3001/`)
        .then(response=>response.json())
        .then(result=>{
            result.forEach(res=>{
                if (res.service_tag) {
                    setSpartan(res);
                }
            })
        })
      }
      getPic();
    },[])

    return(
        <div className="flex justify-end">
            <div className="avatar absolute w-8 h-8 mt-4 mr-6 p-1 z-10">
                <img className="border-none" src={spartan.emblem_url} alt="" width="35" height="35"/>
            </div>
            </div>
    )
}

const SettingsAvatar = () => {
    const [spartan, setSpartan]=useState({});
    useEffect(()=>{
        fetch(`http://localhost:3001/`)
        .then(response=>response.json())
        .then(result=>{
            result.forEach(res=>{
                if (res.service_tag) {
                    setSpartan(res);
                }
            })
        })
    },[])

    return(
        <div className="flex justify-end">
            <div className="avatar absolute w-16 h-16 top-40 right-1/2 -mr-8 z-10 p-1">
                <img className="border-none" src={spartan.emblem_url} alt="" width="65" height="65"/>
            </div>
            </div>
    )
}

export {Avatar, SettingsAvatar};