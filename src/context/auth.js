import React, { useState, useContext, useEffect } from 'react';
import authLoginService from '../../pages/api/authLoginService';
import jwt_decode from 'jwt-decode';
import httpApiClient from '../../pages/api/httpApiClient';
import { clientId } from '../../pages/api/httpAuthClient';

const AuthContext = React.createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const tokenStoraged = localStorage.getItem('@access_token');
    const userStoraged = localStorage.getItem('@username');
    const rolesStoraged = localStorage.getItem('@roles');
    if ( tokenStoraged && userStoraged ) {
      setUser(userStoraged);
      if (rolesStoraged) {
        setRoles(rolesStoraged);
      }
      httpApiClient.defaults.headers.Authorization = `Bearer ${JSON.parse(tokenStoraged).data.access_token}`;
    }
  }, []);
  
  async function Login(username, password) {
    await authLoginService(username, password)
    .then(
      response => {
        const access_token = JSON.stringify(response);
        localStorage.setItem('@access_token', access_token);
        const username = jwt_decode(response.data.access_token).preferred_username;
        setUser(username);
        localStorage.setItem('@username', user);
        const realmRoles = jwt_decode(response.data.access_token).resource_access[clientId].roles;
        const rolesUsuario = [];
        if(realmRoles.includes('user')){
          rolesUsuario.push('usuario');
        }
        if(realmRoles.includes('admin')){
          rolesUsuario.push('administrador');
        }
        setRoles(rolesUsuario);
        localStorage.setItem('@roles', roles);
        httpApiClient.defaults.headers.Authorization = `Bearer ${response.data.access_token}`;
      }).catch(
        error => {
          throw error;
      });
  }
  
  function Logout(){
    setUser(null);
    localStorage.removeItem('@access_token');
    localStorage.removeItem('@username');
    localStorage.removeItem('@roles');
    httpApiClient.defaults.headers.Authorization = 'Bearer ';
  }
  
  return (
    <AuthContext.Provider value={{ signed: Boolean(user && user!="null") , user, roles, Login, Logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(){
  const context = useContext(AuthContext);
  return context;
}
