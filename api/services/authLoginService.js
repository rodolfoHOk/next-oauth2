import httpAuthClient, { clientId, clientSecret, realm } from './httpAuthClient';
import querystring from 'qs';

function authLoginService(username, password){
  const url = `/realms/${realm}/protocol/openid-connect/token`;
  const headers = {
    'Content-Type' : 'application/x-www-form-urlencoded'
  };
  var data = querystring.stringify({
    'grant_type': 'password',
    'client_id': clientId,
    'client_secret': clientSecret,
    'username': username,
    'password': password,
  });
  return httpAuthClient.post(url, data, { headers: headers });
}

export default authLoginService;
