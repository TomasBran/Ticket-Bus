import { useState } from 'react';
import { useRoutes } from '../hooks/useRoutes';

function RoutesComponent() {
  const { createNewRoute, routes } = useRoutes();

  console.log(routes);

  const [newRouteData, setNewRouteData] = useState({
    originId: '',
    destinationId: '',
    duration: '',
    distance: '',
    price: ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    // Convertir el valor a número decimal si es distancia o precio
    const newValue =
      name === 'distance' || name === 'price' ? parseFloat(value) : value;

    // Convertir a número si es originId o destinationId
    const numericValue =
      name === 'originId' || name === 'destinationId'
        ? parseInt(newValue, 10)
        : newValue;

    setNewRouteData({
      ...newRouteData,
      [name]: numericValue
    });
  };

  const handleCreateRoute = async () => {
    try {
      await createNewRoute(newRouteData);
      setNewRouteData({
        originId: '',
        destinationId: '',
        duration: '',
        distance: '',
        price: ''
      });
      console.log(newRouteData);
    } catch (error) {
      console.error('Error al crear la nueva ruta:', error);
    }
  };

  return (
    <div>
      <h1>Rutas</h1>

      <div>
        <h2>Crear Nueva Ruta</h2>
        <div>
          <label>Origen:</label>
          <input
            type='number'
            name='originId'
            value={newRouteData.originId}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Destino:</label>
          <input
            type='number'
            name='destinationId'
            value={newRouteData.destinationId}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Duración:</label>
          <input
            type='text'
            name='duration'
            value={newRouteData.duration}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Distancia:</label>
          <input
            type='number'
            name='distance'
            value={newRouteData.distance}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Precio:</label>
          <input
            type='number'
            name='price'
            value={newRouteData.price}
            onChange={handleInputChange}
          />
        </div>
        <button onClick={handleCreateRoute}>Crear Ruta</button>
      </div>
    </div>
  );
}

export default RoutesComponent;
