import PropTypes from 'prop-types';

function TableCellHeader({ text }) {
  return <th className='p-4 text-start font-bold text-sm'>{text}</th>;
}

TableCellHeader.propTypes = {
  text: PropTypes.node.isRequired
};

export default TableCellHeader;
