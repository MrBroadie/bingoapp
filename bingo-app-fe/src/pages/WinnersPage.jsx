import React from 'react'
import WinnersListComponent from '../components/WinnersListComponent'

function WinnersPage({winnerList}) {
  console.log(winnerList)
  return (
    <div>
        {winnerList.map((winner, index) => {
            return(
                <>
                    <p key={index}>{winner.username}</p>
                    <WinnersListComponent winner={winner} key={winner.username}/>
                </>
            )})}

    </div>
  )
}

export default WinnersPage