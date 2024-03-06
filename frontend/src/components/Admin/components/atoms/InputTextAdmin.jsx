import PropTypes from 'prop-types';

function InputTextAdmin({
  text,
  placeholder,
  value,
  onChange,
  type,
  disabled
}) {
  const handleInputChange = (event) => {
    onChange(event.target.value);
  };

  const backgroundClass = disabled
    ? 'bg-[#F1F1F1] border border-[#0000003B] border-2 text-base cursor-not-allowed'
    : 'bg-white border border-[#0000003B] border-2';

  return (
    <div className='relative'>
      <label
        className={`absolute -top-3 left-3 px-1 font-bold text-sm ${
          disabled ? 'bg-[#F1F1F1] rounded-full' : 'bg-white rounded'
        }`}
      >
        {text}
      </label>
      <input
        placeholder={placeholder}
        type={type}
        className={`md:w-96 w-48 h-[56px] rounded-md py-2 px-4 text-sm font-normal ${backgroundClass}`}
        disabled={disabled}
        value={value}
        onChange={handleInputChange}
      />
    </div>
  );
}

InputTextAdmin.propTypes = {
  text: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  disabled: PropTypes.bool
};

export default InputTextAdmin;
