const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.mailUser,
        pass: process.env.mailPass
    }
});


const sendEmail = async (email, subject, mail) => {
    await transporter.sendMail({
        from: "andrii.hrytsai.tr.2018@lpnu.ua",
        to: `${email}`,
        subject: subject,
        html: mail,
    });
}

module.exports = sendEmail;
