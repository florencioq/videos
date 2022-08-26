import axios from 'axios';
import { KEY } from './api_key.js'

export default axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3',
    params: {
        part: 'contentDetails',
        key: KEY,
    }
});

