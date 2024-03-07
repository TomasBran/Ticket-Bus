const initialState = {
  seatQuantity: 1,
  seatSelected: {
    departure: [],
    return: []
  },
  isSelectingReturnSeats: false
};

const seatReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_SEAT_QUANTITY':
      return {
        ...state,
        seatQuantity: action.payload
      };
    case 'ADD_SEAT_SELECTED':
      if (
        state.seatSelected[action.payload.trip].some(
          (seat) =>
            seat.seatId === action.payload.seat.seatId &&
            seat.number === action.payload.seat.number
        )
      ) {
        // If the seat is already selected, ignore the action
        return state;
      }
      return {
        ...state,
        seatSelected: {
          ...state.seatSelected,
          [action.payload.trip]: [
            ...state.seatSelected[action.payload.trip],
            action.payload.seat
          ]
        }
      };
    case 'REMOVE_SEAT_SELECTED':
      return {
        ...state,
        seatSelected: {
          ...state.seatSelected,
          [action.payload.trip]: state.seatSelected[action.payload.trip].filter(
            (seat) => !(seat.seatId === action.payload.seat.seatId)
          )
        }
      };
    case 'CLEAN_ALL_SEATS_SELECTED':
      return {
        ...state,
        seatSelected: {
          departure: [],
          return: []
        }
      };
    case 'SET_IS_SELECTING_RETURN_SEATS':
      return {
        ...state,
        isSelectingReturnSeats: action.payload
      };
    case 'SET_SEAT_ACTIVE':
      return {
        ...state,
        seatSelected: {
          ...state.seatSelected,
          [action.payload.trip]: state.seatSelected[action.payload.trip].map(
            (seat) =>
              seat.seatId === action.payload.seatId
                ? { ...seat, isActive: action.payload.isActive }
                : seat
          )
        }
      };

    default:
      return state;
  }
};

export default seatReducer;
