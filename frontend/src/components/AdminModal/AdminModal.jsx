import PropTypes from 'prop-types';
import alert from '../../assets/AdminModal/alert.svg';

function Modal({ isOpen, onClose, onAccept, onCancel, children }) {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 flex items-center justify-center z-20'>
      <div
        className='absolute inset-0 z-10 bg-[#EBF1FFA8]'
        onClick={onClose}
      ></div>
      <div className='bg-white p-6 z-40 w-[430px] h-[300px] flex flex-col items-center justify-around font-semibold shadow-2xl '>
        <img src={alert} alt='' />
        {children}
        <div className='flex justify-evenly w-full mt-4'>
          <button
            className='px-8 py-1 bg-white text-orange-500 border-orange-500 border rounded-full '
            onClick={onCancel}
          >
            Cancelar
          </button>
          <button
            className='px-8 py-1 bg-orange-600 text-white rounded-full'
            onClick={onAccept}
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onAccept: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
};

export default Modal;
