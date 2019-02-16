const nodemailer = require('nodemailer');
const auth = require('./auth');

module.exports = {

  sendEmail: (emailDetails) => {
    const { filePath, firstName, lastName, emailAddress } = emailDetails;
    const segments = filePath.split('output\\');
    const fileName = segments[1];

    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: auth.user,
        pass: auth.pass
      }
    });

    const mailOptions = {
      from: 'nuvopastiche@gmail.com',
      to: emailAddress,
      subject: 'Thank you for your business!',
      text: '',
      attachments: [
        {   // file on disk as an attachment
          filename: fileName,
          path: filePath // stream this file
        },
      ],
      html: `<hr>
            <h2>${firstName} ${lastName} your pastiche has arrived!</h2>
            <p>Please see the attached file.</p>
            <hr>
            <p>This art was generated by athena, an artificially intelligent system.</p>
            <p>-- Athena@nuvopastiche </p>
            `
    };

    return transporter.sendMail(mailOptions);
  }
};