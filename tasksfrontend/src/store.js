import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';

const app = express();

var cors = require('cors');
app.use(cors());

// Enable CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

const store = configureStore({
  reducer: rootReducer,
  middleware: [],
  devTools: process.env.NODE_ENV !== 'production',
});
//
export default store;

