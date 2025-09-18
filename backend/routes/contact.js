import express from "express";
import { createClient } from "@supabase/supabase-js";
import Joi from "joi";

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

router.get("/", async (req, res) => {
  try {
    const { data, error: supabaseError } = await supabase
      .from("contacts")
      .select("*")
      .order("created_at", { ascending: false });

    if (supabaseError) {
      return res.status(500).json({
        message: "Failed to retrieve contacts",
        details: supabaseError.message,
      });
    }

    res.json({
      contacts: data,
      total: data.length,
    });
  } catch (error) {
    console.error("Get contacts error:", error);
    res.status(500).json({
      message: "Failed to retrieve contacts",
    });
  }
});

export default router;
