import React, {useState, useEffect, useRef, useContext} from "react";
import { useNavigate } from "react-router-dom";

import SearchNavigation from "../components/SearchNavigation";

import { GamertagContext } from "../contexts/Gamertag";

import "../CSS/search.css";

const Search = props => {
  const [playerSearched, setPlayerSearched]=useState(false);
  const navigate = useNavigate();
  const {setSearchGamertag}=useContext(GamertagContext);

  //Make a function to be called that handles the form submission
  //When form is submitted, retrieve value from the search input and return Details page view
  //Fetch data from server/API with value from search input

  const gamertag=useRef("");

  const searchPlayer = async(gt, event) => {
    //Use state variable for if a player is searched, set to false initially. If that is true
    //and valid, return should be of Details page component with gamertag prop passed in
    //If false do another ternary asking if errorStatus is true or false, if true return
    //search page with error message, if false return Search page as normal
    event.preventDefault();
    setSearchGamertag(gt);
    await fetch(`http://localhost:3001/${gt}`)
    .then(response=>response.json())
    .then(result=>{
      if (result.message) {
        if (document.querySelector(".error")) {
          return null;
        } else {
        const error = document.createElement("div");
        error.className="error flex items-center mt-8";
        error.innerHTML=`<img class="errorIcon" src=${require("../Icons-IMG/error.png")} alt="" width="35" height="35"/> <span class="errorMessage text-red-500 ml-4">PLAYER NOT FOUND</span>`;
        document.querySelector(".searchForm").appendChild(error);
        }
      } else{
        setPlayerSearched(true)
      }
    })
  }

useEffect(()=>{
  if (playerSearched===true) {
      navigate("/result");
  }
}, [playerSearched, navigate])

    return(
        <div className="wrapper h-screen">
            <SearchNavigation/>

            <h1 className="absolute text-3xl font-bold text-white ml-40 mt-6">Halo Fakepoint</h1>
           
            <div className="flex justify-end">
            <div className="avatar absolute w-8 h-8 mt-4 mr-6"><p className="text-center mt-1">NC</p></div>
            </div>

          <div className="search">
            <h3 className="absolute w-screen text-center text-3xl uppercase font-semibold text-white mt-16">Search</h3>
        
            <form onSubmit={event=>searchPlayer(gamertag.current.value, event)} className="searchForm absolute w-screen flex flex-col items-center mt-96 z-10">
            <p className="text-xl text-white font-medium">FIND SERVICE RECORDS OF OTHER PLAYERS TO COMPARE TO YOURS</p>

              <div className="inputBorder w-1/2 h-24 border border-white flex justify-center items-center">
                <input className="searchInput w-11/12 h-16 p-2 text-2xl" ref={gamertag} placeholder="Gamertag"></input>
              </div>

              <div className="border p-2 mt-10">
                <button className="searchButton w-28 p-3 text-lg" type="submit">Search</button>
              </div>
            </form>

            <form className="friendsSearch absolute w-1/6 h-auto flex flex-col items-center mt-40 ml-24 top-2/4 left-3/4 bg-black/20 text-white rounded-md z-10">
                <h5 className="mb-4 text-lg font-medium">Friends List</h5>
                <ul className="friendsList w-full h-24 pl-4 mb-4 overflow-auto">
                  <li className="friend mr-4 pl-2 pr-2">Falcated</li>
                  <li className="friend mr-4 pl-2 pr-2">Falcated</li>
                  <li className="friend mr-4 pl-2 pr-2">Falcated</li>
                  <li className="friend mr-4 pl-2 pr-2">Falcated</li>
                  <li className="friend mr-4 pl-2 pr-2">Falcated</li>
                  <li className="friend mr-4 pl-2 pr-2">Falcated</li>
                </ul>
                <div className="border h-auto p-2 mb-4">
                <input className="friendInput"/>
                </div>
                <button className="addFriend mb-4 p-1">Add Friend</button>
            </form>
          </div>

            <img className="w-screen h-screen opacity-10 grayscale" src={require("../Icons-IMG/background.jpg")} alt="" width="2000" height="1270" />
        </div>
    )
}

export default Search;