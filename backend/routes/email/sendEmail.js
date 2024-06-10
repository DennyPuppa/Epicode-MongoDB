const express = require('express')
const { createTransport } = require('nodemailer')

const email = express.Router()

const transporter = createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'einar.koelpin@ethereal.email',
        pass: 'tx7BjxJg1M3gEz1utY'
    }
})

email.post('/sendemail', async (req, res) => {
    const { recipient, subject, text } = req.body

    const mailOptions = {
        from: 'no-reply@denny.org',
        to: 'gianni@apple.it',
        subject,
        text
    }

    await transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(400).send('error during email send')
        } else {
            res.status(200).send('Email sent')
        }
    })
})


module.exports = email