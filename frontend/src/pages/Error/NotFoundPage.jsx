import { Link } from 'react-router-dom';
import image from '../../assets/Register/registerImage.webp';

export default function NotFoundPage() {
  return (
    <main className='relative min-h-screen'>
      <img
        src={image}
        alt=''
        className='absolute inset-0 -z-10 h-full w-full object-cover object-top brightness-50'
      />
      <div className='mx-auto max-w-7xl px-6 py-32 text-center sm:py-40 lg:px-8'>
        <p className='text-base font-semibold leading-8 text-white'>404</p>
        <h1 className='mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl'>
          Pagina no encontrada
        </h1>
        <p className='mt-4 text-base text-white/70 sm:mt-6'>
          Perdón, no pudimos encontrar la página que buscabas.
        </p>
        <div className='mt-10 flex justify-center'>
          <Link to='/' className='text-sm font-semibold leading-7 text-white'>
            <span aria-hidden='true'>&larr;</span> Volver al inicio
          </Link>
        </div>
      </div>
    </main>
  );
}
