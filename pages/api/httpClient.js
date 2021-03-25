import axios from 'axios';

export const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
export const clientSecret = process.env.NEXT_PUBLIC_CLIENT_SECRET;

const httpClient = axios.create({
  baseURL: 'http://localhost:8080'
});

export default httpClient;