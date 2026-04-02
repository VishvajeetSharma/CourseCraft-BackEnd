import { users } from "../entities/user";
import bcrypt from "bcrypt";
import { sendEmail } from "../helpers/emailConfig";
import { generateSecurePassword } from "../helpers/passwordGenerator";

export const forgetPasswordService = async (email: string) => {
  try {
    const user = await users.findOne({ where: { email } });
    if (!user) {
      return {
        success: false,
        status: 404,
        message: "User not found",
      };
    }

    const newPassword = generateSecurePassword();
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const htmlContent = `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; }
            .container { padding: 20px; background-color: #f5f7fa; border-radius: 8px; }
            .header { color: #333; margin-bottom: 20px; }
            .content { background-color: white; padding: 15px; border-radius: 5px; }
            .password-box { background-color: #e8f4f8; padding: 10px; border-left: 4px solid #007bff; margin: 15px 0; }
            .footer { color: #666; font-size: 12px; margin-top: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1 class="header">Password Reset Request</h1>
            <div class="content">
              <p>Hello ${user.name || "User"},</p>
              <p>Your password has been reset. Here is your new temporary password:</p>
              <div class="password-box">
                <strong>New Password:</strong> ${newPassword}
              </div>
              <p>Please log in with this password and change it immediately for security reasons.</p>
              <p><strong>Important:</strong> Do not share this password with anyone.</p>
              <p>If you did not request this password reset, please contact our support team immediately.</p>
            </div>
            <div class="footer">
              <p>&copy; 2026 Your Company. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    const emailResult = await sendEmail(
      email,
      "Password Reset - Your New Temporary Password",
      htmlContent
    );

    if (!emailResult.success) {
      return {
        success: false,
        status: 500,
        message: "Failed to send reset email",
      };
    }

    user.password = hashedPassword;
    await user.save();

    return {
      success: true,
      status: 200,
      message:
        "Password reset successfully. Please check your email for the new temporary password.",
    };
  } catch (error) {
    console.error("Forget password error:", error);
    return {
      success: false,
      status: 500,
      message: "Internal Server Error",
    };
  }
};
