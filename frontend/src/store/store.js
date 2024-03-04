import { configureStore } from '@reduxjs/toolkit';
import seatReducer from './Seat/seatReducer.js';
import travelReducer from './Travel/travelReducer.js';
import queryParamsReducer from './QueryParams/queryParamsReducer.js';
import formReducer from './Form/formReducer.js';

const rootReducer = {
  seat: seatReducer,
  travel: travelReducer,
  queryParams: queryParamsReducer,
  form: formReducer
};

const store = configureStore({
  reducer: rootReducer
});

export default store;
