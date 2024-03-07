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
import NotFoundPage from './pages/Error/NotFoundPage.jsx';
import LoginForm from './components/Login/LoginForm.jsx';
import AdminLayout from './layouts/AdminLayout.jsx';
import HomeAdmin from './pages/auth/admin/HomeAdmin.jsx';
import CreateRoutesPage from './pages/auth/admin/CreateRoutesPage.jsx';
import CreateTerminalsPage from './pages/auth/admin/CreateTerminalsPage.jsx';
import CreateServicesPage from './pages/auth/admin/CreateServicesPage.jsx';
import MyTerminals from './pages/auth/admin/MyTerminals.jsx';
import MyRoutes from './pages/auth/admin/MyRoutes.jsx';

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
  },
  {
    path: '*',
    element: <NotFoundPage />
  },
  {
    path: '/login',
    element: <LoginForm />
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <HomeAdmin /> //Principal
      },
      {
        path: 'createTerminal',
        element: <CreateTerminalsPage />
      },
      {
        path: 'createRoute',
        element: <CreateRoutesPage />
      },
      {
        path: 'myRoutes',
        element: <MyRoutes />
      },
      {
        path: 'myTerminals',
        element: <MyTerminals />
      },
      {
        path: 'myServices',
        element: <CreateServicesPage />
      }
    ]
  }
]);

export default router;
