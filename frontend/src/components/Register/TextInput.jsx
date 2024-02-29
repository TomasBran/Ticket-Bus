import PropTypes from 'prop-types';

function TextInput({ id, placeholder, name, value, onChange, pattern, title }) {
  const handleInvalid = (event) => {
    event.target.setCustomValidity(title);
  };

  const handleInput = (event) => {
    event.target.setCustomValidity('');
  };

  return (
    <div className='mb-4 text-sm'>
      <input
        className='shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
        id={id}
        type='text'
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        pattern={pattern}
        onInvalid={handleInvalid}
        onInput={handleInput}
        required
      />
    </div>
  );
}

TextInput.propTypes = {
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  pattern: PropTypes.string,
  title: PropTypes.string
};

export default TextInput;
