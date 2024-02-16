import { useState } from 'react';
import { Logo } from './Logo';
import { NavigationLinks } from './NavigationLinks';
import { UserActions } from './UserActions';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <nav className='bg-[#D3DCE7] h-28 border-2 border-[#697f9c]'>
      {/* <div className='h-full mx-14 flex items-center'> */}
      <div className='h-full mx-6 md:mx-14 flex items-center'>
        {/* <Logo />
        <NavigationLinks />
        <span className='text-lg mx-8 text-[#566e8d]'>|</span>
        <UserActions /> */}

        <Logo />
        <button className='md:hidden' onClick={toggleMenu}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M4 6h16M4 12h16M4 18h16'
            />
          </svg>
        </button>
        <div
          className={`md:flex ${isMenuOpen ? 'flex' : 'hidden'} md:items-center md:justify-end flex-col md:flex-row`}
        >
          <NavigationLinks />
          <span className='text-lg mx-8 text-[#566e8d]'>|</span>
          <UserActions />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
