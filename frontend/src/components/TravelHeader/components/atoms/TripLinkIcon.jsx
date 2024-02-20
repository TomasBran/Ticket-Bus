import PropTypes from 'prop-types';

function TripLinkIcon({ link, imagePath, alt, text }) {
  return (
    <div className='md:mx-2 sm:col-span-1'>
      <a
        href={link}
        className='flex items-center md:justify-center justify-start whitespace-nowrap'
      >
        <img src={imagePath} alt={alt} className='mr-2' /> {text}
      </a>
    </div>
  );
}

TripLinkIcon.propTypes = {
  link: PropTypes.string.isRequired,
  imagePath: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
};

export default TripLinkIcon;
