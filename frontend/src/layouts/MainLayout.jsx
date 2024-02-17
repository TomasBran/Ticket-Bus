import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer/Footer.jsx';
import { Navbar } from '../components/Navbar/Navbar.jsx';

function MainLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

export default MainLayout;
