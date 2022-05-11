import React from "react";
import { Link } from "react-router-dom";

import "../CSS/home.css";

const Home = props => {

    return(
        <div className="wrapper h-screen">
            <nav className="navigation absolute h-screen flex-auto flex-col w-24 z-10">
                <Link to="/">
                <img className="mx-auto mb-60 relative top-10 hover:cursor-pointer" src={require("../Icons-IMG/unsc.png")} alt="UNSC logo" width="45" height="72" />
                </Link>

                <div className="mx-auto w-fit shadow-md shadow-black/25 p-2 mb-10 rounded">
                <img className="home" src={require("../Icons-IMG/dashboard.png")} alt="Dashboard icon" width="36" height="36" />
                </div>
                
                <div className="mx-auto w-fit mb-10 hover:shadow-md hover:shadow-black/25 p-2 rounded">
                <img className="search" src={require("../Icons-IMG/search.png")} alt="" width="36" height="36" />
                </div>
               
                <div className="mx-auto w-fit mb-10 hover:shadow-md hover:shadow-black/25 p-2 rounded">
                <img className="settings" src={require("../Icons-IMG/settings.png")} alt="" width="36" height="36"/>
                </div>
                
                <div className="mx-auto w-12 mb-10 hover:shadow-md hover:shadow-black/25 p-2 rounded">
                <img className="details mx-auto" src={require("../Icons-IMG/details.png")} alt="" width="26" height="48" />
                </div>
            </nav>
            <img className="w-screen h-screen opacity-20 grayscale" src={require("../Icons-IMG/background.jpg")} alt=""/>
        </div>
    )
}

export default Home;