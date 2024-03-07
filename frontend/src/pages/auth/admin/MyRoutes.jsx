import DataTable from '../../../components/Admin/components/organisms/DataTableRoutes';
import { useRoutes } from '../../../hooks/useRoutes';

export default function MyTerminals() {
  const { routes } = useRoutes();

  if (!routes || !routes.body || !routes.body.routes) {
    return <div>Loading...</div>;
  }

  // Extraer los datos necesarios de routes para la tabla
  const data = routes.body.routes.map((terminal) => ({
    id: terminal.id,
    origen: terminal.originTerminal.city.name,
    destino: terminal.destinationTerminal.city.name,
    fecha: terminal.duration, // Puedes reemplazar con los datos correctos si los tienes
    hora_salida: terminal.price // Puedes reemplazar con los datos correctos si los tienes
  }));

  return (
    <div className='bg-white w-full h-full py-10 px-10'>
      <DataTable data={data} />
    </div>
  );
}
