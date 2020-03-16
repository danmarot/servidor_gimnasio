const router = require('express').Router();
const Cliente = require('../../models/client');

const { check, validationResult } = require('express-validator')

// GET http://localhost:3000/api/clients

router.get('/', async (req, res) => {
    const rows = await Cliente.getAll();
    // console.log(rows);
    res.json(rows);
})

router.post('/', [
    check('nombre', 'El nombre debe contener al menos 3 caracteres').isLength({ min: 3 }),
    check('apellidos').isLength({ min: 3 }),
    check('email', 'El email debe tener un formato válido').isLength({ min: 3 }),
    check('fecha_nacimiento', 'la fecha de nacimiento debe tener un fotmato aaaa-mm-dd'),
    check('sexo', 'solo se puede introducir M, F u Other').isLength({ min: 1 }),
    check('dni', 'El DNI debe tener un formato válido').custom((value) => {
        return (/^[A-z]?\d{8}$/).test(value)
    }),

], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json(errors.array())
    }

    const result = await Cliente.postCliente(req.body);
    if (result['affectedRows'] === 1) {
        const row = await Cliente.getById(result['insertId']);
        res.json(row);
    } else {
        res.json({ error: "El cliente no se ha dado de alta correctamente" });
    };
});


router.delete('/:studentId', async (req, res) => {
    const result = await Cliente.deleteId(req.params.studentId);

    if (result['affectedRows'] === 1) {
        res.json({ mensaje: "El cliente ha sido dado de baja" })
    } else {
        res.json({ error: "No se ha podido dar de baja al cliente" });
    };
});


module.exports = router;