export const setSeatQuantity = (seat) => ({
  type: 'SET_SEAT_QUANTITY',
  payload: seat
});

export const addSeatSelected = (seatSelected) => ({
  type: 'ADD_SEAT_SELECTED',
  payload: seatSelected
});

export const removeSeatSelected = (seatSelected) => ({
  type: 'REMOVE_SEAT_SELECTED',
  payload: seatSelected
});

export const cleanAllSeatsSelected = () => ({
  type: 'CLEAN_ALL_SEATS_SELECTED'
});
