export const setFieldValue = (form, field, value) => ({
  type: 'SET_FIELD_VALUE',
  payload: { form, field, value }
});

export const setFormFilled = (form, filled) => ({
  type: 'SET_FORM_FILLED',
  payload: { form, filled }
});

export const setPaymentMethod = (method) => ({
  type: 'SET_PAYMENT_METHOD',
  payload: method
});

export const setAcceptedTos = (accepted) => ({
  type: 'SET_ACCEPTED_TOS',
  payload: accepted
});

export const updatePassengerForm = (newSeatQuantity) => ({
  type: 'UPDATE_PASSENGER_FORM',
  payload: newSeatQuantity
});

export const setPassengerFieldValue = ({ field, value, seatId }) => ({
  type: 'SET_PASSENGER_FIELD_VALUE',
  payload: { field, value, seatId }
});

export const setPassengerFormFilled = (form, formFilled, seatId) => ({
  type: 'SET_PASSENGER_FORM_FILLED',
  payload: { form, formFilled, seatId }
});

export const setCurrentSeatId = (seatId) => ({
  type: 'SET_CURRENT_SEAT_ID',
  payload: seatId
});

export const nukePassengerForm = () => ({
  type: 'NUKE_PASSENGER_FORM'
});
