/* eslint-disable react-hooks/exhaustive-deps */
// TODO: temporary
import { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setPassengerFieldValue,
  setPassengerFormFilled
} from '../../../../store/Form/formActions.js';
import TextInput from '../../../CreditCardForm/TextInput';
import SelectForm from '../../../CreditCardForm/SelectForm';
import PassengerList from '../atoms/PassengerList.jsx';
import FormNavigation from '../molecules/FormNavigation.jsx';
import TitleSubtitle from '../molecules/TitleSubtitle.jsx';
import PropTypes from 'prop-types';

function PassengerForm({ auth, seatId }) {
  const dispatch = useDispatch();
  const seatQuantity = useSelector((state) => state.seat.seatQuantity);
  const formRedux =
    useSelector((state) =>
      state.form.passengerForm.find((form) => form.seatId === seatId)
    ) || {};
  const [form, setForm] = useState(formRedux);
  const [isToggled, setIsToggled] = useState(false);
  const currentSeatId = useSelector((state) => state.form.currentSeatId);

  useEffect(() => {
    if (formRedux) {
      setForm(formRedux);
    } else {
      // Reset form or set to initial state
      setForm({
        /* initial state */
      });
    }
  }, [seatId]);

  // Controla la Lista de Pasajeros si Inicio Sesión
  const handleToggleChange = (value) => {
    setIsToggled(value);
    console.log(value);
  };

  useEffect(() => {
    // Verificar si auth cambió a false y cerrar la lista  de pasajeros si es así
    if (!auth) {
      setIsToggled(false);
    }
  }, [auth]);

  const options = [{ value: 'dni', option: 'DNI' }];

  const passengers = [
    { name: 'Mateo', lastname: 'Gonzalez', dni: '12345678' },
    { name: 'Sofia', lastname: 'Rodriguez', dni: '23456789' },
    { name: 'Valentina', lastname: 'Gomez', dni: '34567890' },
    { name: 'Benjamin', lastname: 'Fernandez', dni: '45678901' }
  ];

  // Validation
  const validateForm = useCallback((form) => {
    const areAllFieldsFilled = Object.values(form).every(
      (field) => field !== ''
    );

    return areAllFieldsFilled;
  }, []);

  // Handlers
  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setForm((prevForm) => ({ ...prevForm, [id]: value }));
    dispatch(setPassengerFieldValue({ field: id, value, seatId }));
  };

  const handleDocumentTypeChange = (option) => {
    setForm((prevForm) => ({ ...prevForm, documentType: option.value }));
    dispatch(
      setPassengerFieldValue({
        field: 'documentType',
        value: option.value,
        seatId
      })
    );
  };

  // Use useEffect to monitor form validity
  useEffect(() => {
    const formValid = validateForm(form);
    dispatch(setPassengerFormFilled('passengerForm', formValid, seatId));
  }, [form, validateForm, dispatch, seatId]);

  const filteredPassengers = passengers.slice(0, seatQuantity);

  return (
    <div className='bg-background-light  flex flex-col h-full relative'>
      <TitleSubtitle />
      <div className='w-full'>
        <form
          className='bg-[#DEE5ED] rounded-md lg:px-24 lg:pt-[3.3rem] lg:pb-14 md:pt-11 md:pb-14 sm:px-6 sm:pt-6 sm:pb-7 pt-4 pb-5 px-4 shadow'
          autoComplete='off'
        >
          <div className='mb-6 relative'>
            <FormNavigation
              passenger={seatQuantity}
              onClick={handleToggleChange}
              isAuth={auth}
              currentSeatId={currentSeatId}
            />
            <PassengerList
              passengers={filteredPassengers}
              isToggled={isToggled}
            />
          </div>
          <div className='mb-4'>
            <TextInput
              id='name'
              placeholder='NOMBRE'
              value={form.name || ''}
              onChange={handleInputChange}
            />
          </div>
          <div className='mb-4'>
            <TextInput
              id='lastname'
              placeholder='APELLIDO'
              value={form.lastname || ''}
              onChange={handleInputChange}
            />
          </div>
          <div className='mb-4'>
            <SelectForm
              options={options}
              placeholder='TIPO DE DOCUMENTO'
              className={'z-10'}
              onChange={handleDocumentTypeChange}
              value={form.documentType || ''}
            />
          </div>
          <div className='mb-4'>
            <TextInput
              id='document'
              placeholder='N° DE DOCUMENTO'
              value={form.document || ''}
              onChange={handleInputChange}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

PassengerForm.propTypes = {
  auth: PropTypes.bool.isRequired,
  seatId: PropTypes.string.isRequired
};

export default PassengerForm;
