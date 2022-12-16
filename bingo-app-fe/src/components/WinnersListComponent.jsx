import React from 'react'

function WinnersListComponent({winner}) {
  return (
    <ul>
    {winner.values.map(val => {
        return(
        <li>{val}</li>
        )
    })}
    </ul>
  )
}

export default WinnersListComponent