import DataTable from '../../../components/Admin/components/organisms/DataTableTerminals';
import { useTerminals } from '../../../hooks/useTerminals';

export default function MyTerminals() {
  const { terminals } = useTerminals();

  if (!terminals || !terminals.body || !terminals.body.terminals) {
    return <div>Loading...</div>;
  }

  // Extraer los datos necesarios de terminals para la tabla
  const data = terminals.body.terminals.map((terminal) => ({
    id: terminal.id,
    origen: terminal.terminalName,
    destino: terminal.city.name,
    fecha: terminal.lon, // Puedes reemplazar con los datos correctos si los tienes
    hora_salida: terminal.lat // Puedes reemplazar con los datos correctos si los tienes
  }));

  return (
    <div className='bg-white w-full h-full py-10 px-10'>
      <DataTable data={data} />
    </div>
  );
}
