const z = require('zod');

const terminalBodySchema = z.object({
  lat: z.number({
    required_error: 'Latitud Requerida',
    invalid_type_error: 'Latitud debe ser de tipo numérico'
  }),
  lon: z.number({
    required_error: 'Longitud Requerida',
    invalid_type_error: 'Longitud debe ser de tipo numérico'
  }),
  cityId: z
    .number({
      required_error: 'Id de Ciudad Requerido',
      invalid_type_error: 'Tipo ID Inválido, debe ser tipo INTEGER.'
    })
    .int('Id debe ser un entero')
    .positive('Id debe ser positivo'),
  terminalName: z.string({
    required_error: 'Nombre de Terminal Requerido',
    invalid_type_error: 'Nombre debe ser de tipo String'
  }),
  terminalCode: z
    .number({
      required_error: 'Código de Terminal Requerido',
      invalid_type_error: 'Código debe ser de tipo numérico'
    })
    .positive('Código debe ser positivo')
});

module.exports = {
  terminalBodySchema
};
