import { useCallback, useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import viajes from '../../assets/Steps/viajes.svg';
import pasajeros from '../../assets/Steps/pasajero.svg';
import resumen from '../../assets/Steps/resumen.svg';
import asientos from '../../assets/Steps/asientos.svg';
import pago from '../../assets/Steps/pago.svg';
import greenArrow from '../../assets/Steps/greenArrow.svg';
import blueArrow from '../../assets/Steps/blueArrow.svg';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const Steps = () => {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState('');
  const [searchParams] = useSearchParams();

  const {
    enabledSeatPage,
    enabledPassengersPage,
    enabledSummaryPage,
    enabledPaymentPage
  } = useSelector((state) => state.enabledPages);

  const isSectionEnabled = (section) => {
    switch (section) {
      case 'asientos':
        return enabledSeatPage;
      case 'pasajeros':
        return enabledSeatPage && enabledPassengersPage;
      case 'resumen':
        return enabledSeatPage && enabledPassengersPage && enabledSummaryPage;
      case 'pago':
        return (
          enabledSeatPage &&
          enabledPassengersPage &&
          enabledSummaryPage &&
          enabledPaymentPage
        );
      default:
        return true;
    }
  };

  const determineActiveSection = useCallback(() => {
    const pathname = location.pathname;
    if (pathname.includes('seats')) {
      setActiveSection('asientos');
    } else if (pathname.includes('passengers')) {
      setActiveSection('pasajeros');
    } else if (pathname.includes('summary')) {
      setActiveSection('resumen');
    } else if (pathname.includes('payment')) {
      setActiveSection('pago');
    } else {
      setActiveSection('viajes');
    }
  }, [location.pathname, setActiveSection]);

  useEffect(() => {
    determineActiveSection();
  }, [determineActiveSection, location]);

  const sections = ['viajes', 'asientos', 'pasajeros', 'resumen', 'pago'];
  const activeIndex = sections.indexOf(activeSection);
  const icons = {
    viajes,
    pasajeros,
    resumen,
    asientos,
    pago
  };

  // TODO: añadir que no te deje clickear segun lo que esta en el contexto, si el usuario relleno las pasadas
  // Mapear cada seccion a su respectivo link
  const pageLinks = {
    viajes: `/ticket?${searchParams}`,
    pasajeros: `/ticket/passengers?${searchParams}`,
    asientos: `/ticket/seats?${searchParams}`,
    resumen: `/ticket/summary?${searchParams}`,
    pago: `/ticket/payment?${searchParams}`
  };

  return (
    <div className='flex items-center justify-between w-full border-2 md:border-[#486284] shadow rounded-r-full rounded-l-3xl'>
      {sections.map((section, index) => {
        const isEnabled = isSectionEnabled(section);
        return (
          <Link
            to={isEnabled ? pageLinks[section] : '#'}
            key={index}
            onClick={(e) => !isEnabled && e.preventDefault()}
            className={`flex items-center justify-around w-full ${
              index < activeIndex
                ? 'bg-[#CEFABE] md:block hidden h-14'
                : index === activeIndex
                  ? 'bg-[#CEFABE] h-14 rounded-r-full'
                  : index === activeIndex + 1
                    ? ' '
                    : 'hidden'
            } md:flex ${isEnabled ? '' : 'opacity-50 cursor-not-allowed'}`}
          >
            <div className='flex gap-4 ml-7 font-semibold text-[24px] text-[#3A556A] items-center'>
              <img src={icons[section]} alt={''} className='w-6 h-6 ' />
              <p className={`${index === activeIndex + 1 ? '' : 'block'}`}>
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </p>
            </div>

            <div className='overflow-x-hidden'>
              <img
                src={greenArrow}
                alt={'greenArrow'}
                className={`h-14 w-14 pr-2  ${index <= activeIndex ? 'block' : 'hidden'}`}
              />
              <img
                src={blueArrow}
                alt={'blueArrow'}
                className={`h-14 w-14 pr-2  ${index <= activeIndex ? 'hidden' : 'block'}`}
              />
            </div>
          </Link>
        );
      })}
    </div>
  );
};
