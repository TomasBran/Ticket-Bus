import PropTypes from 'prop-types';

PriceRow.propTypes = {
  src: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired
};

function PriceRow({ src, price }) {
  return (
    <tr>
      <td className='flex font-bold text-[15px] pb-4'>
        <img src={src} className='mr-5 size-5' />
        <p className='text-[#1A202C]'>$ {price} -</p>
      </td>
    </tr>
  );
}

export default PriceRow;
