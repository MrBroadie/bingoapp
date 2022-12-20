import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import BingoBox from "../bingoLogic/BingoBox";
import BingoButton from "../bingoLogic/BingoButton";
import ShowModal from "./ShowModal";
import BuzzwordBingo from "../BuzzwordBingo.png";
import WinnerPage from "./WinnerPage";
import { ListOfWinnersContext } from "../contexts/ListOfWinnersContext";
import io from "socket.io-client";
import WinnerPopUp from "../components/WinnerPopUp";


function BoardPage({host}) {
  const socket = io(host);

  const room = "GlobalLogicBingo";
  const [userHasAttemptedUsername, setUserHasAttemptedUsername] =
    useState(false);
  const [singleSocketUser, setSingleSocketUser] = useState({
    username: "",
    id: "",
  });
  const [currentUsers, setCurrentUsers] = useState([]);
  const [winner, setWinner] = useState({
    winner: "",
    showWinner: false,
    values: [],
  });
  const { setListOfWinners } = useContext(ListOfWinnersContext);

  socket.on("loadWinners", (winnerList) => {
    setListOfWinners(winnerList);
  });

  useEffect(() => {
    socket.emit("join_room", room, singleSocketUser.username);
    socket.on("newUsernameAdded", (listOfUsers) => {
      setCurrentUsers(listOfUsers);
    });
  }, [singleSocketUser.username]);

  return (
    <>
      {!singleSocketUser.username && (
        <ShowModal
          currentUsers={currentUsers}
          setSingleSocketUser={setSingleSocketUser}
          setCurrentUsers={setCurrentUsers}
          userHasAttemptedUsername={userHasAttemptedUsername}
          setUserHasAttemptedUsername={setUserHasAttemptedUsername}
        />
      )}
      {winner.showWinner && <WinnerPage winner={winner} />}
      {winner.showWinner && <WinnerPopUp winner={winner} />}

      <div
        className="bg-gradient-to-r from-sky-500 to-indigo-500 h-screen flex flex-col items-center justify-between  py-16 md:justify-center"
        style={{
          "pointer-events":
            singleSocketUser.username.length === 0 || winner.showWinner
              ? `none`
              : `auto`,
          filter:
            singleSocketUser.username.length === 0 || winner.showWinner
              ? `blur(12px)`
              : `blur(0px)`,
          overflow: singleSocketUser.username.length === 0 ? `hidden` : `auto`,
          transform:
            singleSocketUser.username.length === 0 || winner.showWinner
              ? `scale(1.2)`
              : `scale(1)`,
        }}
      >
        <header>
          <img className="px-8" src={BuzzwordBingo}></img>
        </header>
        <main className="flex items-center justify-center mt-6">
          <div className="grid gap-2 md:gap-6 grid-cols-3 grid-rows-3 items-center content-center mx-2 md:mx-2 md:w-auto">
            <BingoBox />
          </div>
        </main>
        <div className="flex items-center justify-center mt-6">
          <BingoButton
            socket={socket}
            username={singleSocketUser.username}
            room={room}
            setWinner={setWinner}
            winner={winner}
          />
        </div>
        {singleSocketUser.username === "Tom Broad" && (
          <Link to="/showAllWinners">Winners</Link>
        )}
      </div>
    </>
  );
}

export default BoardPage;
