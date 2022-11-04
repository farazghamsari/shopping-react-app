import { createContext, useContext, useEffect, useState } from "react";

const LogedInContext = createContext()
const LogedInContextDispatcher = createContext()

const LogedInProvider = ({ children }) => {

    const [logedIn,setLogedIn] = useState(false)

    useEffect(()=>{
        const userData = JSON.parse(localStorage.getItem('user')) 
        setLogedIn(userData)
    },[])

    // useEffect(()=>{
    //     const userData = JSON.parse(localStorage.getItem('user')) 
    //     setLogedIn(userData)
    // },[logedIn])

    return (
        <LogedInContext.Provider value={logedIn}>
            <LogedInContextDispatcher.Provider value={setLogedIn}>
                {children}
            </LogedInContextDispatcher.Provider>
        </LogedInContext.Provider>
    );
}

export default LogedInProvider;

export const useLogedIn = () => useContext(LogedInContext)
export const useLogedInAction = () => useContext(LogedInContextDispatcher)