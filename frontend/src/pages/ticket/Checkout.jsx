import { Link } from 'react-router-dom';
import busImage from '../../assets/Checkout/bus-checkout.svg';

function Checkout() {
  return (
    <div className='bg-[#EFF0F0] h-screen pt-32'>
      <div className='w-[511px] text-center mx-auto'>
        <div className='bg-[#84BCDA] h-56 pt-[52px] pb-10 rounded-t-md'>
          <img src={busImage} className='mx-auto' />
          <h1 className='font-semibold text-[32px] tracking-tighter text-white mt-1'>
            ¡Compra exitosa!
          </h1>
          <p className='text-[#DADADA] text-sm mt-1'>ID COMPRA 54698742</p>
        </div>
        <div className='h-[358px] bg-[#DEE5ED] text-sm text-[#A0AEC0] pt-16 rounded-b-md'>
          <p className='px-3 py-3 bg-white w-80 text-nowrap rounded-md mb-3 mx-auto'>
            COMPROBANTE N° 0000005248963
          </p>
          <p className='px-3 py-3 bg-white w-80 text-nowrap rounded-md mx-auto'>
            TARJETA CREDITO **** **** **** 1350
          </p>
          <p className='text-[#808393] text-sm font-medium mt-10'>
            Los tickets fueron enviados a tu email
          </p>
          <Link to='/'>
            <button className='bg-[#FF5F00] font-semibold text-base px-6 py-[10px] rounded-[40px] text-white mt-10'>
              Volver al inicio
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
