import React from 'react'

function ShowModal({
    currentUsers,
    setSingleSocketUser,
    userHasAttemptedUsername,
    setUserHasAttemptedUsername,
}) {


    const handleSetUsername = (event) => {

            const formatName = (name) => {
                let str =''
                for(let i = 0; i < name.length; i++) {
                    console.log(str)
                    if(/^[A-Za-z]*$/.test(name[i])) str = `${str}${name[i]}`;
                }
                const formatStr = str[0].toUpperCase() + str.slice(1).toLowerCase();
                console.log(formatStr)
                return formatStr;
            }

            event.preventDefault();
            const firstName = event.target.firstName.value
            const lastName = event.target.lastName.value
            event.target.firstName.value = ""
            event.target.lastName.value = ""
            const firstNameFormatted = formatName(firstName)
            const lastNameFormatted = formatName(lastName)
            const usernameFormatted = `${firstNameFormatted} ${lastNameFormatted}`
            
            if (checkUsernameExists(currentUsers, usernameFormatted)){
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
                <input className=""  name="firstName" placeholder="Please enter a your first name" required></input>
                <label>Last Name</label>
                <input className=""  name="lastName" placeholder="Please enter a your last name" required></input>
            </div>
            <button type="submit" className="">Confirm</button>
        </form>
        </>
    )
}

export default ShowModal