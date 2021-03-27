import axios from 'axios';

const httpApiClient = axios.create({
  baseURL: 'http://localhost:8000/api'
});

export default httpApiClient;
