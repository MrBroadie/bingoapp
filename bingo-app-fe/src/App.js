import { useState } from 'react';
import { DisabledContext } from './contexts/DisabledContext';
import { ValuesContext } from './contexts/ValuesContext';
import { Route, Routes } from 'react-router-dom';
import BoardPage from './pages/BoardPage';
import WinnersPage from './pages/WinnersPage';
import { ListOfWinnersContext } from './contexts/ListOfWinnersContext';
import { DisabledBuzzwordContext } from './contexts/DisbaleBuzzwordContext';

function App() {
  const host = "localhost:4000";
  const [isDisabled, setIsDisabled] = useState(true);
  const [isBuzzwordDisabled, setIsBuzzwordDisabled] = useState(false);
  const [values, setValues] = useState([]);
  const [listOfWinners, setListOfWinners] = useState([]);

  return (
    <>
      <ValuesContext.Provider value={{values, setValues}}>
        <DisabledContext.Provider value={{ isDisabled, setIsDisabled }}>
        <DisabledBuzzwordContext.Provider value={{ isBuzzwordDisabled, setIsBuzzwordDisabled }}>
        <ListOfWinnersContext.Provider value={{ listOfWinners, setListOfWinners }}>
        <Routes>
          <Route path="/" element={<BoardPage host={host}/>} />
          <Route path="/showAllWinners" element={<WinnersPage host={host}/>} />
        </Routes>
        </ListOfWinnersContext.Provider>
      </DisabledBuzzwordContext.Provider>
      </DisabledContext.Provider>
      </ValuesContext.Provider>

    </>
  );
}

export default App;
