//

const nodemailer = require("nodemailer");
const pug = require("pug");
const htmlToText = require("html-to-text");
class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(" ")[0];
    this.url = url;
    this.from = `Tecno Team  <${process.env.Email_username}>`;
  }
  newTransport() {
    return nodemailer.createTransport({
      host: process.env.Email_Host,
      port: 587,
      service: "hotmail",

      auth: {
        user: process.env.Email_username,
        pass: process.env.Email_password,
      },
    });
  }
  //send the actuel email
  async send(template, subject) {
    //Render the html for a bug tempalte
    const html = pug.renderFile(
      `${__dirname}/../views/emails/${template}.pug`,
      { firstName: this.firstName, url: this.url, subject }
    );
    //define the email opetions
    const mailOptinos = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText.convert(html),
    };
    //create a transport &&&send email
    this.newTransport();
    await this.newTransport().sendMail(mailOptinos);
  }
  async sendWelcome() {
    await this.send("welcome", "welcome to the Tecno");
  }
  async sendPassWordReset() {
    await this.send(
      "passwordReset",
      "Your password reset token valid for minutes"
    );
  }
}

module.exports = { Email };
