import { useEffect, useState } from 'react';
import DateInput from '../atoms/DateInput';
import NumberInput from '../molecules/NumberInput/NumberInput';
import SearchButton from '../atoms/SearchButton';
import Autocomplete from '../organisms/Autocomplete';
import { getCurrentDate } from '../../../../utils/dateUtils';
import { useDispatch } from 'react-redux';
import { useCities } from '../../../../hooks/useCities';
import { useFetchSchedules } from '../../../../hooks/useSchedules';
import ErrorAlert from '../../../Register/ErrorAlert';

const FormSearchTravels = () => {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [cityOptions, setCityOptions] = useState([]);
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    origin: '',
    destination: '',
    departure_date: getCurrentDate(),
    return_date: '',
    passengers: 1
  });

  // Estado adicional para la fecha de vuelta
  const [returnDate, setReturnDate] = useState(formData.return_date);

  // Validación del Formulario
  const [formValid, setFormValid] = useState(false);

  const handleOriginChange = (e) => {
    const value = e.target.value;
    setOrigin(value);
    validateInputs(value, destination);
    setFormData({ ...formData, origin: value });
    setIsFormSubmitted(false); // Set isFormSubmitted to false when the input value changes
  };

  const handleDestinationChange = (e) => {
    const value = e.target.value;
    setDestination(value);
    validateInputs(origin, value);
    setFormData({ ...formData, destination: value });
    setIsFormSubmitted(false); // Set isFormSubmitted to false when the input value changes
  };

  const validateInputs = (origin, destination) => {
    const isValidOrigin = cityOptions.includes(origin);
    const isValidDestination = cityOptions.includes(destination);
    const areDifferentCities = origin !== destination;

    if (isValidOrigin && isValidDestination && areDifferentCities) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;

    // Actualizar el estado del formulario
    setFormData({
      ...formData,
      [id]: value
    });

    // Actualizar el estado de la fecha de retorno si es necesario
    if (id === 'return_date') {
      setReturnDate(value);
    }

    setIsFormSubmitted(false); // Set isFormSubmitted to false when the input value changes
  };

  useEffect(() => {
    if (formData.departure_date) {
      setReturnDate('');
    }
  }, [formData.departure_date]);

  const handlePassengersChange = (newQuantity) => {
    setFormData({
      ...formData,
      passengers: newQuantity
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data:', formData);
    dispatch({ type: 'SET_SEAT_QUANTITY', payload: formData.passengers });
    setIsFormSubmitted(true); // Set isFormSubmitted to true after the form data is processed
  };

  // react-query

  // TODO: add refresh and error states for this fetch
  // const { error, isLoading } = useCities(setCityOptions);
  useCities(setCityOptions);

  // we fetch this here so it tells us if there are empty routes and it doesn't redirect the user to another page
  const { error: errorSchedule } = useFetchSchedules({
    originCity: origin,
    destinationCity: destination,
    date: formData.departure_date,
    returnDate: returnDate,
    passengers: formData.passengers,
    enabled: isFormSubmitted
  });

  return (
    <>
      <div className='flex flex-col items-center justify-center px-6 md:px-0 lg:-mt-28 sm:-mt-10 -mt-8 py-6 '>
        <div id='error-alert-container'>
          {errorSchedule && errorSchedule.message && (
            <ErrorAlert errorMessage={errorSchedule.message} />
          )}
        </div>
        <form
          className='bg-ocean-blue rounded px-6 py-6 lg:flex md:w-auto w-full shadow-2xl shadow-slate-500/40'
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <div className='grid lg:grid-cols-5 grid-cols-2 lg:divide-x-[1px] divide-midnight-slate gap-4'>
            <div className='mb-4 lg:ps-4 col-span-2 lg:col-span-1'>
              <label
                className='block text-color-dark tracking-tight font-bold mb-2 uppercase'
                htmlFor='origin'
              >
                Origen
              </label>
              <Autocomplete
                id='origin'
                value={origin}
                onChange={handleOriginChange}
                options={cityOptions}
                placeholder='Ciudad de Origen'
              />
            </div>
            <div className='mb-4 lg:ps-4 col-span-2 lg:col-span-1'>
              <label
                className='block text-color-dark tracking-tight font-bold mb-2 uppercase'
                htmlFor='destination'
              >
                Destino
              </label>
              <Autocomplete
                id='destination'
                value={destination}
                onChange={handleDestinationChange}
                options={cityOptions}
                placeholder='Ciudad de Destino'
              />
            </div>
            <div className='mb-4 lg:ps-4 md:w-full box-border'>
              <label
                className='block text-color-dark tracking-tight font-bold mb-2 uppercase'
                htmlFor='departure'
              >
                Ida
              </label>
              <DateInput
                id='departure_date'
                onChange={handleChange}
                value={formData.departure_date}
                min={getCurrentDate()}
              />
            </div>
            <div className='mb-4 md:ps-4  md:w-full box-border whitespace-nowrap'>
              <label
                className='block text-color-dark tracking-tight font-bold mb-2 truncate'
                htmlFor='return'
              >
                VUELTA (opcional)
              </label>
              <DateInput
                id='return_date'
                onChange={handleChange}
                value={returnDate}
                min={formData.departure_date}
              />
            </div>
            <div className='mb-4 lg:ps-4 col-span-2 lg:col-span-1'>
              <label
                className='block text-color-dark tracking-tight font-bold mb-2 uppercase'
                htmlFor='passengers'
              >
                Pasajeros
              </label>
              <NumberInput
                onQuantityChange={handlePassengersChange}
                quantityPassengers={formData.passengers}
              />
            </div>
          </div>
          <div className='lg:mb-4 lg:pl-4 flex items-end justify-center'>
            <SearchButton label='Buscar' disabled={!formValid} />
          </div>
        </form>
      </div>
    </>
  );
};

export default FormSearchTravels;
