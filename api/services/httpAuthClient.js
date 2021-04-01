import axios from 'axios';

export const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
export const clientSecret = process.env.NEXT_PUBLIC_CLIENT_SECRET;
export const realm = process.env.NEXT_PUBLIC_REALM;

const httpAuthClient = axios.create({
  baseURL: 'http://localhost:8080/auth'
});

export default httpAuthClient;
