import axios from 'axios';

function createInstance() {
  return axios.create({
  });
}

export const api = createInstance();
