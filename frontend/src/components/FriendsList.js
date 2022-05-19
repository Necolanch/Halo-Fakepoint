import React, {useEffect, useState, useRef} from "react";

const FriendsList = props => {
    const [friends, setFriends]=useState([]);
    const newFriend = useRef("");
    useEffect(()=>{
        const findFriends = async() =>{
            await fetch(`http://localhost:3001/friends`)
            .then(response=>response.json())
            .then(result=>{
                setFriends(result);
            });
        };
        findFriends();
    }, []);

    const findFriends = async() =>{
        await fetch(`http://localhost:3001/friends`)
        .then(response=>response.json())
        .then(result=>{
            setFriends(result);
        });
    };

    const addFriend = async (gt, e) => {
        e.preventDefault();
        await fetch(`http://localhost:3001/friends`, {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                gamertag:gt
            })
        })
        .then(newFriend.current.value="")
        .catch(err=>{
            throw Error (err.message)
        })
        findFriends();
    }

    return (
        <form onSubmit={e=>addFriend(newFriend.current.value, e)} className="friendsSearch absolute w-1/6 h-auto flex flex-col items-center mt-40 ml-24 top-2/4 left-3/4 bg-black/20 text-white rounded-md z-10">
                <h5 className="my-4 text-lg font-medium">Friends List</h5>
                <ul className="friendsList w-full h-24 pl-4 mb-4 overflow-auto">
                    {
                        friends.map((friend, key)=>{
                            return <li key={key} className="friend mr-4 pl-2 pr-2">{friend.gamertag}</li>
                        })
                    }
                </ul>
                <div className="inputBorder border h-auto p-2 mb-4">
                <input className="searchInput text-black" ref={newFriend}/>
                </div>
                <div className="inputBorder border p-1 mb-4">
                <button className="searchButton p-1">Add Friend</button>
                </div>
            </form>
    )
}

export default FriendsList;