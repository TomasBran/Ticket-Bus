const PurchaseDetails = () => {
  return (
    <div className='md:max-w-80 max-h-80 w-full h-full bg-[#D8ECF6] md:bg-[#DEE5ED] flex flex-col gap-8 items-center p-5 rounded-lg'>
      <span className='font-bold text-xl'>Detalles de pago</span>
      <div className='w-full flex flex-col gap-1'>
        <div className='flex justify-between w-full'>
          <span className='font-medium text-lg'>Pasaje 1 - Ida</span>
          <span className='font-bold text-lg'>$50.000</span>
        </div>
        <div className='flex justify-between w-full'>
          <span className='font-medium text-lg'>Pasaje 2 - Vuelta</span>
          <span className='font-bold text-lg'>$70.000</span>
        </div>
      </div>
      <div className='daisy-divider' />
      <div className='flex justify-between w-full'>
        <span className='font-medium text-lg'>Total a pagar</span>
        <span className='font-bold text-xl'>$120.000</span>
      </div>
    </div>
  );
};

export default PurchaseDetails;
