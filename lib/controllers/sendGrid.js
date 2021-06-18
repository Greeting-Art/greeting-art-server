
const { Router } = require('express');

const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

module.exports = Router()

    .post('/', (req, res, next) => {
        sgMail
            .send(req.body)
            .then(() => {
                return res.send('sent')
            })
            .catch((error) => {
                console.error(error)
            })
return 'sent';
    })

