import { useState, useEffect } from 'react';
import rutas from '../../../../assets/AdminUsuario/rutas.svg';
import { useTerminals } from '../../../../hooks/useTerminals';
import InputSelectAdmin from '../atoms/InputSelectAdmin';
import InputTextAdmin from '../atoms/InputTextAdmin';
import SubmitButton from '../atoms/SubmitButton';
import CancelButton from '../atoms/CancelButton';

function CreateTerminal() {
  const [cities, setCities] = useState([]);

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
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    };

    fetchCities();
  }, []);

  const { createNewTerminal } = useTerminals();
  const [selectedCity, setSelectedCity] = useState('');
  const [lat, setLat] = useState('');
  const [lon, setLon] = useState('');
  const [terminalName, setTerminalName] = useState('');
  const [terminalCode, setTerminalCode] = useState('');

  const handleCreateTerminal = async () => {
    if (!lat || !lon || !selectedCity || !terminalName || !terminalCode) {
      console.error('Please fill in all fields');
      return;
    }

    try {
      await createNewTerminal({
        lat: parseFloat(lat),
        lon: parseFloat(lon),
        cityId: parseInt(selectedCity),
        terminalName,
        terminalCode: parseInt(terminalCode)
      });

      // Clear input fields after successful creation
      setSelectedCity('');
      setLat('');
      setLon('');
      setTerminalName('');
      setTerminalCode('');
    } catch (error) {
      console.error('Error creating new terminal:', error);
    }
  };

  const handleCityChange = (cityId) => {
    setSelectedCity(cityId);
  };

  return (
    <div className='shadow border rounded-md border-[#00000040] w-full m-32 mb-72'>
      <div className='flex justify-between items-center border-b-2 border-[#E0E0E0] p-4'>
        <h1 className='font-bold text-lg'>Crear terminal</h1>
        <img className='w-[27px]' src={rutas} alt='rutas' />
      </div>

      <div className='p-7'>
        <div className='flex flex-wrap gap-10 justify-center 2xl:justify-between'>
          <InputSelectAdmin
            options={cities.map((city) => ({
              value: city.id,
              option: city.name
            }))}
            text='Ciudad'
            onSelect={(option) => handleCityChange(option.value)}
            selectedOption={selectedCity}
          />

          <InputTextAdmin
            text='Latitud'
            placeholder='-34.586038978354786'
            onChange={(value) => setLat(value)}
            value={lat}
            name='lat'
            type='number'
          />

          <InputTextAdmin
            text='Longitud'
            placeholder='-58.373904326868484'
            onChange={(value) => setLon(value)}
            value={lon}
            name='lon'
            type='number'
          />

          <InputTextAdmin
            text='Nombre Terminal'
            placeholder='Nueva Terminal'
            onChange={(value) => setTerminalName(value)}
            value={terminalName}
            name='terminalName'
            type='string'
          />

          <InputTextAdmin
            text='Código Terminal'
            placeholder='211'
            onChange={(value) => setTerminalCode(value)}
            value={terminalCode}
            name='terminalCode'
            type='number'
          />
        </div>
        <div className='flex flex-wrap gap-5 justify-center 2xl:justify-between mt-16'>
          <CancelButton text='Cancelar' />
          <SubmitButton text='Crear Terminal' onClick={handleCreateTerminal} />
        </div>
      </div>
    </div>
  );
}

export default CreateTerminal;
