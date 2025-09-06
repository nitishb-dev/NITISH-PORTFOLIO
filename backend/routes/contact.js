import express from 'express';
import Joi from 'joi';
import { getConnection } from '../config/database.js';

const router = express.Router();

// Validation schema
const contactSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  subject: Joi.string().min(5).max(200).required(),
  message: Joi.string().min(10).max(1000).required()
});

// POST /api/contact - Submit contact form
router.post('/', async (req, res) => {
  try {
    // Validate input
    const { error, value } = contactSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: 'Validation error',
        details: error.details[0].message
      });
    }

    const { name, email, subject, message } = value;
    const connection = getConnection();

    // Insert contact form data
    const [result] = await connection.execute(
      'INSERT INTO contacts (name, email, subject, message, created_at) VALUES (?, ?, ?, ?, NOW())',
      [name, email, subject, message]
    );

    res.status(201).json({
      message: 'Contact form submitted successfully',
      id: result.insertId
    });

  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({
      message: 'Failed to submit contact form'
    });
  }
});

// GET /api/contact - Get all contacts (admin only)
router.get('/', async (req, res) => {
  try {
    const connection = getConnection();
    const [rows] = await connection.execute(
      'SELECT id, name, email, subject, message, created_at FROM contacts ORDER BY created_at DESC'
    );

    res.json({
      contacts: rows,
      total: rows.length
    });

  } catch (error) {
    console.error('Get contacts error:', error);
    res.status(500).json({
      message: 'Failed to retrieve contacts'
    });
  }
});

export default router;