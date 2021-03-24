import axios from 'axios';

export const clientId = process.env.clientId;
export const clientSecret = process.env.clientSecret;

const httpClient = axios.create({
  baseURL: 'http://localhost:8080'
});

export default httpClient;