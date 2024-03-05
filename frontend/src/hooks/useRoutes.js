import { useQuery, useMutation } from 'react-query';
import { fetchRoutes, createRoute } from '../services/routes';

export function useRoutes() {
  const { data, error, isLoading } = useQuery(['routes'], () => fetchRoutes(), {
    // Ejemplo: en onSuccess puedes hacer algo
    onSuccess: (data) => {
      console.log(data);
    },
    // Ejemplo: en onError puedes hacer algo
    onError: (error) => {
      return error;
    }
  });

  const createNewRoute = useMutation(
    (newRouteData) => createRoute(newRouteData),
    {
      onSuccess: (data) => {
        console.log('Nueva ruta creada:', data);
        // Aquí puedes realizar alguna acción adicional si la creación es exitosa, como refrescar la lista de rutas, etc.
      },
      onError: (error) => {
        console.error('Error al crear la ruta:', error);
        // Aquí puedes manejar el error de la creación de la ruta
      }
    }
  );

  return {
    routes: data,
    error,
    isLoading,
    createNewRoute: createNewRoute.mutate // Aquí exponemos la función para crear una nueva ruta
  };
}
