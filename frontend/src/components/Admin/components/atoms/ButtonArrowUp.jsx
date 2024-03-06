import PropTypes from 'prop-types';
import ArrowUp from '../../../../assets/DataTable/ArrowUpOrange.svg';

function ButtonArrowUp({ onClick }) {
  return (
    <button type='button' onClick={onClick}>
      <img src={ArrowUp} alt='Icono Up' className='mr-2 w-4 h-4' />
    </button>
  );
}

ButtonArrowUp.propTypes = {
  onClick: PropTypes.func
};

ButtonArrowUp.defaultProps = {
  onClick: () => {}
};

export default ButtonArrowUp;
