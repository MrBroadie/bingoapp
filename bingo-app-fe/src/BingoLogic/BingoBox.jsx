import React, { useEffect, useState, useContext } from "react";
import { generateBingoSheet } from "../db.js";
import BingoBoxButton from "./BingoBoxButton.jsx";
import { DisabledContext } from '../contexts/DisabledContext';


function BingoBox() {
  const {setIsDisabled} = useContext(DisabledContext)
  const [values, setValues] = useState([]);
  const [counter, setCounter] = useState(0)

  useEffect(() => {
    const arrayOfValues = generateBingoSheet();
    return () => {
      setValues(arrayOfValues);
    };
  }, []);
  
  useEffect(() => {
    counter === 9 ? setIsDisabled(false) : setIsDisabled(true)
  }, [counter])

  return (
    <>
      {values &&
        values.map((value) => (
         <BingoBoxButton value={value} key={value} counter={counter} setCounter={setCounter}/>
        ))}
    </>
  );
}

export default BingoBox;
