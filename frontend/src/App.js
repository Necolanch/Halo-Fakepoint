//import OverviewChart from "./components/OverviewChart";
import Home from "./pages/Home";
import Search from "./pages/Search"
import {Routes, Route} from "react-router-dom";

import "./CSS/root.css"

function App() {
  return (
    <div className="App">
       <Routes>
         <Route path="/" element={<Home/>}/>
         <Route path="/search" element={<Search/>}/>
         <Route path="/settings" />
         <Route path="/details" />
       </Routes>
    </div>
  );
}

export default App;
