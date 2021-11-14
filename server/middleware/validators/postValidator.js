import validator from 'express-validator'
const { check, validationResult } = validator

export const validatePost = [
  check('creator')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('Your name cannot be empty!')
    // .bail()
    // .isLength({min: 3})
    // .withMessage('Minimum 3 characters required!')
    .bail(),
  check('title')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('Your title cannot be empty!')
    // .bail()
    // .isLength({min: 3})
    // .withMessage('Minimum 3 characters required!')
    .bail(),
  (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty())
      return res.status(422).json({errors: errors.array()})
    next()
  },
]