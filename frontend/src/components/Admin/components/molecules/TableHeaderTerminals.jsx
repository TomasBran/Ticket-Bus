import TableCellHeader from '../atoms/TableCellHeader';

function TableHeader() {
  return (
    <thead>
      <tr className='bg-white h-12 text-[#212F5C]'>
        <TableCellHeader text='Terminales' />
        <TableCellHeader text='Ciudad' />

        <TableCellHeader text='Longitud' />
        <TableCellHeader text='Latitud' />

        <TableCellHeader text='Editar' />
      </tr>
    </thead>
  );
}

export default TableHeader;
