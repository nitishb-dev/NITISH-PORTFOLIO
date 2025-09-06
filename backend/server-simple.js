import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

const app = express();
const PORT = process.env.PORT || 5000;

// In-memory storage for demo (replace with database in production)
let contacts = [];

// Security middleware
app.use(helmet());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Contact form endpoint
app.post('/api/contact', (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    
    // Basic validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        message: 'All fields are required'
      });
    }

    // Store contact (in memory for demo)
    const contact = {
      id: contacts.length + 1,
      name,
      email,
      subject,
      message,
      created_at: new Date().toISOString()
    };
    
    contacts.push(contact);
    console.log('New contact received:', contact);

    res.status(201).json({
      message: 'Contact form submitted successfully',
      id: contact.id
    });

  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({
      message: 'Failed to submit contact form'
    });
  }
});

// Get contacts endpoint (for testing)
app.get('/api/contact', (req, res) => {
  res.json({
    contacts: contacts,
    total: contacts.length
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    contacts_count: contacts.length
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Something went wrong!',
    error: err.message
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📧 Contact form ready at http://localhost:${PORT}/api/contact`);
});