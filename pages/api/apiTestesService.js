import httpApiClient from "./httpApiClient";

const url = 'testes';

export function getTesteUsuario(){
  return httpApiClient.get(`/${url}/usuario`);
}

export function getTesteAdministrador(){
  return httpApiClient.get(`/${url}/admin`);
}

export function getTesteTodosUsuarios(){
  return httpApiClient.get(`/${url}/todos-usuarios`);
}
