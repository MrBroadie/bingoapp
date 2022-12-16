import { useState } from 'react';
import { DisabledContext } from './contexts/DisabledContext';
import { ValuesContext } from './contexts/ValuesContext';
import BoardPage from './pages/BoardPage';

function App() {

  const [isDisabled, setIsDisabled] = useState(true);
  const [values, setValues] = useState([]);


  return (
    <>
      <ValuesContext.Provider value={{values, setValues}}>
        <DisabledContext.Provider value={{ isDisabled, setIsDisabled }}>
          <BoardPage />
        </DisabledContext.Provider>
      </ValuesContext.Provider>
    </>
  );
}

export default App;
