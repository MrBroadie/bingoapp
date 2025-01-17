import React, { useContext, useEffect } from 'react'
import io from "socket.io-client";
import WinnersListComponent from '../components/WinnersListComponent'
import { ListOfWinnersContext } from '../contexts/ListOfWinnersContext';

function WinnersPage({host}) {
  const socket = io(host);

  const room = "GlobalLogicBingo";
  const {listOfWinners} = useContext(ListOfWinnersContext)

  useEffect(() => {
    socket.emit("winnersRequested", room)
}, [])

  return (
    <div>
        {listOfWinners.length && listOfWinners.map((winner, index) => {
            return(
                <>
                    <p key={index}>{winner.username}</p>
                    <WinnersListComponent key={index} winner={winner} className="flex flex-col items-center justify-between"/>
                </>
            )})}
    </div>
  )
}

export default WinnersPage