import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home.jsx';
import MainLayout from './layouts/MainLayout.jsx';
import StepsLayout from './layouts/StepsLayout.jsx';
import ChooseTravel from './components/ChooseTravel/ChooseTravel.jsx';

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
        element: <ChooseTravel />
      },
      {
        path: 'seats',
        element: <ChooseTravel />
      },
      {
        path: 'passengers',
        element: <ChooseTravel />
      },
      {
        path: 'summary',
        element: <ChooseTravel />
      },
      {
        path: 'payment',
        element: <ChooseTravel />
      }
    ]
  }
]);

export default router;
