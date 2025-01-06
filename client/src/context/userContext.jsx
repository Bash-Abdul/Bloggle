import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();


const UserProvider = ({ children }) => {

    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')))

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(currentUser))
    }, [currentUser])

    const value = {
        currentUser, setCurrentUser
    }


    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}


export default UserProvider;