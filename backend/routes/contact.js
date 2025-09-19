import express from "express";
import { createClient } from "@supabase/supabase-js";
import Joi from "joi";
import nodemailer from "nodemailer";

const router = express.Router();

// Initialize Supabase
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error("❌ Supabase env vars missing.");
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
console.log("✅ Supabase client initialized.");

// Health/test route
router.get("/", (req, res) => {
  res.json({ message: "Contact API is working" });
});

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
          pass: process.env.NOTIFY_EMAIL_PASS,
        },
      })
    : null;

// POST contact form
router.post("/", async (req, res) => {
  try {
    const { error, value } = contactSchema.validate(req.body);
    if (error) {
      return res
        .status(400)
        .json({ message: "Validation error", details: error.details[0].message });
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

    // Email notification
    if (transporter) {
      await transporter.sendMail({
        from: `"${name} via Portfolio Contact" <${process.env.NOTIFY_EMAIL}>`,
        to: process.env.NOTIFY_EMAIL,
        replyTo: email,
        subject: `New Contact Form Submission: ${subject}`,
        // Plain text fallback
        text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage:\n${message}`,
        // Styled HTML version
        html: `
          <div style="font-family: Arial, sans-serif; background-color: #121212; color: #e0e0e0; padding: 20px;">
            <div style="max-width: 600px; margin: auto; background-color: #1e1e1e; border-radius: 8px; overflow: hidden; border: 1px solid #333;">
              
              <!-- Header -->
              <div style="background-color: #333; padding: 15px; text-align: center;">
                <h2 style="color: #fff; margin: 0;">📬 New Contact Form Submission</h2>
              </div>

              <!-- Body -->
              <div style="padding: 20px;">
                <p><strong style="color:#bbb;">Name:</strong> ${name}</p>
                <p><strong style="color:#bbb;">Email:</strong> ${email}</p>
                <p><strong style="color:#bbb;">Subject:</strong> ${subject}</p>
                <p><strong style="color:#bbb;">Message:</strong></p>
                <p style="background:#2a2a2a; padding:10px; border-radius:5px; color:#e0e0e0;">${message}</p>
              </div>

              <!-- Footer -->
              <div style="background-color: #333; padding: 10px; text-align: center; font-size: 12px; color: #aaa;">
                <p>⚡ Portfolio Contact Form | <a href="https://nitishb.me" style="color:#aaa; text-decoration:none;">nitishb.me</a></p>
              </div>
            </div>
          </div>
        `,
      });
    }

    res
      .status(201)
      .json({ message: "Contact form submitted successfully", contact: data[0] });
  } catch (err) {
    console.error("Unhandled contact form error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;