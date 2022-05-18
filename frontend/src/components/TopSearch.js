import React from "react";

import "../CSS/search.css";

const TopSearch = props => {

    return (
        <form className="absolute w-screen flex justify-center items-center mt-6 z-10">
            <div className="inputBorder border p-1">
                <input className="searchInput p-1" placeholder="Gamertag"></input>
            </div>
            <div className="inputBorder border p-1 ml-6 w-24">
                <input className="searchInput w-full p-1" type="number" placeholder="Season"></input>
            </div>
            <div className="inputBorder border ml-6 p-1">
            <button className="searchButton p-1 w-20" type="submit">Search</button>
            </div>
        </form>
    )
}

export default TopSearch;