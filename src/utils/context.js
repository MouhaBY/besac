import React, { createContext, useState } from 'react';

export const showBarContext = createContext();

export const ShowBarProvider = ({ children }) => {
    const [showBar, setShowBar] = useState(true);

    const toggleShowBar = () => {
        setShowBar(showBar === false ? true : false)
    }
 
    return (
        <showBarContext.Provider value={{ showBar, toggleShowBar }}>
            {children}
        </showBarContext.Provider>
    )
}

export const userDataContext = createContext();

export const UserDataProvider = ({ children }) => {
    const [userData, setUserData] = useState();

    const toggleUserData = (credentials) => {
        setUserData(credentials)
    }
 
    return (
        <userDataContext.Provider value={{ userData, toggleUserData }}>
            {children}
        </userDataContext.Provider>
    )
}