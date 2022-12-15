import React, { useEffect, useState } from "react";
import { generateBingoSheet } from "../db.js";
import BingoBoxButton from "./BingoBoxButton.jsx";

function BingoBox() {
  const [values, setValues] = useState([]);

  useEffect(() => {
    const arrayOfValues = generateBingoSheet();
    return () => {
      setValues(arrayOfValues);
    };
  }, []);

  return (
    <>
      {values &&
        values.map((value) => (
         <BingoBoxButton value={value} key={value} />
        ))}
    </>
  );
}

export default BingoBox;
