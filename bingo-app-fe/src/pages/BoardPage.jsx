import React, { useState } from "react";
import { useEffect } from "react";
import BingoBox from "../bingoLogic/BingoBox";
import BingoButton from "../bingoLogic/BingoButton";
import ShowModal from "./ShowModal";
import BuzzwordBingo from "../BuzzwordBingo.png";
import WinnerPage from "./WinnerPage";
import WinnersPage from "./WinnersPage";
import io from "socket.io-client";

const host = "localhost:4000";
const socket = io(host);

function BoardPage() {
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
    values: []
  });
  const [winnerList, setWinnerList] = useState([])

  useEffect(() => {
    socket.emit("join_room", room, singleSocketUser.username);
    setWinnerList([...winnerList, ])
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
      {winner.showWinner && (
        <WinnerPage winner={winner}/>
      )}

      <div
        className="bg-gradient-to-r from-sky-500 to-indigo-500 h-screen animate-gradient-xy flex flex-col items-center justify-between  py-16 md:justify-center"
        style={{
          "pointer-events":
            singleSocketUser.username.length === 0 ? `none` : `auto`,
          filter:
            singleSocketUser.username.length === 0 ? `blur(12px)` : `blur(0px)`,
          overflow: singleSocketUser.username.length === 0 ? `hidden` : `auto`,
          transform:
            singleSocketUser.username.length === 0 ? `scale(1.2)` : `scale(1)`,
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
            setWinnerList={setWinnerList}
            winnerList={winnerList}
          />
        {winnerList.length && <WinnersPage winnerList={winnerList}/> }
        </div>
      </div>
    </>
  );
}

export default BoardPage;
