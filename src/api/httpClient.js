import axios from 'axios';

export const clientId = 'my-angular-app';

export const clientSecret = '@321';

const httpClient = axios.create({
  baseURL: 'http://localhost:8080'
});

export default httpClient;