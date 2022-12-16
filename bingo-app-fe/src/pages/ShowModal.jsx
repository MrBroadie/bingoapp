import React from "react";

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
    if (currUsers === undefined) return true;
    const checkUserArr = currUsers.filter(
      (user) => socketUser.toLowerCase() === user.username.toLowerCase()
    );
    if (checkUserArr.length === 0) return true;
    setUserHasAttemptedUsername(true);
  };

  return (
    <div
      className={
        `rounded-3xl shadow-2xl absolute left-0 right-0 m-auto top-0 bottom-0 p-12 bg-white z-10 w-80 md:w-96 drop-shadow-2xl ` +
        (userHasAttemptedUsername
          ? `h-[560px] md:h-[600px]`
          : `h-[420px] md:h-[460px]`)
      }
    >
      <h1 className="font-semibold text-2xl md:text-3xl text-gray-800 mb-4 md:mb-6">
        {" "}
        Welcome to Buzzword Bingo 👋
      </h1>
      <h2 className="font-semibold text-1xl md:text-2xl text-gray-400">
        Enter your name
      </h2>
      <form
        className="flex flex-col justify-center items-center"
        onSubmit={handleSetUsername}
      >
        <div className="flex flex-col w-[100%]">
          <input
            className="mt-4 md:mt-8 mb-4 w-full text-sm  px-4 py-3 bg-gray-200 focus:bg-gray-100 border  border-gray-200 rounded-lg focus:outline-none focus:border-blue-400"
            name="firstName"
            placeholder="First name"
            required
          ></input>

          <input
            className="w-full text-sm px-4 py-3 bg-gray-200 focus:bg-gray-100 border  border-gray-200 rounded-lg focus:outline-none focus:border-blue-400"
            name="lastName"
            placeholder="Second name"
            required
          ></input>
        </div>
        {userHasAttemptedUsername && (
          <p className="mt-8 text-gray-600 bg-red-200 border-2 border-red-600 rounded-lg p-4">
            Username already exists, please enter another name.
          </p>
        )}
        <button
          type="submit"
          className="mt-8 w-full px-4 flex md:py-4 justify-center bg-blue-600  hover:bg-blue-700 text-gray-100 p-3  rounded-lg tracking-wide font-semibold  cursor-pointer transition ease-in duration-500"
        >
          Confirm
        </button>
      </form>
    </div>
  );
}

export default ShowModal;
