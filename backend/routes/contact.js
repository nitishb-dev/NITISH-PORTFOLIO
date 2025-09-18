import express from "express";
import { createClient } from "@supabase/supabase-js";
import Joi from "joi";
import nodemailer from "nodemailer";

const router = express.Router();

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error(
    "Supabase environment variables are missing. Please set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in your .env file."
  );
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

const contactSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  subject: Joi.string().min(5).max(200).required(),
  message: Joi.string().min(10).max(1000).required(),
});

router.post("/", async (req, res) => {
  try {
    const { error, value } = contactSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: "Validation error",
        details: error.details[0].message,
      });
    }

    const { name, email, subject, message } = value;

    const { data, error: supabaseError } = await supabase
      .from("contacts")
      .insert([{ name, email, subject, message }])
      .select();

    if (supabaseError) {
      return res.status(500).json({
        message: "Failed to submit contact form",
        details: supabaseError.message,
      });
    }

    // Send email notification
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.NOTIFY_EMAIL,
        pass: process.env.NOTIFY_EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"${name} via Portfolio Contact" <${process.env.NOTIFY_EMAIL}>`, // shows sender's name
      to: process.env.NOTIFY_EMAIL,
      replyTo: email, // allows you to reply directly to the sender
      subject: `New Contact Form Submission: ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage:\n${message}`,
      html: `
        <div style="background:#f4f6fa;padding:0;margin:0;">
          <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr>
              <td align="center" style="padding:32px 0;">
                <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:480px;background:#fff;border-radius:12px;box-shadow:0 2px 8px rgba(0,0,0,0.04);overflow:hidden;">
                  <tr>
                    <td style="padding:32px 32px 16px 32px;text-align:center;">
                      <h2 style="color:#2563eb;font-size:1.5rem;margin:0 0 12px 0;font-family:sans-serif;">New Contact Form Submission</h2>
                      <p style="color:#6b7280;font-size:1rem;margin:0 0 24px 0;font-family:sans-serif;">You have received a new message from your portfolio website.</p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:0 32px 24px 32px;">
                      <table width="100%" cellpadding="0" cellspacing="0" style="font-family:sans-serif;font-size:1rem;">
                        <tr>
                          <td style="color:#374151;font-weight:600;padding:8px 0;width:90px;">Name:</td>
                          <td style="color:#111827;padding:8px 0;">${name}</td>
                        </tr>
                        <tr>
                          <td style="color:#374151;font-weight:600;padding:8px 0;">Email:</td>
                          <td style="color:#2563eb;padding:8px 0;">
                            <a href="mailto:${email}" style="color:#2563eb;text-decoration:underline;">${email}</a>
                          </td>
                        </tr>
                        <tr>
                          <td style="color:#374151;font-weight:600;padding:8px 0;">Subject:</td>
                          <td style="color:#111827;padding:8px 0;">${subject}</td>
                        </tr>
                      </table>
                      <div style="margin:24px 0 0 0;">
                        <div style="color:#374151;font-weight:600;margin-bottom:8px;">Message:</div>
                        <div style="background:#f3f4f6;border-radius:8px;padding:16px;color:#111827;line-height:1.6;border:1px solid #e5e7eb;word-break:break-word;">
                          ${message.replace(/\n/g, "<br/>")}
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:0 32px 32px 32px;">
                      <div style="margin-top:32px;font-size:0.9rem;color:#6b7280;text-align:center;">
                        <em>This message was sent from your portfolio contact form.</em>
                      </div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </div>
      `,
    });

    res.status(201).json({
      message: "Contact form submitted successfully",
      contact: data[0],
    });
  } catch (error) {
    console.error("Contact form error:", error);
    res.status(500).json({
      message: "Failed to submit contact form",
    });
  }
});

export default router;
