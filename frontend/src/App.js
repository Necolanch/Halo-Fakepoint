//import OverviewChart from "./components/OverviewChart";
import Home from "./pages/Home";
import {Routes, Route} from "react-router-dom";

import "./CSS/root.css"

function App() {
  return (
    <div className="App">
       <Routes>
         <Route path="/" element={<Home/>}/>
       </Routes>
    </div>
  );
}

export default App;
