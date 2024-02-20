import PropTypes from 'prop-types';

function RegisterButton({ onClick, text }) {
  return (
    <button
      type='button'
      onClick={onClick}
      className='bg-transparent text-[#486284] border-l-2 border-[#486284] font-normal  py-2 px-3 underline'
    >
      {text}
    </button>
  );
}

RegisterButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired
};

export default RegisterButton;
