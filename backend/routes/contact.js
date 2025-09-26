import express from "express";
import { createClient } from "@supabase/supabase-js";
import Joi from "joi";
import nodemailer from "nodemailer";

const router = express.Router();

// Initialize Supabase
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

let supabase;
if (SUPABASE_URL && SUPABASE_KEY) {
  supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
  console.log("✅ Supabase client initialized.");
} else {
  console.error(
    "❌ Supabase environment variables missing. Database operations will fail."
  );
}

// Validation schema
const contactSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  subject: Joi.string().min(5).max(200).required(),
  message: Joi.string().min(10).max(1000).required(),
});

// Nodemailer setup
const transporter =
  process.env.NOTIFY_EMAIL && process.env.NOTIFY_EMAIL_PASS
    ? nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.NOTIFY_EMAIL,
          pass: process.env.NOTIFY_EMAIL_PASS, // App Password recommended
        },
      })
    : null;

// POST contact form
router.post("/", async (req, res) => {
  if (!supabase) {
    console.error("Supabase client not initialized. Cannot process request.");
    return res.status(500).json({ message: "Server configuration error." });
  }

  try {
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

    // Send emails in background (non-blocking)
    if (transporter) {
      // Notification to owner
      transporter.sendMail({
        from: `"${name} (via Portfolio)" <${process.env.NOTIFY_EMAIL}>`,
        to: process.env.NOTIFY_EMAIL,
        replyTo: email,
        subject: `New Contact Form Submission: ${subject}`,
        text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage:\n${message}`,
        html: `
      <div style="font-family: Arial, sans-serif; background-color: #e6f0ff; color: #0d1a33; padding: 20px;">
        <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; border: 1px solid #99c2ff;">
          <div style="background-color: #0066cc; padding: 16px; text-align: center;">
            <h2 style="color: #ffffff; margin: 0;">New Contact Form Submission</h2>
          </div>
          <div style="padding: 20px; color: #0d1a33;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong></p>
            <p style="background:#cce0ff; padding:12px; border-radius:6px; border-left: 4px solid #0066cc;">${message}</p>
          </div>
          <div style="background-color: #f2f9ff; padding: 12px; text-align: center; font-size: 12px; color: #0d1a33;">
            <p>Portfolio Contact Form | <a href="https://nitishb.me" style="color:#0066cc; text-decoration:none;">nitishb.me</a></p>
          </div>
        </div>
      </div>
      `,
      }).catch(err => console.error("Email to owner failed:", err));

      // Thank-you email to visitor
      transporter.sendMail({
        from: `"Nitish B - Portfolio Contact" <${process.env.NOTIFY_EMAIL}>`,
        to: email,
        subject: "Thanks for contacting me",
        text: `Hi ${name},\n\nThank you for reaching out! I have received your message and will get back to you as soon as possible.\n\nBest regards,\nNitish B`,
        html: `
      <div style="font-family: Arial, sans-serif; background-color: #e6f0ff; color: #0d1a33; padding: 20px;">
        <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; border: 1px solid #99c2ff;">
          <div style="background-color: #0066cc; padding: 16px; text-align: center;">
            <h2 style="color: #ffffff; margin: 0;">Hi ${name},</h2>
          </div>
          <div style="padding: 20px; color: #0d1a33;">
            <p>Thank you for reaching out! I have received your message and will get back to you as soon as possible.</p>
            <p>Best regards,<br>Nitish B</p>
          </div>
        </div>
      </div>
      `,
      }).catch(err => console.error("Thank-you email failed:", err));
    }
  } catch (err) {
    console.error("Unhandled contact form error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
