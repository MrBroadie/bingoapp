import { useState } from 'react';
import { DisabledContext } from './contexts/DisabledContext';
import BoardPage from './pages/BoardPage';

function App() {

  const [isDisabled, setIsDisabled] = useState(true)

  return (
  <>
  <DisabledContext.Provider value={{isDisabled, setIsDisabled}}>
    <BoardPage />
  </ DisabledContext.Provider>
  </>
  );
}

export default App;
