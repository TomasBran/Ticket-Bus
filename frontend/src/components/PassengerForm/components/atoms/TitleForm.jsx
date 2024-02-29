import PropTypes from 'prop-types';

function TitleForm({ title }) {
  return (
    <h1 className='text-[#1A202C] md:text-[32px] text-2xl text-center font-semibold mb-5'>
      {title}
    </h1>
  );
}

TitleForm.propTypes = {
  title: PropTypes.string.isRequired
};

export default TitleForm;
