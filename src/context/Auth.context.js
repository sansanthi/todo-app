import { createContext } from "react";

export const AuthContext = createContext(null);

export const ContextProvider = (props) => {
    return (
        <AuthContext.Provider value={{}}>

        </AuthContext.Provider>
    )
}