import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { DisabledContext } from "../contexts/DisabledContext";

function BingoButton({ socket, username, room, winner, setWinner }) {
  const { isDisabled } = useContext(DisabledContext);

  const [cssClass, setCSSClass] = useState("");

  const unclickedCSS =
    "bg-slate-50 text-gray-800 border-2 border-emerald-500 hover:bg-slate-500 hover:text-slate-100 font-bold py-4 px-8 md:py-10 md:px-16 rounded-full text-xl md:text-4xl";
  const clickedCSS =
    "border-2 bg-slate-500 text-slate-100 font-bold py-4 px-8 md:py-10 md:px-16 rounded-full text-xl md:text-4xl";

  useEffect(() => {
    setCSSClass(unclickedCSS);
    socket.on("bingoMessageSent", (winner) => {
      setWinner({
        winner: winner,
        showWinner: true,
      });
      console.log(winner, "has called BINGO");
      setTimeout(() => {
        setWinner({
          winner: "",
          showWinner: false,
        });
      }, 5000);
    });
  }, []);

  const handleClick = () => {
    setCSSClass(cssClass === clickedCSS ? unclickedCSS : clickedCSS);
    console.log("BINGO");
    socket.emit("bingoClicked", room, username);
  };

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
