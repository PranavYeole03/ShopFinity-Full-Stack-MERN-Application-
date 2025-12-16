import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.RESEND_API_KEY) {
  throw new Error("RESEND_API_KEY is missing in .env file");
}

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async ({ sendTo, subject, html }) => {
  if (!sendTo || !subject || !html) {
    throw new Error("sendTo, subject, and html are required");
  }

  try {
    const { data, error } = await resend.emails.send({
      from: "ShopFinity <onboarding@resend.dev>",
      to: sendTo,
      subject,
      html,
    });

    if (error) {
      throw error;
    }

    return data;
  } catch (err) {
    console.error("Email send failed:", err);
    throw err;
  }
};

export default sendEmail;
