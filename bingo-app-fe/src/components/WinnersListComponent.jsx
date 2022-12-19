import React from 'react'

function WinnersListComponent({winner}) {
  return (
    <ul>
    {winner.values.map(val => {
        return(
        <li className="text-red-500">{val}</li>
        )
    })}
    </ul>
  )
}

export default WinnersListComponent