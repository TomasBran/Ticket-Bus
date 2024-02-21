import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

function ContinueButton() {
  const navigate = useNavigate();
  const location = useLocation();

  // Access the travelSelected state from the Redux store
  const travelSelected = useSelector((state) => state.travel.travelSelected);

  // Check if the travelSelected object is empty
  const isTravelSelectedEmpty = Object.keys(travelSelected).length === 0;

  //   TODO: agregar mas casos mientras vayamos agregando vistas
  function handleClick() {
    switch (location.pathname) {
      case '/ticket':
        navigate('/ticket/seats');
        break;
      case '/ticket/seats':
        navigate('/ticket/passengers');
        break;
      default:
        break;
    }
  }

  return (
    <button
      className={`bg-[#D97706] px-5 rounded-[40px] h-11 flex items-center w-40 justify-center font-semibold text-white tracking-tight ${isTravelSelectedEmpty ? 'cursor-not-allowed bg-gray-600' : ''}`}
      onClick={() => handleClick()}
      disabled={isTravelSelectedEmpty}
    >
      Continuar
    </button>
  );
}

export default ContinueButton;
