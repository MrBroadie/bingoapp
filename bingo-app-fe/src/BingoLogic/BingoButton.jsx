import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { DisabledContext } from '../contexts/DisabledContext'

function BingoButton({socket, username, room, winner, setWinner}) {

    const {isDisabled} = useContext(DisabledContext)

    const [cssClass, setCSSClass] = useState("")

    const unclickedCSS = "bg-slate-50 text-gray-800 border-2 border-slate-400 hover:bg-slate-500 hover:text-slate-100 font-bold py-10 px-20 rounded-full text-2xl"
    const clickedCSS = "border-2 bg-slate-500 text-slate-100 font-bold py-10 px-20 rounded-full text-2xl"

    useEffect(() => {
          setCSSClass(unclickedCSS)
          socket.on("bingoMessageSent", (winner) => {
          setWinner({
            winner: winner,
            showWinner: true
          })
          console.log(winner, "has called BINGO")
          setTimeout(() => {
            setWinner({
              winner: "",
              showWinner: false
            })
          }, 5000)
        })
    }, [])

    const handleClick = () => {
        setCSSClass(cssClass === clickedCSS ? unclickedCSS : clickedCSS)
        console.log('BINGO')
        socket.emit('bingoClicked', room, username)
    }

  return (
    <>
        {isDisabled || winner.showWinner ?
            <button type="button" className='bg-gray-100 text-gray-800 font-bold py-10 px-20 rounded-full opacity-50 cursor-not-allowed' disabled>BINGO</button>
            :
            <button type="button" className={cssClass} onClick={handleClick}>BINGO</button>}
    </>
  )
}

export default BingoButton