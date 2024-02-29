import { useMutation } from 'react-query';
import { registerUser } from '../services/auth';
import { useNavigate } from 'react-router-dom';

export function useRegister(setErrorMessage) {
  const navigate = useNavigate();

  return useMutation(registerUser, {
    onSuccess: () => {
      navigate('/');
    },
    onError: (error) => {
      setErrorMessage(error.message);
    }
  });
}
