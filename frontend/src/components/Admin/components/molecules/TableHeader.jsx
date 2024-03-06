import ButtonArrowUp from '../atoms/ButtonArrowUp';
import TableCellHeader from '../atoms/TableCellHeader';

function TableHeader() {
  return (
    <thead>
      <tr className='bg-white h-12 text-[#212F5C]'>
        <TableCellHeader text='Origen' />
        <TableCellHeader text='Destino' />
        <th className='p-4 flex items-center'>
          <ButtonArrowUp />
          <span className='font-bold text-sm'>Fecha</span>
        </th>
        <TableCellHeader text='H. Salida' />
        <TableCellHeader text='H. Llegada' />
        <TableCellHeader text='Asientos Libres' />
        <TableCellHeader text='ID Vehículo' />
        <TableCellHeader text='Ver' />
      </tr>
    </thead>
  );
}

export default TableHeader;
