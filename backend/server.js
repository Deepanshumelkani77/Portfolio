require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sgMail = require('@sendgrid/mail');

const app = express();
const PORT = process.env.PORT || 5000;

// CORS Configuration
const allowedOrigins = [
  'http://localhost:5173',
  'https://deepanshu-melkani-portfolio.vercel.app',
  'https://deepanshu-melkani-portfolio-lxd0nn0rx.vercel.app'
];

// CORS Middleware
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', true);
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  next();
});
app.use(express.json());

// Verify required environment variables
const requiredEnvVars = ['SENDGRID_API_KEY', 'TO_EMAIL', 'FROM_EMAIL'];
const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0) {
  console.error('ERROR: Missing required environment variables:', missingVars.join(', '));
  process.exit(1);
}

// Set SendGrid API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Log environment status
console.log('Environment:');
console.log('- NODE_ENV:', process.env.NODE_ENV || 'development');
console.log('- Server running on port:', PORT);
console.log('- Sending emails to:', process.env.TO_EMAIL);
console.log('- Sending emails from:', process.env.FROM_EMAIL);

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  console.log('\n--- New Contact Form Submission ---');
  console.log('Request Body:', JSON.stringify(req.body, null, 2));
  
  const { name, email, phone, service, message } = req.body;

  // Basic validation
  if (!name || !email || !message) {
    const errorMsg = 'Validation failed: Name, email, and message are required';
    console.error(errorMsg);
    return res.status(400).json({ 
      success: false,
      error: errorMsg,
      details: { 
        name: !name ? 'Name is required' : undefined,
        email: !email ? 'Email is required' : undefined,
        message: !message ? 'Message is required' : undefined
      }
    });
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    const errorMsg = 'Invalid email format';
    console.error(errorMsg);
    return res.status(400).json({ 
      success: false,
      error: errorMsg,
      details: { email: 'Please enter a valid email address' }
    });
  }

  const msg = {
    to: process.env.TO_EMAIL,
    from: process.env.FROM_EMAIL,
    subject: `New Contact: ${name} - ${service || 'General Inquiry'}`,
    text: `
      Name: ${name}
      Email: ${email}
      Phone: ${phone || 'Not provided'}
      Service: ${service || 'Not specified'}
      
      Message:
      ${message}
    `,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1cd8d2;">New Contact Form Submission</h2>
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          ${phone ? `<p><strong>Phone:</strong> <a href="tel:${phone}">${phone}</a></p>` : ''}
          ${service ? `<p><strong>Service:</strong> ${service}</p>` : ''}
          <h3 style="margin-top: 20px; color: #1cd8d2;">Message:</h3>
          <p style="white-space: pre-line; background: white; padding: 15px; border-radius: 4px;">
            ${message.replace(/\n/g, '<br>')}
          </p>
        </div>
        <p style="color: #666; font-size: 12px; margin-top: 30px;">
          This message was sent from your portfolio contact form.
        </p>
      </div>
    `,
  };

  try {
    console.log('Sending email...');
    const response = await sgMail.send(msg);
    console.log('Email sent successfully!', response[0].statusCode);
    
    res.status(200).json({ 
      success: true, 
      message: 'Message sent successfully!',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error sending email:', error);
    
    let errorMessage = 'Failed to send message. Please try again later.';
    let errorDetails = {};
    
    if (error.response) {
      console.error('SendGrid Error Response:', error.response.body);
      errorMessage = 'Failed to send email. Please check the email configuration.';
      errorDetails = {
        statusCode: error.code,
        response: error.response.body
      };
    }
    
    res.status(500).json({
      success: false,
      error: errorMessage,
      details: errorDetails
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    sendgrid: {
      status: process.env.SENDGRID_API_KEY ? 'configured' : 'not configured',
      fromEmail: process.env.FROM_EMAIL || 'not set'
    }
  });
});

// Basic route for testing
app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Portfolio Backend</title>
        <style>
          body { 
            font-family: Arial, sans-serif; 
            max-width: 800px; 
            margin: 0 auto; 
            padding: 20px; 
            line-height: 1.6;
          }
          .status { 
            padding: 10px; 
            border-radius: 4px; 
            margin: 10px 0; 
            font-weight: bold;
          }
          .success { background-color: #d4edda; color: #155724; }
          .error { background-color: #f8d7da; color: #721c24; }
          code { 
            background: #f5f5f5; 
            padding: 2px 5px; 
            border-radius: 3px; 
            font-family: monospace;
          }
        </style>
      </head>
      <body>
        <h1>Portfolio Backend is Running! 🚀</h1>
        <div class="status ${process.env.SENDGRID_API_KEY ? 'success' : 'error'}">
          SendGrid: ${process.env.SENDGRID_API_KEY ? 'Configured' : 'Not Configured'}
        </div>
        <h2>Available Endpoints:</h2>
        <ul>
          <li><code>POST /api/contact</code> - Submit contact form</li>
          <li><code>GET /health</code> - Health check</li>
        </ul>
        <h2>Environment:</h2>
        <ul>
          <li>NODE_ENV: ${process.env.NODE_ENV || 'development'}</li>
          <li>Server Time: ${new Date().toISOString()}</li>
        </ul>
      </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
