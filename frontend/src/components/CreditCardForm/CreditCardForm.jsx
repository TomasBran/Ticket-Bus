import './CreditCardForm.css';
import SelectForm from './SelectForm';
import TextInput from './TextInput';
import creditCard from '../../assets/CreditCardForm/credit-card.svg';
import addCircle from '../../assets/CreditCardForm/add-circle.svg';
import { isValid } from 'creditcard.js';
import { getUpcomingYears } from '../../utils/dateUtils';
import { useCallback, useEffect, useRef, useState } from 'react';
import MailInput from './MailInput';
import CardNumberInput from './CardNumberInput';
import { useDispatch, useSelector } from 'react-redux';
import { setFieldValue, setFormFilled } from '../../store/Form/formActions';

function CreditCardForm() {
  // Constants
  const months = [
    { value: '01', option: '01' },
    { value: '02', option: '02' },
    { value: '03', option: '03' },
    { value: '04', option: '04' },
    { value: '05', option: '05' },
    { value: '06', option: '06' },
    { value: '07', option: '07' },
    { value: '08', option: '08' },
    { value: '09', option: '09' },
    { value: '10', option: '10' },
    { value: '11', option: '11' },
    { value: '12', option: '12' }
  ];
  const years = getUpcomingYears();
  const dispatch = useDispatch();
  const formRedux = useSelector((state) => state.form.creditCardForm);
  console.log(formRedux);

  // State
  const [form, setForm] = useState({
    cardHolder: formRedux.cardHolder || '',
    cardNumber: formRedux.cardNumber || '',
    ccv: formRedux.ccv || '',
    email: formRedux.email || '',
    confirmEmail: formRedux.confirmEmail || '',
    month: formRedux.month || '',
    year: formRedux.year || ''
  });
  const [formValid, setFormValid] = useState(false);

  // Validations

  const validateCardHolder = useCallback(() => {
    const words = form.cardHolder.trim().split(/\s+/);
    return words.length >= 2;
  }, [form.cardHolder]);

  const validateCardNumber = useCallback(() => {
    return isValid(form.cardNumber);
  }, [form.cardNumber]);

  const validateEmails = useCallback(() => {
    return (
      form.email !== '' &&
      form.email === form.confirmEmail &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
    );
  }, [form.email, form.confirmEmail]);

  const prevFormRef = useRef();
  useEffect(() => {
    prevFormRef.current = form;
  });

  useEffect(() => {
    // This function will run when the component unmounts
    return () => {
      const prevForm = prevFormRef.current;
      for (const field in prevForm) {
        if (prevForm[field] !== formRedux[field]) {
          dispatch(setFieldValue('creditCardForm', field, prevForm[field]));
        }
      }
    };
  }, [dispatch, formRedux]);

  // Check if the form is valid then dispatch action
  useEffect(() => {
    const isCardHolderValid = validateCardHolder();
    const isCardNumberValid = validateCardNumber();
    const areEmailsValid = validateEmails();
    const isMonthSelected = form.month !== '';
    const isYearSelected = form.year !== '';
    const isCcvFilled = form.ccv !== '';

    const areAllFieldsValid =
      isCardHolderValid &&
      isCardNumberValid &&
      areEmailsValid &&
      isMonthSelected &&
      isYearSelected &&
      isCcvFilled;
    setFormValid(areAllFieldsValid);
    if (formValid) {
      dispatch(setFormFilled('creditCardForm', true));
    }
  }, [
    form,
    validateCardHolder,
    validateCardNumber,
    validateEmails,
    dispatch,
    formValid
  ]);

  // Unfill form if it's not valid
  useEffect(() => {
    if (!formValid) {
      dispatch(setFormFilled('creditCardForm', false));
    }
  }, [dispatch, formValid]);

  // Handlers

  function handleInputChange(event) {
    const { id, value } = event.target;
    setForm((prevForm) => ({ ...prevForm, [id]: value }));
    // setForm({
    //   ...form,
    //   [event.target.id]: event.target.value
    // });
  }

  function handleCardHolderChange(event) {
    const cardHolder = event.target.value;
    if (/^[a-zA-Z\s]*$/.test(cardHolder)) {
      handleInputChange(event);
    }
  }

  const handleCardNumberChange = (event) => {
    const cardNumber = event.target.value;
    if (/^[\d\s]*$/.test(cardNumber)) {
      handleInputChange(event);
    }
  };

  function handleCcvChange(event) {
    var ccv = event.target.value;
    if (/^\d{0,5}$/.test(ccv)) {
      handleInputChange(event);
    }
  }

  function handleEmailChange(event) {
    handleInputChange(event);
  }

  function handleConfirmEmailChange(event) {
    handleInputChange(event);
  }

  function handleMonthChange(option) {
    setForm(function (prevForm) {
      return {
        ...prevForm,
        month: option.value
      };
    });
  }

  function handleYearChange(option) {
    setForm((prevForm) => ({
      ...prevForm,
      year: option.value
    }));
  }

  return (
    <div className='w-full font-jakarta'>
      <h1 className='text-[#1A202C] text-[32px] font-semibold text-center mb-4'>
        Datos de Tarjeta
      </h1>
      <div className='flip-container'>
        <img src={creditCard} className='mx-auto -mb-12 flip-image' />
      </div>
      <form
        className='bg-[#D3DCE7] rounded-md lg:px-24 md:pb-4 pt-16 pb-2 px-4 shadow text-sm max-w-lg mx-auto w-full'
        autoComplete='off'
      >
        <div className='max-w-[333px] mx-auto'>
          <div className='space-y-3 mb-9'>
            <TextInput
              id='cardHolder'
              placeholder='TITULAR DE LA TARJETA'
              value={form.cardHolder}
              onChange={handleCardHolderChange}
              isValid={validateCardHolder()}
            />
            <CardNumberInput
              id='cardNumber'
              placeholder='NUMERO DE LA TARJETA'
              value={form.cardNumber}
              onChange={handleCardNumberChange}
              isValid={validateCardNumber()}
            />
            <div className='flex w-full'>
              <SelectForm
                options={months}
                placeholder='MES'
                className={'mr-[10px] w-1/3 z-10'}
                onChange={handleMonthChange}
                value={form.month}
              />
              <SelectForm
                options={years}
                placeholder='AÑO'
                className={'mr-4 w-1/3 z-10'}
                onChange={handleYearChange}
                value={form.year}
              />
              <div className='w-1/3'>
                <TextInput
                  id='ccv'
                  placeholder='CCV'
                  value={form.ccv}
                  onChange={handleCcvChange}
                />
              </div>
            </div>
          </div>
          <div className='mb-3'>
            <MailInput
              id='email'
              placeholder='CORREO ELECTRONICO'
              value={form.email}
              onChange={handleEmailChange}
              isValid={validateEmails()}
            />
          </div>
          <MailInput
            id='confirmEmail'
            placeholder='CONFIRMA TU CORREO ELECTRONICO'
            value={form.confirmEmail}
            onChange={handleConfirmEmailChange}
            isValid={validateEmails()}
          />
        </div>
        <button
          type='submit'
          className='text-[#3A556A] ml-auto flex justify-end mt-7 items-center'
        >
          <img src={addCircle} />
          <h3 className='font-semibold text-[15px] ml-1'>Adherir tarjeta</h3>
        </button>
      </form>
    </div>
  );
}

export default CreditCardForm;
