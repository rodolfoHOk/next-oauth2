import httpApiClient from './httpApiClient';

const url = '/usuarios';

export function getTodosUsuarios(){
  return httpApiClient.get(url);
}

export function getUsuarioPorId(id){
  return httpApiClient.get(`${url}/${id}`);
}

export function getUsuariosPorUsername(username){
  return httpApiClient.get(`${url}/nomeusuario/${username}`);
}

export function postCriarUsuario(usuario){
  return httpApiClient.post(url, usuario);
}

export function postAtribuirGrupo(idUsuario, idGrupo){
  return httpApiClient.post(`${url}/${idUsuario}/grupos/${idGrupo}`);
}

export function postAtribuirRole(idUsuario, nomeRole){
  return httpApiClient.post(`${url}/${idUsuario}/roles/${nomeRole}`);
}
