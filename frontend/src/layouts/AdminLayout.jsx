import SideBarAdmin from '../components/SideBarAdmin/SideBarAdmin';
import LogoImage from '../components/LogoImage/LogoImage';
import { Link, Outlet } from 'react-router-dom';
import AccountButton from '../components/TravelHeader/components/atoms/AccountButton.jsx';

const AdminLayout = () => {
  function loginHandler() {
    console.log('Hello Admin');
  }
  return (
    <div>
      <div className='bg-[#D8ECF6] py-30 px-24 h-20 flex justify-between items-center'>
        <Link to='/'>
          <LogoImage />
        </Link>

        <AccountButton buttonText='Mi Cuenta' onClick={loginHandler} />
      </div>
      <div className='flex'>
        <div className='w-[25%] xl:w-[20%]'>
          <SideBarAdmin />
        </div>
        <div className='w-[75%]  flex items-center justify-center'>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
