import axios from 'axios';

const api = axios.create({
    // Definindo a URL base para todas as requisições que serão feitas
    baseURL: 'http://localhost:8080/'
});

export default api;