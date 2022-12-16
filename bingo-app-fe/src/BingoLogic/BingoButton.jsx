import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { DisabledContext } from '../contexts/DisabledContext'
import { ValuesContext } from '../contexts/ValuesContext'

function BingoButton({socket, username, room, winner, setWinner, setWinnerList}) {

    const {isDisabled} = useContext(DisabledContext)
    const {values} = useContext(ValuesContext)
    const [cssClass, setCSSClass] = useState("")
    const unclickedCSS = "bg-slate-50 text-gray-800 border-2 border-slate-400 hover:bg-slate-500 hover:text-slate-100 font-bold py-10 px-20 rounded-full text-2xl"
    const clickedCSS = "border-2 bg-slate-500 text-slate-100 font-bold py-10 px-20 rounded-full text-2xl"

    useEffect(() => {
          setCSSClass(unclickedCSS)
          socket.on("bingoMessageSent", (winner, values, winnerList) => {
          setWinner({
            winner: winner,
            showWinner: true,
            values: values
          })
          setWinnerList(winnerList)
          setTimeout(() => {
            setWinner({
              winner: "",
              showWinner: false,
              values: []
            })
          }, 5000)
        })
    }, [])

    const handleClick = () => {
        setCSSClass(cssClass === clickedCSS ? unclickedCSS : clickedCSS)
        socket.emit('bingoClicked', room, username, values)
    }

  return (
    <>
      {isDisabled || winner.showWinner ? (
        <button
          type="button"
          className="bg-white border-2 border-emerald-500 text-gray-800 font-bold py-4 px-8 2xl:py-10 2xl:px-16 rounded-full opacity-50 text-xl 2xl:text-4xl cursor-not-allowed"
          disabled
        >
          Bingo 🎉
        </button>
      ) : (
        <button type="button" className={cssClass} onClick={handleClick}>
          Bingo 🎉
        </button>
      )}
    </>
  );
}

export default BingoButton;
