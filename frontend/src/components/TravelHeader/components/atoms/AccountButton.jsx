import PropTypes from 'prop-types';

function AccountButton({ iconSrc, iconAlt, buttonText, onClick }) {
  return (
    <button
      type='button'
      className={`bg-[#486284] flex text-white rounded-md px-4 py-3 uppercase text-sm whitespace-nowrap`}
      onClick={onClick}
    >
      <img src={iconSrc} alt={iconAlt} className='mr-1 -ml-1' /> {buttonText}
    </button>
  );
}

AccountButton.propTypes = {
  iconSrc: PropTypes.string,
  iconAlt: PropTypes.string,
  buttonText: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default AccountButton;
