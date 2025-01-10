// /api/contact
import nodemailer from "nodemailer";

async function handler(req, res) {
  if (req.method === "POST") {
    const transporter = nodemailer.createTransport({
      port: 465,
      host: "smtp.gmail.com",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
      secure: true,
    });

    const mailData = {
      from: process.env.EMAIL,
      to: process.env.EMAIL,
      subject: `New Message From Porfolio ${req.body.name}`,
      text: `
    Name: ${req.body.name}
    Email: ${req.body.email}
    Message: ${req.body.message}
  `,
      html: `
  <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
    <h3>New Message From: ${req.body.name}</h3>
    <p><strong>Email:</strong> ${req.body.email}</p>
    <p><strong>Message:</strong></p>
    <p>${req.body.message}</p>
  </div>
`,
    };
    transporter.sendMail(mailData, function (err) {
      if (err) {
        res.status(400).send(); // something went wrong
      } else {
        res.status(200).send(); // successfully sent
      }
    });
  }
}

export default handler;
