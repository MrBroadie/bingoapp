import BingoBox from './BingoLogic/BingoBox'
import "./App.css";

function App() {
  return (
    <div className="bg-gradient-to-r bg-gradient-to-r from-sky-500 to-indigo-500 flex-col h-screen ">
      <header className="">
        <h1 className="text-center text-6xl pt-4 text-white">GlobalBingo</h1>
      </header>
      <main className="flex items-center justify-center mt-6 ">
        <div className="grid gap-6 grid-cols-3 grid-rows-3 items-center content-center">
          <BingoBox />
        </div>
      </main>
    </div>
  );
}

export default App;
