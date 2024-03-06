import PropTypes from 'prop-types';

function TableCell({ text, borderColor }) {
  return (
    <td className={`border-t-2 border-b-2 border-[${borderColor}] py-2`}>
      <div className='px-4'>{text}</div>
    </td>
  );
}

TableCell.propTypes = {
  text: PropTypes.string.isRequired,
  borderColor: PropTypes.string
};

TableCell.defaultProps = {
  borderColor: '#EBF1FF'
};

export default TableCell;
