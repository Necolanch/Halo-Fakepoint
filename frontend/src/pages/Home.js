import React, {useState, useRef, useEffect} from "react";
import {ShepherdTour, TourMethods} from "react-shepherd";
import Start from "../components/Start";

import HomeNavigation from "../components/HomeNavigation";
import {Avatar} from "../components/Avatar";

import {GiDeathSkull, GiTargeted, GiStopwatch, GiLaurelsTrophy, GiStarMedal} from "react-icons/gi";
import {FaPercentage} from "react-icons/fa";

import "../CSS/home.css";
import "shepherd.js/dist/css/shepherd.css";

const tourOptions = {
    useModalOverlay: true,
    keyboardNavigation: false,
    defaultStepOptions:{
      cancelIcon:{
        enabled:true
      },
      when:{
        cancel: (()=>{
          const body = document.querySelector("body");
          const children = [...body.children];
          children.forEach(child=>child.classList.remove("shepherd-modal-is-visible"))
        }),
        complete: (()=>{
          const body = document.querySelector("body");
          const children = [...body.children];
          children.forEach(child=>child.classList.remove("shepherd-modal-is-visible"))
        })
      }
    }
};

  const steps = [
    {
      id:"intro",
      buttons:[
        {
          classes:"shepherd-button-secondary",
          text:"Exit",
          type:"cancel"
        },
        {
          classes:"halo-button",
          text:"Begin",
          type:"next"
        }
      ],
      text:[
        "Welcome to Halo Fakepoint! A mock of Halo Waypoint developed by Nicholas Cruz connecting to the HaloDotAPI for in game stats. This guide will highlight some key areas of the website for you."
      ],
    },
    {
      id:"second",
      attachTo:{
        element:".overview",
        on:"left",
        highlightClass:"attach"
      },
      buttons:[
        {
          classes:"shepherd-button-primary",
          text:"Next",
          type:"next"
        }
      ],
      text:[
        "This is a small overview welcoming you specifically on your account to the website. It highlights some hand-chosen statistics you might like to see."
      ]
    },
    {
      id:"navigation",
      attachTo:{
        element:".navigation",
        on:"right"
      },
      buttons:[
        {
          classes:"shepherd-button-primary",
          text:"Next",
          type:"next"
        }
      ],
      text:[
        "This is the navigation for the website with a total of 4 different page views."
      ]
    },
    {
        id:"home",
        attachTo:{
          element:".home",
          on:"right"
        },
        buttons:[
          {
            classes:"shepherd-button-primary",
            text:"Next",
            type:"next"
          }
        ],
        text:[
          "This is the Dashboard which is the current page we are on."
        ]
      },
      {
        id:"search",
        attachTo:{
          element:".search",
          on:"right"
        },
        buttons:[
          {
            classes:"shepherd-button-primary",
            text:"Next",
            type:"next"
          }
        ],
        text:[
          "This is the Search page. You can search stats of any player with a Halo Infinte account and by specific season. Here you can also create a friends list. Just type in the gamertag of your friend and they are in your friends list. When you click on a friend's gamertag you added, it searches their stats of the current season."
        ]
      },
      {
        id:"settings",
        attachTo:{
          element:".settings",
          on:"right"
        },
        buttons:[
          {
            classes:"shepherd-button-primary",
            text:"Next",
            type:"next"
          }
        ],
        text:[
          "This is the Settings page where you can adjust settings to your account."
        ]
      },
      {
        id:"details",
        attachTo:{
            element:".details",
            on:"right"
          },
        buttons:[
          {
            classes:"shepherd-button-primary",
            text:"Next",
            type:"next"
          }
        ],
        text:[
          "This is the Details page. This is where you will go to find all of your personal stats."
        ]
      },
      {
        id:"finish",
        buttons:[
          {
            classes:"shepherd-button-primary",
            text:"Finish",
            type:"complete"
          }
        ],
        text:[
          "That is all for the tour. I hope you enjoy the website fellow Spartans!"
        ]
      },
  ]

const Home = props => {
    const overall=useRef({});
    const ranked=useRef({});
    const spartan=useRef({});
    const medalsCollection=useRef([]);

    const [summary, setSummary] = useState([]);
    const [breakdowns, setBreakdowns]=useState([]);
    const [timePlayed, setTimePlayed]=useState([]);
    const [wins, setWins]=useState([]);
    const [kd, setKd]=useState([]);
    const [rank, setRank]=useState([]);
    const [id, setId]=useState([]);

    useEffect(() => {
        const getStats = async () => {
            await fetch(`http://localhost:3001/`)
            .then(response=>response.json())
            .then(result=>{
              result.forEach(res=>{
                if (res.records) {
                    overall.current=res;
                } else if (Array.isArray(res)) {
                    if (res.length>3) {
                        medalsCollection.current=res;
                    } else {
                        ranked.current=res;
                    }
                } else if (res.service_tag) {
                    spartan.current=res;
                }
            })

                const setAll = () => {
                setSummary(overall.current.records.pvp.core.summary);
                setBreakdowns(overall.current.records.pvp.core.breakdowns.kills);
                setTimePlayed(overall.current.records.pvp.time_played.human);
                setWins(overall.current.records.pvp.matches.outcomes.wins);
                setKd(overall.current.records.pvp.core.kdr.toFixed(2));

                const crossplay = ranked.current.find(obj=>obj.input==="crossplay");
                setRank(crossplay.response.all_time);
                setId(spartan.current.service_tag);
                }
            setAll();
            })
        }
        getStats();
        return;
    }, []);

    return(
      <ShepherdTour steps={steps} tourOptions={tourOptions}>
          <TourMethods>
              {tourContext=> <Start startTour={tourContext}/>}
          </TourMethods>
        <div className="wrapper h-screen">
            <HomeNavigation/>
            <h1 className="absolute text-3xl font-bold text-white ml-40 mt-6">Halo Fakepoint</h1>
            <Avatar/>
        <section className="overview absolute left-2/4 w-2/5 text-white flex justify-end mt-72 text-xl z-10">
            <h3 className="-mt-32 text-2xl font-semibold">Welcome Spartan <span className="serviceTag">{id}</span>!</h3>
          <div className="-mt-10 -mr-80 text-2xl font-semibold underline uppercase">
            Overview
          </div>
            <ul className="text-right mr-28">
                <li className="mb-4">
                    <GiDeathSkull className="skull -mb-6 ml-24"/> 
                    Kills &nbsp; {summary.kills}
                </li> 
                <li className="mb-4 mr-6"> 
                <GiTargeted className="headshots -mb-6 ml-6"/>
                Headshots &nbsp; {breakdowns.headshots}</li>
                <li className="mb-4">
                <GiStopwatch className="stopwatch -mb-6 -ml-10"/>
                    Time Played &nbsp; {timePlayed}</li>
            </ul>
            <ul className="">
                <li className="wins">
                    {wins} &nbsp; Wins <GiLaurelsTrophy className="trophy -mt-7 ml-24"/>
                </li>
                <li className="kd ml-6">
                    {kd} &nbsp; KDR <FaPercentage className="percentage -mt-6 ml-24"/>
                </li>
                <li className="rank">
                    {rank.tier} {rank.sub_tier} Rank <GiStarMedal className="medal -mt-6 ml-36"/>
                </li>
            </ul>
        </section>
            <img className="bg w-screen h-screen opacity-10 grayscale" src={require("../Icons-IMG/background.jpg")} alt="" width="2000" height="1270" />
        </div>
      </ShepherdTour>
    )
}

export default Home;