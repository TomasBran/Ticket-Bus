const { Router } = require('express');
const {
  getAll,
  getCityById,
  createCity,
  updateCity,
  deleteCity
} = require('../controllers/city');

const router = Router();

/**
 * @swagger
 * /cities:
 *   get:
 *     tags:
 *       - Cities
 *     summary: Obtener todas las ciudades
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ApiResponse"
 *             examples:
 *               "1":
 *                 summary: Success
 *                 value:
 *                   status: success
 *                   code: 200
 *                   message: Ciudades obtenidas con éxito!
 *                   body:
 *                     cities:
 *                     - id: 1
 *                       name: Buenos Aires
 *                       createdAt: "2024-02-26T17:16:01.354Z"
 *                       updatedAt: "2024-02-26T17:16:01.354Z"
 *                     - id: 2
 *                       name: Córdoba
 *                       createdAt: "2024-02-26T17:16:01.354Z"
 *                       updatedAt: "2024-02-26T17:16:01.354Z"
 *
 */
router.get('/', getAll);

/**
 * @swagger
 * /cities/id/{id}:
 *   get:
 *     summary: Obtener ciudad por ID
 *     tags:
 *     - Cities
 *     parameters:
 *     - name: id
 *       in: path
 *       description: ID que identifica la ciudad
 *       required: true
 *       example: "1"
 *       schema:
 *         type: integer
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               "$ref": "#/components/schemas/ApiResponse"
 *             examples:
 *               "1":
 *                 summary: Success
 *                 value:
 *                   status: success
 *                   code: 200
 *                   message: Ciudad obtenida con éxito!
 *                   body:
 *                     id: 1
 *                     name: Buenos Aires
 *                     createdAt: "2024-02-26T17:16:01.354Z"
 *                     updatedAt: "2024-02-26T17:16:01.354Z"
 *       "404":
 *         description: Record Not Found
 *         content:
 *           application/json:
 *             schema:
 *               "$ref": "#/components/schemas/ApiResponse"
 *             examples:
 *               "1":
 *                 summary: Exception
 *                 value:
 *                   status: fail
 *                   code: 404
 *                   message: "No se encontró ciudad con el ID: 0"
 */
router.get('/id/:id', getCityById);

/**
 * @swagger
 * /cities:
 *   post:
 *     tags:
 *       - Cities
 *     summary: Crear ciudad
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: name
 *             required:
 *             - name
 *           example:
 *             name: Palpalá
 *     responses:
 *       "200":
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               "$ref": "#/components/schemas/ApiResponse"
 *             examples:
 *               "1":
 *                 summary: Success
 *                 value:
 *                   status: success
 *                   code: 200
 *                   message: Ciudad creada con éxito!
 *                   body:
 *                     id: 40
 *                     name: Palpalá
 *                     updatedAt: "2024-02-26T19:00:06.865Z"
 *                     createdAt: "2024-02-26T19:00:06.865Z"
 *       "409":
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               "$ref": "#/components/schemas/ApiResponse"
 *             examples:
 *               "1":
 *                 summary: "Exception: Ciudad repetida"
 *                 value:
 *                   status: fail
 *                   code: 409
 *                   message: "Ya existe una ciudad con el nombre: Rosario"
 */
router.post('/', createCity);

/**
 * @swagger
 * /cities/{id}:
 *   put:
 *     summary: Actualizar ciudad
 *     deprecated: false
 *     description: ""
 *     tags:
 *     - Cities
 *     parameters:
 *     - name: id
 *       in: path
 *       description: ""
 *       required: true
 *       example: "1"
 *       schema:
 *         type: integer
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: name
 *             required:
 *             - name
 *           example:
 *             name: Buenos Aires
 *     responses:
 *       "200":
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               "$ref": "#/components/schemas/ApiResponse"
 *             examples:
 *               "1":
 *                 summary: Success
 *                 value:
 *                   status: success
 *                   code: 200
 *                   message: Ciudad actualizada con éxito!
 *                   body:
 *                     id: 1
 *                     name: Buenos Aires
 *                     createdAt: "2024-02-26T17:16:01.354Z"
 *                     updatedAt: "2024-02-26T19:18:30.800Z"
 *       "404":
 *         description: Record Not Found
 *         content:
 *           application/json:
 *             schema:
 *               "$ref": "#/components/schemas/ApiResponse"
 *             examples:
 *               "1":
 *                 summary: "Exception: ID no encontrado"
 *                 value:
 *                   status: fail
 *                   code: 404
 *                   message: "No se encontró ciudad con el ID: 0"
 *       "409":
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               "$ref": "#/components/schemas/ApiResponse"
 *             examples:
 *               "1":
 *                 summary: "Exception: Nombre repetido"
 *                 value:
 *                   status: fail
 *                   code: 409
 *                   message: "Ya existe una ciudad con el nombre: Buenos Aires"
 */
router.put('/:id', updateCity);

/**
 * @swagger
 * /cities/{id}:
 *   delete:
 *     summary: Eliminar ciudad
 *     deprecated: false
 *     description: ""
 *     tags:
 *     - Cities
 *     parameters:
 *     - name: id
 *       in: path
 *       description: ""
 *       required: true
 *       example: "39"
 *       schema:
 *         type: integer
 *     responses:
 *       "200":
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               "$ref": "#/components/schemas/ApiResponse"
 *             examples:
 *               "1":
 *                 summary: Success
 *                 value:
 *                   status: success
 *                   code: 200
 *                   message: Ciudad eliminada con éxito!
 *       "404":
 *         description: Record Not Found
 *         content:
 *           application/json:
 *             schema:
 *               "$ref": "#/components/schemas/ApiResponse"
 *             examples:
 *               "1":
 *                 summary: "Exception: ID no encontrado"
 *                 value:
 *                   status: fail
 *                   code: 404
 *                   message: "No se encontró ciudad con el ID: 10000"
 */
router.delete('/:id', deleteCity);

module.exports = router;
