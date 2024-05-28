const {body, validationResult} = require('express-validator')

const validateBody = [
    body('name').isString().withMessage('Inserisci una stringa valida, perfavore').notEmpty(),
    body('lastName').isString().withMessage('Inserisci una stringa valida, perfavore').notEmpty(),
    body('email').isEmail().withMessage('Inserisci una email valida, perfavore').notEmpty(),
    body('date').isString().withMessage('Inserisci una stringa valida, perfavore').notEmpty(),
    body('avatar').isURL().withMessage('Inserisci un URL valido, perfavore').notEmpty(),
    (req, res, next) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }
        next()
    }
]

module.exports = validateBody;