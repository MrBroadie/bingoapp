import React from 'react'

function ShowModal({
    setUsername,
    userHasAttemptedUsername,
    setUserHasAttemptedUsername,
    currentUsers,
    setCurrentUsers
}) {


    const handleSetUsername = (event) => {
            event.preventDefault();
            const usernameInput = event.target.usernameInput.value
            const usernameFormatted = usernameInput[0].toUpperCase() + usernameInput.slice(1).toLowerCase()
            if (checkUsernameExists(currentUsers, usernameInput)){
                setUsername(usernameFormatted)
                //set socket users in a room
                setCurrentUsers([...currentUsers, usernameFormatted]);
            }
        }

        const checkUsernameExists = (currUsers, socketUser) => {
            console.log(currUsers, socketUser);
            const checkUserArr = currUsers.filter((user) => socketUser.toLowerCase() === user.toLowerCase())
            if(checkUserArr.length === 0) return true 
            setUserHasAttemptedUsername(true);
          };

    return (
    <>
        {userHasAttemptedUsername && <p>Username already exists, please enter another name</p>}
        <form className="" onSubmit={handleSetUsername}>
            <div className="">
                <label>Username</label>
                <input className=""  name="usernameInput" placeholder="Please enter a your name"></input>
            </div>
            <button type="submit" className="">Confirm</button>
        </form>
        </>
    )
}

export default ShowModal