import React from "react";

import SettingsNavigation from "../components/SettingsNavigation";
import { LeftInput, RightInput, RightDisabled } from "../components/Input";

import "../CSS/settings.css";

const Settings = props => {
    return(
        <div>
            <SettingsNavigation/>

            <h1 className="absolute text-3xl font-bold text-white ml-40 mt-6">Halo Fakepoint</h1>
           
            <div className="flex justify-end">
            <div className="avatar absolute w-16 h-16 top-40 right-1/2 -mr-8 z-10"><p className="text-center mt-4 text-3xl">NC</p></div>
            </div>

            <h3 className="absolute w-screen text-center text-3xl uppercase font-semibold text-white mt-16">Settings</h3>

            <form className="searchForm absolute w-2/5 h-3/5 flex flex-col items-center top-1/3 left-1/4 ml-20 z-10 border">
              <div className="mt-40">
                <div className="flex mb-20">

                  <LeftInput label="First Name" value="Nicholas" />

                  <RightInput label="Last Name" value="Cruz" />
                </div>

                <div className="flex">

                  <LeftInput label="Email" value="necolanch@gmail.com" />

                  <RightDisabled label="Gamertag" value="NecolanchTTV" />
                </div>

              </div>

              <div className="inputBorder border p-2 mt-20">
              <button className="submitButton w-24 p-2 text-lg">Submit</button>
              </div>
            </form>

            <img className="w-screen h-screen opacity-10 grayscale" src={require("../Icons-IMG/background.jpg")} alt="" width="2000" height="1270" />
        </div>
    )
}

export default Settings;