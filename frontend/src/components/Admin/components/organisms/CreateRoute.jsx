import { useState, useEffect } from 'react';
import rutas from '../../../../assets/AdminUsuario/rutas.svg';
import { useRoutes } from '../../../../hooks/useRoutes';
import InputSelectAdmin from '../atoms/InputSelectAdmin';
import InputTextAdmin from '../atoms/InputTextAdmin';
import SubmitButton from '../atoms/SubmitButton';
import CancelButton from '../atoms/CancelButton';

function CreateRoute() {
  const [cities, setCities] = useState([]);
  const [durationError, setDurationError] = useState('');

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch(
          'https://ticket-bus-api-dev.up.railway.app/api/v1/cities'
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const cities = data.body.cities;
        setCities(cities);

        // Actualiza el estado con los datos de las ciudades
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    };

    fetchCities();
  }, []); // Ejecutar solo una vez al montar el componente

  const { createNewRoute } = useRoutes();
  const [selectedOption1, setSelectedOption1] = useState('');
  const [selectedOption2, setSelectedOption2] = useState('');

  const getOriginIdFromOption = (option) => {
    // Aquí deberías implementar la lógica para obtener el ID del origen según la opción
    // Por ahora, simplemente devolveremos el valor de la opción
    return option.value;
  };

  const getDestinationIdFromOption = (option) => {
    // Aquí deberías implementar la lógica para obtener el ID del destino según la opción
    // Por ahora, simplemente devolveremos el valor de la opción
    return option.value;
  };

  const handleOptionChange1 = (option) => {
    setSelectedOption1(option);
    const originId = getOriginIdFromOption(option);
    setNewRouteData((prevData) => ({
      ...prevData,
      originId: originId
    }));
  };

  const handleOptionChange2 = (option) => {
    setSelectedOption2(option);
    const destinationId = getDestinationIdFromOption(option);
    setNewRouteData((prevData) => ({
      ...prevData,
      destinationId: destinationId
    }));
  };

  const [newRouteData, setNewRouteData] = useState({
    originId: '',
    destinationId: '',
    duration: '',
    distance: '',
    price: ''
  });

  const handleInputChange = (name, value) => {
    const newValue =
      name === 'distance' || name === 'price' ? parseFloat(value) : value;

    const numericValue =
      name === 'originId' || name === 'destinationId'
        ? parseInt(newValue, 10)
        : newValue;

    setNewRouteData((prevData) => ({
      ...prevData,
      [name]: numericValue
    }));
  };

  const handleCreateRoute = async () => {
    // Validar el formato de la duración
    const durationRegex = /^\d{2}:\d{2}:\d{2}$/; // Expresión regular para HH:MM:SS
    if (!durationRegex.test(newRouteData.duration)) {
      setDurationError('Ingrese la duración en el formato correcto(00:00:00)');
      return;
    } else {
      setDurationError(''); // Limpiar el mensaje de error si la validación es exitosa
    }

    try {
      await createNewRoute(newRouteData);
      console.log('Estado actual de newRouteData:', newRouteData);

      // Reiniciar los selectores después de crear la nueva ruta
      setSelectedOption1('');
      setSelectedOption2('');

      setNewRouteData({
        originId: '',
        destinationId: '',
        duration: '',
        distance: '',
        price: ''
      });
    } catch (error) {
      console.error('Error al crear la nueva ruta:', error);
    }
  };

  // Mapeamos las ciudades a las opciones
  const options1 = cities.map((city) => ({
    value: city.id,
    option: city.name
  }));
  const options2 = cities.map((city) => ({
    value: city.id,
    option: city.name
  }));

  return (
    <div className='shadow border rounded-md border-[#00000040] w-full m-32 mb-72'>
      <div className='flex justify-between items-center border-b-2 border-[#E0E0E0] p-4'>
        <h1 className='font-bold text-lg'>Crear ruta</h1>
        <img className='w-[27px]' src={rutas} alt='rutas' />
      </div>

      <div className='p-7'>
        <div className='flex flex-wrap gap-10 justify-center 2xl:justify-between '>
          <InputSelectAdmin
            options={options1} // Tus opciones para Origen 1
            text='Origen 1'
            onSelect={(option) => handleOptionChange1(option)} // Llama a handleOptionChange1 con la opción seleccionada
            selectedOption={selectedOption1} // Añade el valor seleccionado
          />

          <InputSelectAdmin
            options={options2} // Tus opciones para Origen 2
            text='Origen 2'
            onSelect={(option) => handleOptionChange2(option)} // Llama a handleOptionChange2 con la opción seleccionada
            selectedOption={selectedOption2} // Añade el valor seleccionado
          />
          <InputTextAdmin
            text='Duración'
            placeholder={'00:00:00'}
            onChange={(value) => handleInputChange('duration', value)}
            value={newRouteData.duration}
            name='duration'
            type='text'
          />

          <InputTextAdmin
            text='Distancia'
            placeholder={'700km'}
            onChange={(value) => handleInputChange('distance', value)}
            value={newRouteData.distance}
            name='distance'
            type='number'
          />
          <InputTextAdmin
            text='Precio'
            placeholder={'5000'}
            onChange={(value) => handleInputChange('price', value)}
            value={newRouteData.price}
            name='price'
            type='number'
          />
        </div>
        {durationError && (
          <p className='text-red-500 p-0 m-0 mt-3 text-center'>
            {durationError}
          </p>
        )}
        <div className='flex flex-wrap gap-5 justify-center 2xl:justify-between mt-16 '>
          <CancelButton text='Cancelar' />
          <SubmitButton text='Crear ruta' onClick={handleCreateRoute} />
        </div>
      </div>
    </div>
  );
}

export default CreateRoute;
