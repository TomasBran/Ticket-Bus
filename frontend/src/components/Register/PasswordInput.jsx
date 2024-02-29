import PropTypes from 'prop-types';
import { useState } from 'react';
import eye from '../../assets/Register/eye.svg';
import eyeSlash from '../../assets/Register/eye-slash.svg';

function PasswordInput({
  id,
  placeholder,
  name,
  value,
  onChange,
  pattern,
  title
}) {
  const [showPassword, setShowPassword] = useState(false);

  const handleInvalid = (event) => {
    event.target.setCustomValidity(title);
  };

  const handleInput = (event) => {
    event.target.setCustomValidity('');
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className='mb-4 text-sm flex'>
      <input
        className='shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
        id={id}
        type={showPassword ? 'text' : 'password'}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        pattern={pattern}
        onInvalid={handleInvalid}
        onInput={handleInput}
        required
      />
      <button type='button' onClick={toggleShowPassword} className=''>
        {showPassword ? (
          <img
            src={eyeSlash}
            alt='Hide password'
            className='size-4 bg-white h-full w-8 px-1 rounded ml-1'
          />
        ) : (
          <img
            src={eye}
            alt='Show password'
            className='size-4 bg-white h-full w-8 px-1 rounded ml-1'
          />
        )}
      </button>
    </div>
  );
}

PasswordInput.propTypes = {
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  pattern: PropTypes.string,
  title: PropTypes.string
};

export default PasswordInput;
