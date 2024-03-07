import PropTypes from 'prop-types';
import TableHeader from '../molecules/TableHeaderTerminals';
import TableRow from '../molecules/TableRowTerminals';
import TableHeaderWrapper from '../atoms/TableHeaderWrapper';

function DataTable({ data, nSeats }) {
  return (
    <>
      <TableHeaderWrapper title='Mis Servicios' />
      <div className='px-4 py-2'>
        <table className='w-full table-auto border-separate border-spacing-y-2'>
          <TableHeader />
          <tbody>
            {data.map((row) => (
              <TableRow key={row.id} row={row} nSeats={nSeats} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

DataTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  nSeats: PropTypes.number.isRequired
};

export default DataTable;
