import { useState } from 'react';
import CardProfits from './CardProfits.jsx';

export default function Profits() {
  const [selectedTab, setSelectedTab] = useState('yes'); // Estado para almacenar la pestaña seleccionada

  return (
    <div className='flex flex-col justify-center items-center p-2'>
      <h2 className='text-5xl pb-5 text-center'>Nuestros Destinos</h2>
      <p className='pb-5 pl-2'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et
      </p>

      <div className='flex items-center justify-center'>
        <ul className='mx-auto flex max-w-full w-full items-center gap-x-0 md:gap-x-10 px-8'>
          <li>
            <input
              className='peer sr-only'
              type='radio'
              value='yes'
              name='answer'
              id='yes'
              checked={selectedTab === 'yes'} // Establece la pestaña como seleccionada si es 'yes'
              onChange={() => setSelectedTab('yes')} // Cambia el estado cuando se selecciona esta pestaña
            />
            <label
              className={`flex justify-center cursor-pointer  bg-white py-2 px-4  focus:outline-none ${
                selectedTab === 'yes' ? 'border-b-2 border-black' : ''
              } transition-all duration-200 ease-in-out`}
              htmlFor='yes'
            >
              Popular
            </label>
          </li>

          <li>
            <input
              className='peer sr-only'
              type='radio'
              value='no'
              name='answer'
              id='no'
              checked={selectedTab === 'no'} // Establece la pestaña como seleccionada si es 'no'
              onChange={() => setSelectedTab('no')} // Cambia el estado cuando se selecciona esta pestaña
            />
            <label
              className={`flex justify-center cursor-pointer  bg-white py-2 px-4  focus:outline-none ${
                selectedTab === 'no' ? 'border-b-2 border-black' : ''
              } transition-all duration-200 ease-in-out`}
              htmlFor='no'
            >
              Promociones
            </label>
          </li>

          <li>
            <input
              className='peer sr-only'
              type='radio'
              value='yesno'
              name='answer'
              id='yesno'
              checked={selectedTab === 'yesno'} // Establece la pestaña como seleccionada si es 'yesno'
              onChange={() => setSelectedTab('yesno')} // Cambia el estado cuando se selecciona esta pestaña
            />
            <label
              className={`flex justify-center cursor-pointer  bg-white py-2 px-4  focus:outline-none ${
                selectedTab === 'yesno' ? 'border-b-2 border-black' : ''
              } transition-all duration-200 ease-in-out`}
              htmlFor='yesno'
            >
              Paquetes turísticos
            </label>
          </li>

          <li>
            <input
              className='peer sr-only'
              type='radio'
              value='noyes'
              name='answer'
              id='noyes'
              checked={selectedTab === 'noyes'} // Establece la pestaña como seleccionada si es 'noyes'
              onChange={() => setSelectedTab('noyes')} // Cambia el estado cuando se selecciona esta pestaña
            />
            <label
              className={`flex justify-center cursor-pointer  bg-white py-2 px-4  focus:outline-none ${
                selectedTab === 'noyes' ? 'border-b-2 border-black' : ''
              } transition-all duration-200 ease-in-out`}
              htmlFor='noyes'
            >
              Paquetes turísticos
            </label>
          </li>
        </ul>
      </div>
      <div className='carousel carousel-center max-w-md p-4 space-x-4 bg-neutral rounded-box'>
        <div className='carousel-item'>
          <img
            src='https://daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.jpg'
            className='rounded-box'
          />
        </div>
        <div className='carousel-item'>
          <img
            src='https://daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.jpg'
            className='rounded-box'
          />
        </div>
        <div className='carousel-item'>
          <img
            src='https://daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.jpg'
            className='rounded-box'
          />
        </div>
        <div className='carousel-item'>
          <img
            src='https://daisyui.com/images/stock/photo-1494253109108-2e30c049369b.jpg'
            className='rounded-box'
          />
        </div>
        <div className='carousel-item'>
          <img
            src='https://daisyui.com/images/stock/photo-1550258987-190a2d41a8ba.jpg'
            className='rounded-box'
          />
        </div>
        <div className='carousel-item'>
          <img
            src='https://daisyui.com/images/stock/photo-1559181567-c3190ca9959b.jpg'
            className='rounded-box'
          />
        </div>
        <div className='carousel-item'>
          <img
            src='https://daisyui.com/images/stock/photo-1601004890684-d8cbf643f5f2.jpg'
            className='rounded-box'
          />
        </div>
      </div>
      {/* Contenido de las pestañas */}
      <div className='flex flex-wrap gap-5 items-center justify-center mt-5 '>
        {selectedTab === 'yes' && (
          <>
            <CardProfits />
            <CardProfits />
            <CardProfits />
            <CardProfits />
            <CardProfits />
            <CardProfits />
          </>
        )}
        {selectedTab === 'no' && (
          <>
            <CardProfits />
            <CardProfits />
            <CardProfits />
            <CardProfits />
            <CardProfits />
            <CardProfits />
          </>
        )}
        {selectedTab === 'yesno' && (
          <>
            <CardProfits />
            <CardProfits />
            <CardProfits />
            <CardProfits />
            <CardProfits />
            <CardProfits />
          </>
        )}
        {selectedTab === 'noyes' && (
          <>
            <CardProfits />
            <CardProfits />
            <CardProfits />
            <CardProfits />
            <CardProfits />
            <CardProfits />
          </>
        )}
      </div>
      <button className='bg-green-400 p-3 rounded-lg text-white w-60 mt-5'>
        Ver mas
      </button>
    </div>
  );
}
