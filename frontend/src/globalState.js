import {useRef, useState} from "react";

const GlobalState = () => {
    const gamertag = useRef("NecolanchTTV");
    const [searchGamertag, setSearchGamertag]=useState("");

    return {
        gamertag,
        searchGamertag,
        setSearchGamertag
    }
}

export default GlobalState;