import { jwtDecode } from "jwt-decode";
import { createContext, useState } from "react";

export let UserContext = createContext();

export function UserContextProvider ({children}) {
  let [userToken , setToken] = useState(null);
  let [userData , setUserData] = useState('');
  let data = null
  if (userToken != null) {
    data = jwtDecode (userToken)
  }
  return <UserContext.Provider value={{ data , userToken , setToken , userData , setUserData }}>
    {children}
  </UserContext.Provider>
}