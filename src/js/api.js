import axios from 'axios';

const instance = axios.create({
  baseURL: `https://simple-api.sandbox.movavi.com/api/v1/`,
  headers: {
    'Content-Type': 'application/json',
  },
});

const API = (method, params)=>{
  return instance.post('/', {jsonrpc: "2.0", method, params})
    .then(res => {
      return res.data;
    })
};

export default API;
