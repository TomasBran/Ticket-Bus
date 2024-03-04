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
