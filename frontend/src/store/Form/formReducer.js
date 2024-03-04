const initialState = {
  creditCardForm: {
    cardHolder: '',
    cardNumber: '',
    ccv: '',
    email: '',
    confirmEmail: '',
    month: '',
    year: '',
    formFilled: false
  },
  passengerForm: {
    name: '',
    lastname: '',
    email: '',
    confirmEmail: '',
    formFilled: false
  },
  // Other forms go here
  paymentMethod: '',
  acceptedTos: false
};

const formReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_FIELD_VALUE':
      return {
        ...state,
        [action.payload.form]: {
          ...state[action.payload.form],
          [action.payload.field]: action.payload.value
        }
      };
    case 'SET_FORM_FILLED':
      return {
        ...state,
        [action.payload.form]: {
          ...state[action.payload.form],
          formFilled: action.payload.filled
        }
      };
    case 'SET_PAYMENT_METHOD':
      return {
        ...state,
        paymentMethod: action.payload
      };
    case 'SET_ACCEPTED_TOS':
      return {
        ...state,
        acceptedTos: action.payload
      };

    default:
      return state;
  }
};

export default formReducer;
