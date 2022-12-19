import React, { useContext, useEffect, useState } from "react";
import { DisabledBuzzwordContext } from "../contexts/DisbaleBuzzwordContext";

function BingoBoxButton({ value, counter, setCounter }) {
  const [cssClass, setCSSClass] = useState("");
  const {isBuzzwordDisabled} = useContext(DisabledBuzzwordContext)


  const unclickedCSS =
    "h-[12vh] w-[12vh] md:h-[16vh] md:w-[16vh] 2xl:h-[20vh] 2xl:w-[20vh] backdrop-blur-md bg-white/75 text-black bg-slate-50 hover:bg-slate-500 hover:text-slate-100 border-2 rounded-3xl border-slate-400 flex items-center justify-center drop-shadow-2xl break-all";
  const clickedCSS =
    "h-[12vh] w-[12vh] md:h-[16vh] md:w-[16vh] 2xl:h-[20vh] 2xl:w-[20vh] bg-slate-500 text-slate-100 border-2 rounded-3xl flex items-center justify-center drop-shadow-2xl break-all";
  const clickedDisabledCSS =
    "h-[12vh] w-[12vh] md:h-[16vh] md:w-[16vh] 2xl:h-[20vh] 2xl:w-[20vh] bg-slate-500 text-slate-100 border-2 rounded-3xl flex items-center justify-center drop-shadow-2xl break-all cursor-not-allowed";

  useEffect(() => {
    setCSSClass(unclickedCSS);
  }, []);

  const changeClass = () => {
    if(isBuzzwordDisabled) return setCSSClass(clickedDisabledCSS);
    setCSSClass(cssClass === clickedCSS ? unclickedCSS : clickedCSS);
    setCounter(cssClass === clickedCSS ? counter - 1 : counter + 1);
  };

  return (
    <button className={cssClass} onClick={changeClass}>
      <p className="text-sm font-bold md:text-lg 2xl:text-2xl">{value}</p>
    </button>
  );
}

export default BingoBoxButton;
