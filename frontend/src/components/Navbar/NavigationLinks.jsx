import { Link } from 'react-router-dom';

export const NavigationLinks = () => {
  const links = [
    { label: 'Destinos', url: '#' },
    { label: 'Beneficios', url: '#' },
    { label: 'Quiénes somos', url: '#' },
    { label: 'FAQ', url: '#' },
    { label: 'Contacto', url: '#' }
  ];

  return (
    <div className='flex flex-col md:flex-row gap-4 md:gap-6 items-center'>
      {links.map((link, index) =>
        link.label === 'Destinos' ? (
          <Link key={index} to={link.url} className='font-semibold text-xl'>
            {link.label}
          </Link>
        ) : (
          <Link key={index} to={link.url} className='text-lg text-[#566e8d]'>
            {link.label}
          </Link>
        )
      )}
      <Link to='/register' className='hover:underline text-lg text-[#566e8d]'>
        Regístrame
      </Link>
    </div>
  );
};
