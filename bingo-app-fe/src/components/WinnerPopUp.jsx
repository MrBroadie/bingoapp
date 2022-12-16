import React from "react";
import JSConfetti from "js-confetti";

export default function WinnerPopUp({ winner }) {
  const jsConfetti = new JSConfetti();
  jsConfetti.addConfetti({
    emojis: ["🌈", "⚡️", "💥", "✨", "💫", "🌸"],
  });
  jsConfetti.addConfetti();
  return (
    <div className="rounded-3xl absolute left-0 right-0 m-auto top-0 bottom-0 z-10 w-80 h-80 md:w-full text-center">
      <h1 className="text-6xl md:text-8xl mb-10 font-bold text-white animate-spin-short">
        BINGO
      </h1>
      <h2 className="text-4xl mb-8 md:text-6xl decoration-uppercase text-white animate-ping-short">
        {winner.winner} has won!
      </h2>
    </div>
  );
}
