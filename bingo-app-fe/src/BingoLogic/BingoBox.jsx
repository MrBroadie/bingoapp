import React, { useEffect, useState } from "react";
import { generateBingoSheet } from "../db.js";

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
          <div className="h-[20vh] w-[20vh] bg-white-200 border-2 rounded-3xl bg-white border-slate-400 flex items-center justify-center drop-shadow-2xl">
            <p className="text-black text-2xl">{value}</p>
          </div>
        ))}
    </>
  );
}

export default BingoBox;
