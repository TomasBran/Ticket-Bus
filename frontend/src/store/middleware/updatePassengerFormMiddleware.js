const updatePassengerFormMiddleware =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    next(action);

    if (action.type === 'SET_SEAT_QUANTITY') {
      const newSeatQuantity = action.payload;
      dispatch({ type: 'UPDATE_PASSENGER_FORM', payload: newSeatQuantity });
    } else if (action.type === 'ADD_SEAT_SELECTED') {
      const newSeatId = action.payload.seat.seatId;
      const passengerForm = getState().form.passengerForm;

      // Check if the seatId already exists in the passengerForm
      const seatIdExists = passengerForm.some(
        (passenger) => passenger.seatId === newSeatId
      );

      if (!seatIdExists) {
        // Find the index of the first passenger form without a seatId
        const passengerIndexToUpdate = passengerForm.findIndex(
          (passenger) => !passenger.seatId
        );

        if (passengerIndexToUpdate !== -1) {
          // Dispatch an action to update the passenger form with the new seatId
          console.log();
          dispatch({
            type: 'UPDATE_PASSENGER_FORM_WITH_SEAT',
            payload: { index: passengerIndexToUpdate, seatId: newSeatId }
          });
        }
      }
    } else if (action.type === 'REMOVE_SEAT_SELECTED') {
      const removedSeatId = action.payload.seatId; // Use seatId instead of id
      dispatch({
        type: 'REMOVE_PASSENGER_FORM_WITH_SEAT',
        payload: removedSeatId
      });
    }
  };

export default updatePassengerFormMiddleware;
