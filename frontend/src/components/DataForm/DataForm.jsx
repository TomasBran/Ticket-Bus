import TitleForm from '../PassengerForm/components/atoms/TitleForm';
import TextInput from '../../components/CreditCardForm/TextInput';
// import TextInput from '../PassengerForm/components/atoms/TextInput';
// import SelectForm from '../PassengerForm/components/atoms/SelectForm';
import { useCallback, useEffect, useRef, useState } from 'react';
import SelectForm from '../../components/CreditCardForm/SelectForm';
import MailInput from '../../components/CreditCardForm/MailInput';
import { useDispatch, useSelector } from 'react-redux';
import {
  setAcceptedTos,
  setFieldValue,
  setFormFilled
} from '../../store/Form/formActions';

export default function DataForm() {
  // Constants
  const options = [
    { value: 'dni', option: 'DNI' },
    { value: 'passport', option: 'Pasaporte' }
  ];
  const dispatch = useDispatch();
  const formRedux = useSelector((state) => state.form.passengerForm);
  const acceptedTos = useSelector((state) => state.form.acceptedTos);

  // State
  const [form, setForm] = useState({
    name: formRedux.name || '',
    lastname: formRedux.lastname || '',
    document: formRedux.document || '',
    email: formRedux.email || '',
    documentType: formRedux.documentType || '',
    confirmEmail: formRedux.confirmEmail || ''
  });
  const [isChecked, setIsChecked] = useState(acceptedTos || false);
  const [formValid, setFormValid] = useState(false);

  // Handlers
  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setForm((prevForm) => ({ ...prevForm, [id]: value }));
  };

  const handleDocumentTypeChange = (option) => {
    setForm((prevForm) => ({ ...prevForm, documentType: option.value }));
  };

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
    dispatch(setAcceptedTos(event.target.checked));
  };

  function handleEmailChange(event) {
    handleInputChange(event);
  }

  function handleConfirmEmailChange(event) {
    handleInputChange(event);
  }

  // Validation
  const validateForm = useCallback((form) => {
    const areAllFieldsFilled = Object.values(form).every(
      (field) => field !== ''
    );
    const areEmailsValid = form.email === form.confirmEmail;
    return areAllFieldsFilled && areEmailsValid;
  }, []);

  // Use useEffect to monitor form validity
  useEffect(() => {
    setFormValid(validateForm(form));
    // Dispatch an action if the form is valid
    if (formValid) {
      dispatch(setFormFilled('passengerForm', true));
    } else {
      dispatch(setFormFilled('passengerForm', false));
    }
  }, [form, validateForm, dispatch, formValid]);

  // Save form state to Redux when component unmounts
  const prevFormRef = useRef();
  useEffect(() => {
    prevFormRef.current = form;
  });
  useEffect(() => {
    return () => {
      const prevForm = prevFormRef.current;
      for (const field in prevForm) {
        if (prevForm[field] !== formRedux[field]) {
          dispatch(setFieldValue('passengerForm', field, prevForm[field]));
        }
      }
    };
  }, [dispatch, formRedux]);

  useEffect(() => {
    return () => {
      const prevForm = prevFormRef.current;
      for (const field in prevForm) {
        if (prevForm[field] !== formRedux[field]) {
          dispatch(setFieldValue('passengerForm', field, prevForm[field]));
        }
      }
    };
  }, [dispatch, formRedux]);

  const validateEmails = useCallback(() => {
    return (
      form.email !== '' &&
      form.email === form.confirmEmail &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
    );
  }, [form.email, form.confirmEmail]);

  return (
    <div>
      <TitleForm title='Datos Comprador' />

      <div>
        <form
          className=' bg-[#D3DCE7] rounded-md lg:px-24 md:pt-12 md:pb-7 pt-4 pb-2 px-4 shadow font-medium space-y-4'
          autoComplete='off'
        >
          <TextInput
            id='name'
            placeholder='NOMBRE'
            value={form.name}
            onChange={handleInputChange}
          />

          <TextInput
            id='lastname'
            placeholder='APELLIDO'
            value={form.lastname}
            onChange={handleInputChange}
          />

          <SelectForm
            options={options}
            placeholder='TIPO DE DOCUMENTO'
            className={'z-10'}
            onChange={handleDocumentTypeChange}
            value={form.documentType}
          />

          <TextInput
            id='document'
            placeholder='Nº DE DOCUMENTO'
            onChange={handleInputChange}
            value={form.document}
          />

          <MailInput
            id='email'
            placeholder='CORREO ELECTRONICO'
            value={form.email}
            onChange={handleEmailChange}
            isValid={validateEmails()}
          />

          <MailInput
            id='confirmEmail'
            placeholder='CONFIRMA TU CORREO ELECTRONICO'
            value={form.confirmEmail}
            onChange={handleConfirmEmailChange}
            isValid={validateEmails()}
          />
          <div className='pt-3'>
            <a
              href=''
              className='text-[#007AFF] text-xs tracking-tight font-medium'
            >
              ¿TIENES UN DESCUENTO?
            </a>
          </div>
        </form>

        <div className='flex items-center px-3 mt-6 md:px-24 md:mt-9'>
          <input
            type='checkbox'
            id='termsAndConditions'
            className='form-checkbox h-5 w-5 text-[#007AFF]'
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          <label
            htmlFor='termsAndConditions'
            className='ml-2 block text-gray-900'
          >
            Aceptar
            <a href='' className='text-[#007AFF] ml-2'>
              Términos y condiciones
            </a>
          </label>
        </div>
      </div>
    </div>
  );
}
