import axios from 'axios';
export var BASE_URL = 'http://my-hotel.com/api';
export default axios.create({ baseURL: BASE_URL, headers: {} });
