import React, { useState } from 'react'
import { useEffect } from 'react'
import BingoBox from '../bingoLogic/BingoBox'
import BingoButton from '../bingoLogic/BingoButton'
import ShowModal from './ShowModal'
import io from 'socket.io-client';

const host = window.location.href.match(/.+:/) + "4000";
const socket = io(host);


function BoardPage() {

    const room = "GlobalLogicBingo"
    const [userHasAttemptedUsername, setUserHasAttemptedUsername] = useState(false);
    const [username, setUsername] = useState(null)
    const [currentUsers, setCurrentUsers] = useState([]);
    
    useEffect(() => {
        socket.emit('join_room', room, username)
        //get all users in a room
        setCurrentUsers(['Sam', 'Jim'])
    }, [])


    useEffect(() => {
        console.log('username', username)
        console.log('currentUsers', currentUsers)
        }, [username, currentUsers])
        
    return (
    <>
        {!username ? <ShowModal 
            setUsername={setUsername}
            currentUsers={currentUsers}   
            setCurrentUsers={setCurrentUsers} 
            userHasAttemptedUsername={userHasAttemptedUsername}
            setUserHasAttemptedUsername={setUserHasAttemptedUsername}/> :
    
        <div className="bg-gradient-to-r bg-gradient-to-r from-sky-500 to-indigo-500 flex-col h-screen">
            <header className="">
                <h1 className="text-center text-6xl pt-4 text-white">Global Buzzword Bingo</h1>
            </header>
            <main className="flex items-center justify-center mt-6 ">
                <div className="grid gap-6 grid-cols-3 grid-rows-3 items-center content-center">
                    <BingoBox />
                </div>
            </main>
            <div className='flex items-center justify-center mt-6  '>
                <BingoButton socket={socket} username={username} room={room}/>
            </div>
        </div>}
    </>
  )
}

export default BoardPage