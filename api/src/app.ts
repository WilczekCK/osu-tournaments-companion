import app from './server';
import axios from 'axios';
import cronEvents from './controllers/cron';
import mongo from './controllers/mongo';

const port = process.env.PORT || 3000;
const server = app.listen(port);

axios.defaults.baseURL = `http://api.osutc.app`;
// axios.defaults.baseURL = `http://localhost:${port}`;

//Start mongo connection!
mongo.getConnection();

//Refresh the informations about 
cronEvents.start();

console.log(`Server running on port ${port}`);
