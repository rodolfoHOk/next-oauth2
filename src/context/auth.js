import React, { useState, useContext, useEffect } from 'react';
import authServiceLogin from '../api/authLogin';
import jwt_decode from 'jwt-decode';
import httpClient from '../api/httpClient';

const AuthContext = React.createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const userStoraged = localStorage.getItem('@username');
    const tokenStoraged = localStorage.getItem('@access_token');
    if ( userStoraged && tokenStoraged ) {
      setUser(userStoraged);
      httpClient.defaults.headers.Authorization = `Bearer ${tokenStoraged}`;
    }
  }, []);
  
  async function Login(username, password) {
    await authServiceLogin(username, password)
    .then(
      response => {
        const access_token = JSON.stringify(response);
        localStorage.setItem('@access_token', access_token);
        const username = jwt_decode(response.data.access_token).user_name;
        setUser(username);
        localStorage.setItem('@username', user);
        httpClient.defaults.headers.Authorization = `Bearer ${response.access_token}`;
      }).catch(
        error => {
          console.log(error);
      });
  }
  
  function Logout(){
    setUser(null);
    localStorage.removeItem('@access_token');
    localStorage.removeItem('@username');
    httpClient.defaults.headers.Authorization = 'Bearer ';
  }
  
  return (
    <AuthContext.Provider value={{ signed: Boolean(user), user, Login, Logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(){
  const context = useContext(AuthContext);
  return context;
}