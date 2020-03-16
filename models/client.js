
const getAll = () => {
    return new Promise((resolve, rejects) => {
        db.query('select * from clientes', (err, rows) => {
            if (err) reject(err)
            resolve(rows);
        });
    })
};

const postCliente = ({ nombre, apellidos, direccion, email, edad, sexo, cuota, fecha_nacimiento, dni}) => {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO `clientes`(`nombre`, `apellidos`,`direccion`, `email`, `edad`,`sexo`, `fecha_inscripcion`,`cuota`, `fecha_nacimiento`, `dni`) VALUES (?,?,?,?,?,?,?,?,?,?)', [nombre, apellidos, direccion, email, edad, sexo, new Date(), cuota, fecha_nacimiento, dni],
            (err, result) => {
                if (err) reject(err);
                resolve(result)
            });
    });
};

const deleteId = (clienteId) => {
    return new Promise((resolve, reject) => {
        db.query('DELETE FROM `clientes` WHERE clientes.id = ?', [clienteId], (err, result) => {
            if (err) reject(err);
            resolve(result)
        });
    });
};

const getById = (clienteId) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT clientes.* FROM clientes WHERE clientes.id = ?', [clienteId], (err, result) => {
            if (err) reject(err);
            resolve(result)
        });
    });
};


const updateById = (pBody, pClienteId) => {
    return new Promise((resolve, reject) => {
        db.query('update clientes set ? where id = ' + pClienteId, [pBody], (err, result) => {
            if (err) reject(err);
            resolve(result);
        })
    })
}



module.exports = {
    getAll: getAll,
    postCliente: postCliente,
    deleteId: deleteId,
    updateById: updateById,
    getById: getById
}