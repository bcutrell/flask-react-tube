import axios from 'axios';
// import config from './config';

const instance = axios.create({
      // baseURL: config.testURL
      baseURL: 'http://localhost:5000'
      
})

export default instance;

