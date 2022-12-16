import React, { useState } from "react";
import { useEffect } from "react";
import BingoBox from "../BingoLogic/BingoBox";
import BingoButton from "../BingoLogic/BingoButton";
import ShowModal from "./ShowModal";
import io from "socket.io-client";

const host = window.location.href.match(/.+:/) + "4000";
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
  });

  useEffect(() => {
    socket.emit("join_room", room, singleSocketUser.username);
    //get all users in a room
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
        <div>
          <h1>{winner.winner} has called Bingo!</h1>
        </div>
      )}

      <div
        className="bg-gradient-to-r from-sky-500 to-indigo-500 flex-col h-screen"
        style={{
          filter:
            singleSocketUser.username.length === 0 ? `blur(12px)` : `blur(0px)`,
        }}
      >
        <header>
          <h1 className="text-center text-6xl pt-4 text-white">
            Global Buzzword Bingo
          </h1>
        </header>
        <main className="flex items-center justify-center mt-6">
          <div className="grid gap-6 grid-cols-3 grid-rows-3 items-center content-center">
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
      </div>
    </>
  );
}

export default BoardPage;
