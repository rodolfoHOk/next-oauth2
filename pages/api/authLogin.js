import httpClient, { clientId, clientSecret } from './httpClient';
import querystring from 'qs';

function authLogin(username, password){
  const url = '/oauth/token';
  const headers = {
    'Content-Type' : 'application/x-www-form-urlencoded',
    'Authorization' : 'Basic ' + btoa(`${clientId}:${clientSecret}`),
  };
  var data = querystring.stringify({
    'username': username,
    'password': password,
    'grant_type': 'password'
  });
  return httpClient.post(url, data, { headers: headers });
}

export default authLogin;