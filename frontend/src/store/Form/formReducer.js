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
  buyerForm: {
    name: '',
    lastname: '',
    email: '',
    confirmEmail: '',
    formFilled: false
  },
  passengerForm: [],
  // Other forms go here
  currentSeatId: null,
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
    case 'UPDATE_PASSENGER_FORM': {
      const newSeatQuantity = action.payload;
      let newPassengerForm = [...state.passengerForm];

      if (newSeatQuantity > state.passengerForm.length) {
        // If seatQuantity has increased, add new passenger objects
        const passengersToAdd = newSeatQuantity - state.passengerForm.length;
        for (let i = 0; i < passengersToAdd; i++) {
          newPassengerForm.push({
            name: '',
            lastname: '',
            documentType: '',
            document: '',
            seatId: null,
            formFilled: false
          });
        }
      } else if (newSeatQuantity < state.passengerForm.length) {
        // If seatQuantity has decreased, remove passenger objects from the end
        newPassengerForm = newPassengerForm.slice(0, newSeatQuantity);
      }

      return {
        ...state,
        passengerForm: newPassengerForm
      };
    }
    case 'UPDATE_PASSENGER_FORM_WITH_SEAT': {
      const { index, seatId } = action.payload;
      let newPassengerForm = [...state.passengerForm];

      // Create a new passenger object with the updated seatId
      const updatedPassenger = {
        ...newPassengerForm[index],
        seatId: seatId
      };

      // Replace the old passenger object with the new one
      newPassengerForm[index] = updatedPassenger;

      return {
        ...state,
        passengerForm: newPassengerForm
      };
    }
    case 'REMOVE_PASSENGER_FORM_WITH_SEAT': {
      const removedSeatId = action.payload;
      let newPassengerForm = [...state.passengerForm];

      // Find the passenger form with the removed seatId and set its seatId to null
      newPassengerForm = newPassengerForm.map((passenger) =>
        passenger.seatId === removedSeatId
          ? { ...passenger, seatId: null }
          : passenger
      );

      return {
        ...state,
        passengerForm: newPassengerForm
      };
    }
    case 'SET_PASSENGER_FIELD_VALUE': {
      const { field, value, seatId } = action.payload;
      let newPassengerForm = [...state.passengerForm];

      // Find the passenger form with the seatId and update its field
      const passengerIndexToUpdate = newPassengerForm.findIndex(
        (passenger) => passenger.seatId === seatId
      );

      if (passengerIndexToUpdate !== -1) {
        const updatedPassenger = {
          ...newPassengerForm[passengerIndexToUpdate],
          [field]: value
        };

        // Replace the old passenger object with the new one
        newPassengerForm[passengerIndexToUpdate] = updatedPassenger;
      }

      return {
        ...state,
        passengerForm: newPassengerForm
      };
    }
    case 'SET_PASSENGER_FORM_FILLED': {
      const { formFilled, seatId } = action.payload;
      let newPassengerForm = [...state.passengerForm];

      // Find the passenger form with the seatId and update its formFilled status
      const passengerIndexToUpdate = newPassengerForm.findIndex(
        (passenger) => passenger.seatId === seatId
      );

      if (passengerIndexToUpdate !== -1) {
        const updatedPassenger = {
          ...newPassengerForm[passengerIndexToUpdate],
          formFilled
        };

        // Replace the old passenger object with the new one
        newPassengerForm[passengerIndexToUpdate] = updatedPassenger;
      }

      return {
        ...state,
        passengerForm: newPassengerForm
      };
    }
    case 'SET_CURRENT_SEAT_ID': {
      return {
        ...state,
        currentSeatId: action.payload
      };
    }
    case 'NUKE_PASSENGER_FORM':
      return {
        ...state,
        passengerForm: initialState.passengerForm
      };

    default:
      return state;
  }
};

export default formReducer;
