const Hero = () => {
  return (
    <div className='flex flex-col sm:pt-0 md:flex-row items-center m-8 md:mr-0'>
      <div className='sm:mt-10 text-left p-8 md:p-20'>
        <p className='font-semibold my-4'>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit.
        </p>
        <h1 className='font-semibold text-3xl md:text-5xl my-4'>
          LOREM IPSUM DOLOR SIT AMET CONSECTUR
        </h1>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Amet, vel
          aliquid dolorem veniam consequatur minus voluptate fugit esse
          voluptatibus, reiciendis asperiores autem iste perspiciatis. Provident
          voluptates tempore vitae quae rem.
        </p>
      </div>
      <div>
        <img
          className='rounded-tl-[100px] md:rounded-tl-[100px]'
          src='https://www.voyenbus.com/assets/img/veb/veb_empresas_header_02.webp'
          alt=''
        />
      </div>
    </div>
  );
};

export default Hero;
