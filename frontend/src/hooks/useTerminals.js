import { useQuery, useMutation } from 'react-query';
import { fetchTerminals, createTerminal } from '../services/terminals';

export function useTerminals() {
  const { data, error, isLoading } = useQuery(
    ['terminals'],
    () => fetchTerminals(),
    {
      // Ejemplo: en onSuccess puedes hacer algo
      onSuccess: (data) => {
        console.log(data);
      },
      // Ejemplo: en onError puedes hacer algo
      onError: (error) => {
        return error;
      }
    }
  );

  const createNewTerminal = useMutation(
    (newTerminalData) => createTerminal(newTerminalData),
    {
      onSuccess: (data) => {
        console.log('Nueva terminal creada:', data);
        // Aquí puedes realizar alguna acción adicional si la creación es exitosa, como refrescar la lista de rutas, etc.
      },
      onError: (error) => {
        console.error('Error al crear la ruta:', error);
        // Aquí puedes manejar el error de la creación de la ruta
      }
    }
  );

  return {
    terminals: data,
    error,
    isLoading,
    createNewTerminal: createNewTerminal.mutate
  };
}
