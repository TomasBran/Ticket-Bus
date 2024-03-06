import { useState } from 'react';
import { useTerminals } from '../hooks/useTerminals';

function NewTerminalForm() {
  const { createNewTerminal } = useTerminals();
  const [terminalData, setTerminalData] = useState({
    lat: '',
    lon: '',
    cityId: '',
    terminalName: '',
    terminalCode: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const parsedValue = name === 'terminalName' ? value : parseFloat(value);
    setTerminalData({ ...terminalData, [name]: parsedValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (createNewTerminal) {
      try {
        await createNewTerminal(terminalData);
        console.log(terminalData);
        // Acciones adicionales después de crear la terminal (si es necesario)
        setTerminalData({
          lat: '',
          lon: '',
          cityId: '',
          terminalName: '',
          terminalCode: ''
        });
      } catch (error) {
        console.error('Error al crear la terminal:', error);
      }
    } else {
      console.error('createNewTerminal no está definido');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='terminalName'>Nombre de la Terminal:</label>
        <input
          type='text'
          id='terminalName'
          name='terminalName'
          value={terminalData.terminalName}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor='lat'>Latitud:</label>
        <input
          type='text'
          id='lat'
          name='lat'
          value={terminalData.lat}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor='lon'>Longitud:</label>
        <input
          type='text'
          id='lon'
          name='lon'
          value={terminalData.lon}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor='cityId'>ID de la Ciudad:</label>
        <input
          type='text'
          id='cityId'
          name='cityId'
          value={terminalData.cityId}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor='terminalCode'>Código de la Terminal:</label>
        <input
          type='text'
          id='terminalCode'
          name='terminalCode'
          value={terminalData.terminalCode}
          onChange={handleChange}
          required
        />
      </div>
      <button type='submit'>Crear Terminal</button>
    </form>
  );
}

export default NewTerminalForm;
