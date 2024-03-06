import PropTypes from 'prop-types';

function TableHeaderWrapper({ title, bgColor }) {
  return (
    <div
      className={`w-full h-12 flex items-center justify-start py-4 px-8 bg-[${bgColor}]`}
    >
      <h3 className='text-base font-semibold text-white'>{title}</h3>
    </div>
  );
}

TableHeaderWrapper.propTypes = {
  title: PropTypes.string.isRequired,
  bgColor: PropTypes.string
};

TableHeaderWrapper.defaultProps = {
  bgColor: '#84BCDA'
};

export default TableHeaderWrapper;
