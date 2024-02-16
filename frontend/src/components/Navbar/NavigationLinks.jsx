export const NavigationLinks = () => {
  const links = [
    { label: 'Destinos', url: '#' },
    { label: 'Beneficios', url: '#' },
    { label: 'Quiénes somos', url: '#' },
    { label: 'FAQ', url: '#' },
    { label: 'Contacto', url: '#' }
  ];

  return (
    // <div className='flex gap-6 items-end'>
    <div className='flex flex-col md:flex-row gap-4 md:gap-6 items-center'>
      {links.map((link, index) =>
        link.label === 'Destinos' ? (
          <a key={index} href={link.url} className='font-semibold text-xl'>
            {link.label}
          </a>
        ) : (
          <a key={index} href={link.url} className='text-lg text-[#566e8d]'>
            {link.label}
          </a>
        )
      )}
      <a href='#' className='hover:underline text-lg text-[#566e8d]'>
        Regístrame
      </a>
    </div>
  );
};
