import app from './app';
import axios from 'axios';

const port = process.env.PORT || 3000;
const server = app.listen(port);

axios.defaults.baseURL = `http://localhost:${port}`;
console.log('Server running on port 3000');