//import OverviewChart from "./components/OverviewChart";
import Home from "./pages/Home";
import Search from "./pages/Search"
import Settings from "./pages/Settings";
import Details from "./pages/Details";
import {Routes, Route} from "react-router-dom";

import "./CSS/root.css"

function App() {
  return (
    <div className="App">
       <Routes>
         <Route path="/" element={<Home/>}/>
         <Route path="/search" element={<Search/>}/>
         <Route path="/settings" element={<Settings/>}/>
         <Route path="/details" element={<Details/>} />
       </Routes>
    </div>
  );
}

export default App;
