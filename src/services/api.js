import axios from 'axios';

const api = axios.create({

    baseURL: 'https://intranet.id-logistics.com.br/box_finder_api/'
    
});

export default api;