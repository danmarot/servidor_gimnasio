const router = require('express').Router();


const apiClientsRouter = require('./api/clients');
const apiEjerciciosRouter = require('./api/ejercicios');
const apiProfesoresRouter = require('./api/profesores')


router.use('/clients', apiClientsRouter);
router.use('/ejercicios', apiEjerciciosRouter);
router.use('/profesores', apiProfesoresRouter);





module.exports = router;