import SideBarAdmin from '../components/SideBarAdmin/SideBarAdmin';
import LogoImage from '../components/LogoImage/LogoImage';
import { Link } from 'react-router-dom';
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
      <SideBarAdmin />
    </div>
  );
};

export default AdminLayout;
