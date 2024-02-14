import DestinoLogo from '../assets/TravelSteps/destino.svg';
import ServicioLogo from '../assets/TravelSteps/servicio.svg';
import ArriboLogo from '../assets/TravelSteps/arribo.svg';
import Linea from '../assets/TravelSteps/linea.svg';
import TravelStepsCard from './TravelStepsCard';

function TravelSteps() {
  return (
    // TODO: cambiar color de text a variable cuando tengamos listos los colores
    <section className='my-16 text-[#1A202C] max-w-[1440px] mx-auto'>
      <div className='text-center mb-14'>
        <h1 className='text-5xl text-[#486284] mb-8 font-medium tracking-tight'>
          Viaja en simples pasos (!)
        </h1>
        <p className='text-lg max-w-lg mx-auto'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et
        </p>
      </div>
      <div className='flex text-center justify-between px-20 relative'>
        <TravelStepsCard
          logo={DestinoLogo}
          title='Destino -----------'
          description='Aliquam erat volutpat. Integer malesuada turpis id fringilla suscipit. Maecenas ultrices, orci vitae convallis mattis.'
        />

        <img
          src={Linea}
          className='hidden lg:block absolute -z-10 xl:top-4 xl:left-56 xl:size-4/12 lg:left-64 lg:top-8 lg:size-3/12'
        />

        <TravelStepsCard
          logo={ServicioLogo}
          title='Selecciona el servicio'
          description='Aliquam erat volutpat. Integer malesuada turpis id fringilla suscipit. Maecenas ultrices, orci vitae convallis mattis.'
        />

        <img
          src={Linea}
          alt='Logo de una persona llevando una valija'
          className='hidden lg:block absolute -z-10 xl:top-4 xl:right-56 xl:size-4/12 lg:right-64 lg:top-8 lg:size-3/12'
        />

        <TravelStepsCard
          logo={ArriboLogo}
          title='Arribo -----------'
          description='Aliquam erat volutpat. Integer malesuada turpis id fringilla suscipit. Maecenas ultrices, orci vitae convallis mattis.'
        />
      </div>
    </section>
  );
}

export default TravelSteps;
