import nodemailer from "nodemailer";

export const emailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const sendEmail = async (
  to: string,
  subject: string,
  htmlContent: string
) => {
  try {
    const mailDetails = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      html: htmlContent,
    };

    await emailTransporter.sendMail(mailDetails);
    return { success: true, message: "Email sent successfully" };
  } catch (error) {
    console.error("Email sending error:", error);
    return { success: false, message: "Failed to send email" };
  }
};
