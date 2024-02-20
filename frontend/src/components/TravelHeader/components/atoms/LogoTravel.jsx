import PropTypes from 'prop-types';

function LogoTravel({ imagePath }) {
  return (
    <div className='hidden lg:flex items-center box-border'>
      <a
        href='/'
        className='font-semibold xl:text-4xl lg:text-3xl ml-1 lg:-ml-1'
      >
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
