import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer/Footer.jsx';

function MainLayout() {
  return (
    <>
      <Outlet />
      <Footer />
    </>
  );
}

export default MainLayout;
