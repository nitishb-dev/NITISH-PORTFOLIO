import express from "express";
import { createClient } from "@supabase/supabase-js";
import Joi from "joi";
import { Resend } from "resend";

const router = express.Router();

// ====================
// Supabase Setup
// ====================
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

let supabase;
if (SUPABASE_URL && SUPABASE_KEY) {
  supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
  console.log("✅ Supabase client initialized.");
} else {
  console.error("❌ Supabase environment variables missing.");
}

// ====================
// Validation Schema
// ====================
const contactSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  subject: Joi.string().min(5).max(200).required(),
  message: Joi.string().min(10).max(1000).required(),
});

// ====================
// Resend Setup
// ====================
const resend =
  process.env.RESEND_API_KEY && new Resend(process.env.RESEND_API_KEY);

// ====================
// POST Contact Form
// ====================
router.post("/", async (req, res) => {
  if (!supabase) {
    return res.status(500).json({ message: "Server configuration error." });
  }

  try {
    // Validate input
    const { error, value } = contactSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: "Validation error",
        details: error.details[0].message,
      });
    }

    const { name, email, subject, message } = value;

    // Save to Supabase
    const { data, error: supabaseError } = await supabase
      .from("contacts")
      .insert([{ name, email, subject, message }])
      .select();

    if (supabaseError) {
      console.error("Supabase insert error:", supabaseError);
      return res.status(500).json({
        message: "Failed to submit contact form",
        details: supabaseError.message,
      });
    }

    // Respond immediately
    res.status(201).json({
      message: "Contact form submitted successfully",
      contact: data[0],
    });

    // ====================
    // Background Emails
    // ====================
    if (resend) {
      (async () => {
        try {
          // 1️⃣ Notification email to portfolio owner
          await resend.emails.send({
            from: `"${name} (via Portfolio)" <${process.env.NOTIFY_EMAIL}>`,
            to: process.env.NOTIFY_EMAIL,
            replyTo: email,
            subject: `New Contact Form Submission: ${subject}`,
            text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage:\n${message}`,
            html: `
              <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; color: #333; padding: 20px;">
                <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; border: 1px solid #ddd;">
                  <div style="background-color: #007bff; padding: 20px; text-align: center;">
                    <h2 style="color: #ffffff; margin: 0;">New Contact Form Submission</h2>
                  </div>
                  <div style="padding: 20px;">
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> <a href="mailto:${email}" style="color: #007bff;">${email}</a></p>
                    <p><strong>Subject:</strong> ${subject}</p>
                    <p><strong>Message:</strong></p>
                    <p style="background-color: #f9f9f9; border: 1px solid #eee; padding: 15px; border-radius: 6px; white-space: pre-wrap; word-wrap: break-word;">${message}</p>
                  </div>
                  <div style="background-color: #f4f4f4; padding: 15px; text-align: center; font-size: 12px; color: #666;">
                    <p>From your portfolio at <a href="https://nitishb.me" style="color: #007bff; text-decoration: none;">nitishb.me</a></p>
                  </div>
                </div>
              </div>
            `,
          });

          // 2️⃣ Thank-you email to visitor
          await resend.emails.send({
            from: `"Nitish B"  <${process.env.NOTIFY_EMAIL}>`,
            to: email,
            subject: "Thank you for your message!",
            text: `Hi ${name},\n\nThanks for reaching out! I've received your message and will get back to you as soon as possible.\n\nBest regards,\nNitish B`,
            html: `
              <div style="font-family: Arial, sans-serif; background-color: #ffffff; color: #333; padding: 20px; border-radius: 8px;">
                <p>Hi ${name},</p>
                <p>Thank you for reaching out! I have received your message and will get back to you as soon as possible.</p>
                <p>Best regards,<br/>Nitish B</p>
              </div>
            `,
          });

          console.log(`✅ Successfully sent emails for submission from ${email}`);
        } catch (emailError) {
          console.error("❌ Background email sending failed:", emailError);
        }
      })();
    }
  } catch (err) {
    console.error("Unhandled contact form error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
