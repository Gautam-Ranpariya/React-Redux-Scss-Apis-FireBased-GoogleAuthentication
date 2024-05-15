const Joi = require('joi');

const validate = (schema) => {
    try {
        return (req, res, next) => {
            //  if (req.file) {
            //      req.body.profile = req.file.destination + '/' + req.file.filename     
            //  }
            console.log('frontend body:', req.body);
            
            const { error, value } = schema.validate(req.body)

            if (error) {
                return res.status(403).json({
                    msg : "validaton errror",
                    error: error
                })
            }
            req.body = value
            next()
        }
    } catch (error) {
        return res.status(500).json({
            msg : "validaton faild",
            error: error
        })
    }
}

module.exports = validate