//import OverviewChart from "./components/OverviewChart";
import React from "react";

import Home from "./pages/Home";
import Search from "./pages/Search"
import Settings from "./pages/Settings";
import Details from "./pages/Details";
import SearchResult from "./pages/SearchResult"
import {Routes, Route} from "react-router-dom";

import "./CSS/root.css";

import {GamertagContext} from "./contexts/Gamertag";
import GlobalState from "./globalState";

function App() {
const store = GlobalState();
  
  return (
    <div className="App">
      <GamertagContext.Provider value={store}>
       <Routes>
         <Route path="/" element={<Home/>}/>
         <Route path="/search" element={<Search/>}/>
         <Route path="/settings" element={<Settings/>}/>
         <Route path="/details" element={<Details gamertag={store.gamertag.current} season="1"/>} />
         <Route path="/result" element={<SearchResult/>} />
       </Routes>
       </GamertagContext.Provider>
    </div>
  );
}

export default App;
