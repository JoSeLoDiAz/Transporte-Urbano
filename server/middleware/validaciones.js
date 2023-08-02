import { validationResult } from 'express-validator';

// Función de middleware para validar los resultados de las validaciones
const validarResultados = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json(errors);
    }
    next();
};

export { validarResultados };
