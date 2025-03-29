"use client"
// import { useRouter } from "next/navigation";
import { Context } from "../MyContext";
import { useState,useEffect } from "react";

function ContextProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [token, setToken] = useState(null);
  const [useremail,Setuseremail] = useState(null);
  // const router = useRouter();

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  // console.log(users)

  return (
      <Context.Provider value={{
        users, setUsers, token ,useremail,Setuseremail
      }}>
        {children}
      </Context.Provider>
  )
}

export default ContextProvider
