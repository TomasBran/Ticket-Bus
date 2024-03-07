import TableCellHeader from '../atoms/TableCellHeader';

function TableHeader() {
  return (
    <thead>
      <tr className='bg-white h-12 text-[#212F5C]'>
        <TableCellHeader text='Origen' />
        <TableCellHeader text='Destino' />

        <TableCellHeader text='Duración' />
        <TableCellHeader text='Precio' />

        <TableCellHeader text='Editar' />
      </tr>
    </thead>
  );
}

export default TableHeader;
