import PropTypes from 'prop-types';
import ArrowRight from '../../../../assets/DataTable/ArrowRightBlue.svg';

function ButtonArrowRight({ onClick }) {
  return (
    <button type='button' onClick={onClick}>
      <img src={ArrowRight} alt='Icono Up' className='mr-2 w-4 h-4' />
    </button>
  );
}

ButtonArrowRight.propTypes = {
  onClick: PropTypes.func
};

ButtonArrowRight.defaultProps = {
  onClick: () => {}
};

export default ButtonArrowRight;
