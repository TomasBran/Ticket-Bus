import PriceList from './PriceList.jsx';

function PricesCard() {
  return (
    <div className='bg-[#DEE5ED] max-w-[304px] min-h-96 rounded-[30px] px-16 pt-6 pb-14 mx-auto not-daisy'>
      <PriceList />
      <div className='mt-8'>
        <div className='flex items-center mb-3'>
          <div className='size-5 rounded-md bg-[#FFCC00] mr-2'></div>
          <p className='text-[#A0A0A0] font-medium text-sm'>Disponible</p>
        </div>
        <div className='flex items-center mb-3'>
          <div className='size-5 rounded-md bg-[#808393] mr-2'></div>
          <p className='text-[#A0A0A0] font-medium text-sm'>Ocupado</p>
        </div>
        <div className='flex items-center mb-3'>
          <div className='size-5 rounded-md bg-[#93E0BB] mr-2'></div>
          <p className='text-[#A0A0A0] font-medium text-sm'>Seleccionado</p>
        </div>
      </div>
    </div>
  );
}

export default PricesCard;
