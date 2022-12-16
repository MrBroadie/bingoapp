import React from 'react'

function WinnerPage({winner}) {
  return (
    <div>
        <h1>{winner.winner} has called Bingo!</h1>
    </div>
  )
}

export default WinnerPage