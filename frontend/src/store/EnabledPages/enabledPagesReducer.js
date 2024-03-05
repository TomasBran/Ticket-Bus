const initialState = {
  enabledSeatPage: false,
  enabledPassengersPage: false,
  enabledSummaryPage: false,
  enabledPaymentPage: false
};

export const enabledPagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ENABLE_SEAT_PAGE':
      return { ...state, enabledSeatPage: true };
    case 'ENABLE_PASSENGERS_PAGE':
      return { ...state, enabledPassengersPage: true };
    case 'ENABLE_SUMMARY_PAGE':
      return { ...state, enabledSummaryPage: true };
    case 'ENABLE_PAYMENT_PAGE':
      return { ...state, enabledPaymentPage: true };
    case 'RESET_PAGES':
      return {
        ...state,
        enabledSeatPage: false,
        enabledPassengersPage: false,
        enabledSummaryPage: false,
        enabledPaymentPage: false
      };
    default:
      return state;
  }
};

export default enabledPagesReducer;
