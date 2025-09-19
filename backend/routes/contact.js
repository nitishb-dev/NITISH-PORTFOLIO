import express from "express";
import { createClient } from "@supabase/supabase-js";
import Joi from "joi";
import nodemailer from "nodemailer";

const router = express.Router();

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

let supabase;
if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error("❌ Supabase env vars missing.");
} else {
  supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
  console.log("✅ Supabase client initialized.");
}

// Health/test route for /api/contact
router.get("/", (req, res) => {
  res.json({ message: "Contact API is working" });
});

// Schema validation
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

// POST handler for contact form
router.post("/", async (req, res) => {
  try {
    if (!supabase) {
      return res.status(500).json({
        message: "Backend service not configured correctly.",
      });
    }

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
      console.error("Supabase insert error:", supabaseError);
      return res.status(500).json({
        message: "Failed to submit contact form",
        details: supabaseError.message,
      });
    }

    // Optional: send email
    if (transporter) {
      transporter.sendMail({
        from: `"${name} via Portfolio Contact" <${process.env.NOTIFY_EMAIL}>`,
        to: process.env.NOTIFY_EMAIL,
        replyTo: email,
        subject: `New Contact Form Submission: ${subject}`,
        text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage:\n${message}`,
      });
    }

    res.status(201).json({
      message: "Contact form submitted successfully",
      contact: data[0],
    });
  } catch (err) {
    console.error("Unhandled contact form error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;