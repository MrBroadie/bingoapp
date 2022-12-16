import React from 'react'

function ShowModal({
    currentUsers,
    setSingleSocketUser,
    userHasAttemptedUsername,
    setUserHasAttemptedUsername,
}) {


    const handleSetUsername = (event) => {
            event.preventDefault();
            const usernameInput = event.target.usernameInput.value
            event.target.usernameInput.value = ""
            const usernameFormatted = usernameInput[0].toUpperCase() + usernameInput.slice(1).toLowerCase()
            if (checkUsernameExists(currentUsers, usernameInput)){
                setSingleSocketUser((prevState) => ({
                    ...prevState,
                    username: usernameFormatted
                }));
            }
        }

        const checkUsernameExists = (currUsers, socketUser) => {
            if(currUsers === undefined) return true 
            const checkUserArr = currUsers.filter((user) => socketUser.toLowerCase() === user.username.toLowerCase())
            if(checkUserArr.length === 0) return true 
            setUserHasAttemptedUsername(true);
          };

    return (
    <>
        {userHasAttemptedUsername && <p>Username already exists, please enter another name</p>}
        <form className="" onSubmit={handleSetUsername}>
            <div className="">
                <label>First Name</label>
                <input className=""  name="usernameInput" placeholder="Please enter a your first name"></input>
                <label>Last Name</label>
                <input className=""  name="lastName" placeholder="Please enter a your last name"></input>
            </div>
            <button type="submit" className="">Confirm</button>
        </form>
        </>
    )
}

export default ShowModal