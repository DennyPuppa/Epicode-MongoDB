const {body, validationResult} = require('express-validator')

const validateBody = [
    body('category').isString().withMessage('Inserisci una stringa valida, perfavore').notEmpty(),
    body('title').isString().withMessage('Inserisci una stringa valida, perfavore').notEmpty(),
    body('cover').isURL().withMessage('Inserisci una URL valido, perfavore').notEmpty(),
    body('author').isString().withMessage('Inserisci una stringa valida, perfavore').notEmpty(),
    body('content').isString().withMessage('Inserisci un URL valido, perfavore').notEmpty(),
    (req, res, next) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }
        next()
    }
]

module.exports = validateBody;