import React, { createContext, useState, useEffect } from "react";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  if (storedUser) {
    setUser(storedUser);
  }
  setLoading(false);
}, []);

const login =(userData, token)=>{
  setUser(userData);
  localStorage.setItem("user", JSON.stringify(userData));
  localStorage.setItem("token", token);
}

const logout = () => {
  setUser(null);
  localStorage.removeItem("user");
  localStorage.removeItem("token");

  }

const isLoggedIn = !!user;

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoggedIn , loading, setLoading}}>
      {children}
    </AuthContext.Provider>
  );


}