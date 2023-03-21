import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const useUser = () => {
    return useContext(UserContext);
};

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

    const handleLogin = (newUser) => {
        localStorage.setItem("user", JSON.stringify(newUser));
        setUser(newUser);
    };

    const handleLogout = () => {
        localStorage.removeItem("user");
        setUser(null);
    };

    const handleUpdateUser = (updatedUser) => {
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);
    };

    const state = {
        user,
        handleLogin,
        handleLogout,
        handleUpdateUser,
    };

    return <UserContext.Provider value={state}>{children}</UserContext.Provider>;
};

export default UserProvider;
