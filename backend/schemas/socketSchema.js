const z = require('zod');

const querySchema = z.object({
  scheduleId: z
    .number({
      required_error: 'Schedule ID de Horario Requerido',
      invalid_type_error: 'Tipo de Schedule ID Inválido'
    })
    .int('Schedule ID debe ser un entero')
    .positive('Schedule ID debe ser positivo'),
  date: z
    .string({
      required_error: 'Fecha Requerida',
      invalid_type_error: 'Fecha debe ser de tipo String'
    })
    .regex(/^([0-9]{4})-([0-9]{2})-([0-9]{2})$/, {
      message: 'Fecha debe ser de tipo String con formato "AAAA-MM-DD"'
    })
});

const messageSchema = z.object({
  scheduleId: z
    .number({
      required_error: 'Schedule ID de Horario Requerido',
      invalid_type_error: 'Tipo de Schedule ID Inválido'
    })
    .int('Schedule ID debe ser un entero')
    .positive('Schedule ID debe ser positivo'),
  seatId: z
    .number({
      required_error: 'Seat ID de Asiento Requerido',
      invalid_type_error: 'Tipo de Seat ID Inválido'
    })
    .int('Seat Id debe ser un entero')
    .positive('Seat Id debe ser positivo'),
  date: z
    .string({
      required_error: 'Fecha Requerida',
      invalid_type_error: 'Fecha debe ser de tipo String'
    })
    .regex(/^([0-9]{4})-([0-9]{2})-([0-9]{2})$/, {
      message: 'Fecha debe ser de tipo String con formato "AAAA-MM-DD"'
    }),
  type: z.enum(['lock', 'reservation'])
});

module.exports = { querySchema, messageSchema };
