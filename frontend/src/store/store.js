import { configureStore } from '@reduxjs/toolkit';
import seatReducer from './Seat/seatReducer.js';
import travelReducer from './Travel/travelReducer.js';
import queryParamsReducer from './QueryParams/queryParamsReducer.js';

const rootReducer = {
  seat: seatReducer,
  travel: travelReducer,
  queryParams: queryParamsReducer
};

const store = configureStore({
  reducer: rootReducer
});

export default store;
