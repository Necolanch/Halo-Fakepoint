import {useRef, useState} from "react";

const GlobalState = () => {
    const gamertag = useRef("NecolanchTTV");
    const [searchGamertag, setSearchGamertag]=useState("");
    const [searchSeason, setSearchSeason]=useState("");

    return {
        gamertag,
        searchGamertag,
        searchSeason,
        setSearchGamertag, 
        setSearchSeason
    }
}

export default GlobalState;