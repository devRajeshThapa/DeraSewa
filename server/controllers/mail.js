const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
        user: process.env.VERIFICATION_EMAIL,
        pass: process.env.VERIFICATION_EMAIL_APP_PASS
    },
});

let loginAlert = async (email) => {
    let OTP = await (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);

    async function main() {
        // send mail with defined transport object
        const info = await transporter.sendMail({
            from: {
                name: "DeraSewa",
                address: process.env.VERIFICATION_EMAIL
            },
            to: `${email}`, // list of receivers
            subject: "Security Alert", // Subject line
            html: `
            <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
  <div style="margin:50px auto;width:70%;padding:20px 0">
    <div style="border-bottom:1px solid #eee">
      <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">DeraSewa</a>
    </div>
    <p style="font-size:1.1em">Hi,</p>
    <p>We noticed a new login to your account from DeraSewa.If this was you, there's nothing to worry about. If you did not authorize this login, please change your account password ASAP.</p>
    <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${OTP}</h2>
    <p style="font-size:0.9em;">Regards,<br />DeraSewa</p>
    <hr style="border:none;border-top:1px solid #eee" />
    <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
      <p>DeraSewa</p>
      <p>Maitidevi, Kathmandu</p>
    </div>
  </div>
</div>
            `, // html body
        });

        console.log("Message sent: %s", info.messageId);
        // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
    }

    main().catch(console.error);
}

module.exports={
    loginAlert,
}