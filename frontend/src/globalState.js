import {useRef, useState} from "react";

const GlobalState = () => {
    const gamertag = useRef("NecolanchTTV");
    const [searchGamertag, setSearchGamertag]=useState("");
    const [searchSeason, setSearchSeason]=useState("");
    const firstNameInput = useRef("");
    const lastNameInput = useRef("");
    const emailInput = useRef("");

    return {
        gamertag,
        searchGamertag,
        searchSeason,
        firstNameInput,
        lastNameInput,
        emailInput,
        setSearchGamertag, 
        setSearchSeason
    }
}

export default GlobalState;