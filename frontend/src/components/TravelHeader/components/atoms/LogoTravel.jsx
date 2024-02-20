import PropTypes from 'prop-types';
import ArrowBackSVG from '../../../../assets/TravelHeader/Arrow Back.svg';

function LogoTravel({ imagePath }) {
  return (
    <div className='hidden lg:flex items-center col-span-1'>
      <a href='/' className='md:-ml-3'>
        <img src={ArrowBackSVG} alt='Arrow Right' className='w-6 h-6' />
      </a>
      <a href='/' className='font-semibold md:text-4xl text-3xl ml-2'>
        {imagePath ? (
          <img src={imagePath} alt='Logo' className='w-10' />
        ) : (
          'Logo'
        )}
      </a>
    </div>
  );
}

LogoTravel.propTypes = {
  imagePath: PropTypes.string
};

export default LogoTravel;
