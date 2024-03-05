import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useQueryParams } from '../hooks/useQueryParams';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

function RequireScheduleData({ children }) {
  const { origin, destination, date } = useQueryParams();
  const location = useLocation();
  const {
    enabledSeatPage,
    enabledPassengersPage,
    enabledSummaryPage,
    enabledPaymentPage,
    enabledCheckoutPage
  } = useSelector((state) => state.enabledPages);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    let requiredParams = [origin, destination, date];

    if (location.pathname === '/ticket/seats' && !enabledSeatPage) {
      setShouldRedirect(true);
    } else if (
      location.pathname === '/ticket/passengers' &&
      (!enabledSeatPage || !enabledPassengersPage)
    ) {
      setShouldRedirect(true);
    } else if (
      location.pathname === '/ticket/summary' &&
      (!enabledSeatPage || !enabledPassengersPage || !enabledSummaryPage)
    ) {
      setShouldRedirect(true);
    } else if (
      location.pathname === '/ticket/payment' &&
      (!enabledSeatPage ||
        !enabledPassengersPage ||
        !enabledSummaryPage ||
        !enabledPaymentPage)
    ) {
      setShouldRedirect(true);
    } else if (
      location.pathname === '/ticket/checkout' &&
      !enabledCheckoutPage
    ) {
      console.log(enabledCheckoutPage);
      setShouldRedirect(true);
    } else if (requiredParams.some((param) => !param)) {
      setShouldRedirect(true);
    } else {
      setShouldRedirect(false);
    }
  }, [
    location.pathname,
    enabledSeatPage,
    enabledPassengersPage,
    enabledSummaryPage,
    enabledPaymentPage,
    enabledCheckoutPage,
    origin,
    destination,
    date
  ]);

  if (shouldRedirect) {
    return <Navigate to='/' />;
  }

  return children;
}

RequireScheduleData.propTypes = {
  children: PropTypes.element.isRequired
};

export default RequireScheduleData;
