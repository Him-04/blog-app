import React from "react";
import { createContext, useContext, useState } from "react";

export const UserContext = createContext();
export default function UserProvider({children}) {
  let [userInfo, setUserInfo] = useState(null); // will hold user data
  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
}
