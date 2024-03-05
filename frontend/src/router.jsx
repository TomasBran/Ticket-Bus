import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home.jsx';
import MainLayout from './layouts/MainLayout.jsx';
import StepsLayout from './layouts/StepsLayout.jsx';
import TravelSelection from './pages/TravelSelection.jsx';
import TripReservation from './pages/ticket/TripReservation.jsx';
// import Register from './pages/auth/Register.jsx';
import RegisterAlt from './pages/auth/RegisterAlt.jsx';
import Payment from './pages/ticket/Payment.jsx';
import UserLayout from './layouts/UserLayout.jsx';
import MyPurchases from './pages/auth/user/MyPurchases.jsx';
import UserSettings from './pages/auth/user/UserSettings.jsx';
import UserTravelDistance from './pages/auth/user/UserTravelDistance.jsx';
import Summary from './pages/ticket/Summary.jsx';
import RequireScheduleData from './hoc/RequireScheduleData.jsx';
import SeatSelection from './pages/ticket/SeatSelection.jsx';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />
      }
    ]
  },
  {
    path: '/ticket',
    element: <StepsLayout />,
    children: [
      {
        index: true,
        element: (
          <RequireScheduleData>
            <TravelSelection />
          </RequireScheduleData>
        )
      },
      {
        path: 'seats',
        element: (
          <RequireScheduleData>
            <SeatSelection />
          </RequireScheduleData>
        )
      },
      {
        path: 'passengers',
        element: (
          <RequireScheduleData>
            <TripReservation />
          </RequireScheduleData>
        )
      },
      {
        path: 'summary',

        element: (
          <RequireScheduleData>
            <Summary />
          </RequireScheduleData>
        )
      },
      {
        path: 'payment',
        element: (
          <RequireScheduleData>
            <Payment />
          </RequireScheduleData>
        )
      }
    ]
  },
  {
    path: '/user',
    element: <UserLayout />,
    children: [
      {
        path: 'purchases',
        element: <MyPurchases />
      },
      {
        path: 'settings',
        element: <UserSettings />
      },
      {
        path: 'travel-distance',
        element: <UserTravelDistance />
      }
    ]
  },
  {
    path: '/register',
    element: <RegisterAlt />
  }
]);

export default router;
