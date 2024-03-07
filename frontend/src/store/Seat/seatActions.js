export const setSeatQuantity = (seat) => ({
  type: 'SET_SEAT_QUANTITY',
  payload: seat
});

export const addSeatSelected = (trip, seatSelected) => ({
  type: 'ADD_SEAT_SELECTED',
  payload: { trip, seat: seatSelected }
});

export const removeSeatSelected = (trip, seatSelected) => ({
  type: 'REMOVE_SEAT_SELECTED',
  payload: { trip, seat: seatSelected }
});

export const cleanAllSeatsSelected = () => ({
  type: 'CLEAN_ALL_SEATS_SELECTED'
});

export const setIsSelectingReturnSeats = (value) => ({
  type: 'SET_IS_SELECTING_RETURN_SEATS',
  payload: value
});
