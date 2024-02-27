import { useMutation } from 'react-query';
import { registerUser } from '../services/auth';
import { useNavigate } from 'react-router-dom';

export function useRegister() {
  const navigate = useNavigate();

  return useMutation(registerUser, {
    onSuccess: () => {
      navigate('/');
    }
  });
}
