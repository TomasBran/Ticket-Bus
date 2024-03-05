const updatePassengerFormMiddleware =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    next(action);

    if (action.type === 'SET_SEAT_QUANTITY') {
      const newSeatQuantity = action.payload;
      dispatch({ type: 'UPDATE_PASSENGER_FORM', payload: newSeatQuantity });
    } else if (action.type === 'ADD_SEAT_SELECTED') {
      const newSeatId = action.payload.id;
      const passengerForm = getState().form.passengerForm; // Adjust this based on your state structure

      // Check if the seatId already exists in the passengerForm
      const seatIdExists = passengerForm.some(
        (passenger) => passenger.seatId === newSeatId
      );

      if (!seatIdExists) {
        dispatch({
          type: 'UPDATE_PASSENGER_FORM_WITH_SEAT',
          payload: newSeatId
        });
      }
    } else if (action.type === 'REMOVE_SEAT_SELECTED') {
      const removedSeatId = action.payload.id;
      dispatch({
        type: 'REMOVE_PASSENGER_FORM_WITH_SEAT',
        payload: removedSeatId
      });
    }
  };

export default updatePassengerFormMiddleware;
