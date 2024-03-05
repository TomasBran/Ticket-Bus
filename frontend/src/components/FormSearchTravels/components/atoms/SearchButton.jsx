import PropTypes from 'prop-types';

function SearchButton({ label, disabled }) {
  return (
    <button
      disabled={disabled}
      className={`block rounded-md px-8 py-3 w-full text-center text-decoration-none ${
        disabled
          ? 'bg-btn-orange cursor-not-allowed'
          : 'bg-btn-orange text-white cursor-pointer'
      }`}
      type='submit'
    >
      {label}
    </button>
  );
}

SearchButton.propTypes = {
  label: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired
};

export default SearchButton;
