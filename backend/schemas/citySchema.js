const z = require('zod');

const cityBodySchema = z.object({
  name: z
    .string({
      required_error: 'Nombre de Ciudad Requerido',
      invalid_type_error: 'Nombre debe ser de tipo String'
    })
    .min(3, 'Nombre debe tener al menos 3 caracteres')
    .max(20, 'Nombre debe tener como máximo 20 caracteres')
});

module.exports = { cityBodySchema };
