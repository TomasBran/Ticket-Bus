import { useLocation, Navigate } from 'react-router-dom';
import { useQueryParams } from '../hooks/useQueryParams';
import PropTypes from 'prop-types';

// Define the base required parameters
const baseRequiredParams = ['origin', 'destination', 'date'];

// Define a function that returns the required parameters based on the pathname and queryParams
const getRequiredParams = (pathname, queryParams) => {
  let requiredParams = [...baseRequiredParams];
  if (pathname !== '/ticket') {
    requiredParams.push('scheduleId');
    if (queryParams.returnDate) {
      requiredParams.push('returnDate', 'returnScheduleId');
    }
  }
  return requiredParams;
};

function RedirectIfMissingRequiredParams({ children }) {
  const queryParams = useQueryParams();
  const location = useLocation();

  // Determine the required parameters based on the current route
  const requiredParams = getRequiredParams(location.pathname, queryParams);
  console.log('requiredParams', requiredParams);

  // Check if all required parameters are present
  const hasRequiredParams = requiredParams.every(
    (param) => !!queryParams[param]
  );

  console.log('hasRequiredParams', hasRequiredParams);

  if (!hasRequiredParams) {
    // If not, redirect to home
    return <Navigate to='/' replace={true} />;
  }

  // If all required parameters are present, render the children
  return children;
}

RedirectIfMissingRequiredParams.propTypes = {
  children: PropTypes.element.isRequired
};

export default RedirectIfMissingRequiredParams;
