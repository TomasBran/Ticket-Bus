const initialState = {
  origin: '',
  destination: '',
  date: ''
};

const queryParamsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_QUERY_PARAMS':
      return {
        ...state,
        origin: action.payload.origin,
        destination: action.payload.destination,
        date: action.payload.date
      };
    default:
      return state;
  }
};

export default queryParamsReducer;
