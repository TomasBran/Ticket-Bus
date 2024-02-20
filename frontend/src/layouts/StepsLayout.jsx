import { Outlet } from 'react-router-dom';
import { Steps } from '../components/Steps/Steps.jsx';
import { TravelHeader } from '../components/TravelHeader/index.jsx';

function StepsLayout() {
  return (
    <>
      <TravelHeader />
      <Steps />
      <Outlet />
    </>
  );
}

export default StepsLayout;
