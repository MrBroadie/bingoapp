import React, { useEffect, useState } from 'react'

function BingoBoxButton({value, counter, setCounter}) {
    const [cssClass, setCSSClass] = useState("")



    const unclickedCSS = "h-[20vh] w-[20vh] bg-slate-50 hover:bg-slate-500 hover:text-slate-100 border-2 rounded-3xl border-slate-400 flex items-center justify-center drop-shadow-2xl"
    const clickedCSS = "h-[20vh] w-[20vh] bg-slate-500 text-slate-100 border-2 rounded-3xl flex items-center justify-center drop-shadow-2xl"

    useEffect(() => {
        setCSSClass(unclickedCSS)
    }, [])

    const changeClass = () => {
      setCSSClass(cssClass === clickedCSS ? unclickedCSS : clickedCSS)
      setCounter(cssClass === clickedCSS ? counter - 1 : counter + 1)
    }
    


  return (
    <button className={cssClass} onClick={changeClass}>
    <p className=" text-2xl">{value}</p>
  </button>
  )
}

export default BingoBoxButton