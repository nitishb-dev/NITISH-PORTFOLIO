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
        // Clean, minimal HTML template
        html: `
          <div style="font-family: Arial, sans-serif; background-color: #111; color: #f5f5f5; padding: 20px;">
            <div style="max-width: 600px; margin: auto; background-color: #1a1a1a; border-radius: 8px; overflow: hidden; border: 1px solid #2a2a2a;">
              
              <!-- Header -->
              <div style="background-color: #000; padding: 16px; text-align: center;">
                <h2 style="color: #fff; margin: 0;">New Contact Form Submission</h2>
              </div>

              <!-- Body -->
              <div style="padding: 20px; color: #e0e0e0;">
                <p><strong style="color:#ccc;">Name:</strong> ${name}</p>
                <p><strong style="color:#ccc;">Email:</strong> ${email}</p>
                <p><strong style="color:#ccc;">Subject:</strong> ${subject}</p>
                <p><strong style="color:#ccc;">Message:</strong></p>
                <p style="background:#222; padding:12px; border-radius:6px; color:#f5f5f5;">${message}</p>
              </div>

              <!-- Footer -->
              <div style="background-color: #000; padding: 12px; text-align: center; font-size: 12px; color: #888;">
                <p>Portfolio Contact Form | <a href="https://nitishb.me" style="color:#bbb; text-decoration:none;">nitishb.me</a></p>
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
