# Full Stack Portfolio

My personal portfolio website showcasing my projects and skills as a Software Engineer. Built with React, Node.js, and MySQL, featuring a clean, modern design with a contact form that stores submissions in a database.

🌐 **Live Demo:** [Your Portfolio URL]

## 🚀 Tech Stack

### Frontend
- **React 19** - Modern UI library
- **Tailwind CSS 4** - Utility-first CSS framework
- **Vite** - Fast build tool and dev server
- **Lucide React** - Beautiful icons
- **Axios** - HTTP client for API calls

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web application framework
- **MySQL** - Relational database
- **Joi** - Data validation
- **Helmet** - Security middleware
- **CORS** - Cross-origin resource sharing

## 📁 Project Structure

```
portfolio-fullstack/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── App.jsx         # Main app component
│   │   ├── main.jsx        # Entry point
│   │   └── index.css       # Global styles
│   ├── index.html          # HTML template
│   ├── vite.config.js      # Vite configuration
│   └── package.json        # Frontend dependencies
├── backend/                 # Node.js backend API
│   ├── config/
│   │   └── database.js     # Database connection
│   ├── routes/
│   │   └── contact.js      # Contact form routes
│   ├── scripts/
│   │   └── migrate-minimal.js # Database migration
│   ├── server.js           # Express server
│   ├── .env                # Environment variables (not tracked)
│   └── package.json        # Backend dependencies
├── package.json            # Root package.json for scripts
└── README.md              # Project documentation
```

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- MySQL (v8 or higher)
- npm or yarn

### 1. Clone and Install Dependencies

```bash
# Clone the repository
git clone <your-repo-url>
cd portfolio-fullstack

# Install all dependencies
npm run install:all
```

### 2. Database Setup

```bash
# Create MySQL database and user
mysql -u root -p

CREATE DATABASE portfolio_db;
CREATE USER 'portfolio_user'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON portfolio_db.* TO 'portfolio_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

### 3. Environment Configuration

```bash
# Create backend/.env file with your database credentials
# backend/.env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=root
DB_NAME=portfolio_db
PORT=5000
NODE_ENV=development
```

### 4. Run Database Migration

```bash
# Create database tables
cd backend && node scripts/migrate-minimal.js
```

### 5. Start Development Servers

```bash
# Start both frontend and backend
npm run dev

# Or start individually:
npm run dev:frontend  # Frontend on http://localhost:5173
npm run dev:backend   # Backend on http://localhost:5000
```

## 🎨 Customization

### Personal Information
Update the following files with your information:

1. **Frontend Components**: Edit personal details in:
   - `frontend/src/components/Hero.jsx`
   - `frontend/src/components/About.jsx`
   - `frontend/src/components/Contact.jsx`
   - `frontend/src/components/Footer.jsx`

2. **Projects**: Add your projects in `frontend/src/components/Projects.jsx`

3. **Skills**: Update your skills in `frontend/src/components/Skills.jsx`

### Styling
- Colors and themes can be customized in `frontend/src/index.css`
- Component-specific styles are in individual component files
- Tailwind classes can be modified throughout components

## 📧 Contact Form

The contact form includes:
- Client-side validation
- Server-side validation with Joi
- MySQL database storage
- Success/error feedback
- Rate limiting for security

### Database Schema

```sql
CREATE TABLE contacts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  subject VARCHAR(200) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🚀 Deployment

### Frontend
```bash
cd frontend
npm run build
# Deploy the 'dist' folder to your hosting platform
```

### Backend
1. Set environment variables in your hosting platform
2. Update CORS origin to your frontend domain
3. Deploy the backend folder

### Database
- Set up MySQL database on your hosting platform
- Update connection credentials in production environment

## 📱 Features

- **Responsive Design** - Works on all devices
- **Smooth Scrolling** - Navigation with smooth scroll
- **Contact Form** - Database-backed contact submissions
- **Modern UI** - Clean, professional design
- **Performance Optimized** - Fast loading and smooth animations
- **SEO Friendly** - Proper meta tags and structure



---

**Happy coding!** 🎉