import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Create email transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT),
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Verify transporter configuration
transporter.verify((error, success) => {
  if (error) {
    console.error('Email transporter error:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});

// Contact form endpoint
app.post('/api/send-email', async (req, res) => {
  try {
    const { name, company, email, topic, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required' });
    }

    // Email to you (notification)
    const adminEmailOptions = {
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO,
      subject: `New Contact Form Submission${topic ? `: ${topic}` : ''}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0f172a;">New Contact Form Submission</h2>
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            ${topic ? `<p><strong>Topic:</strong> ${topic}</p>` : ''}
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
          <p style="color: #64748b; font-size: 14px;">This message was sent from the VISIBI contact form.</p>
        </div>
      `,
    };

    // Confirmation email to user
    const userEmailOptions = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: 'Thank you for contacting VISIBI',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0f172a;">Thank You for Reaching Out!</h2>
          <p>Hi ${name},</p>
          <p>We've received your message and appreciate you taking the time to contact us. Our team will review your inquiry and get back to you within 24 hours.</p>
          
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #0f172a; margin-top: 0;">Your Message:</h3>
            ${topic ? `<p><strong>Topic:</strong> ${topic}</p>` : ''}
            <p style="white-space: pre-wrap;">${message}</p>
          </div>

          <p>In the meantime, feel free to explore our services:</p>
          <ul>
            <li><a href="https://govisibi.ai/geo" style="color: #0f172a;">GEO - Generative Engine Optimization</a></li>
            <li><a href="https://govisibi.ai/seo" style="color: #0f172a;">SEO Services</a></li>
            <li><a href="https://govisibi.ai/ppc" style="color: #0f172a;">PPC Management</a></li>
            <li><a href="https://govisibi.ai/ai-agents" style="color: #0f172a;">AI Agents</a></li>
          </ul>

          <p>Best regards,<br/>
          <strong>The VISIBI Team</strong><br/>
          <a href="https://govisibi.ai" style="color: #0f172a;">govisibi.ai</a></p>

          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 30px 0;" />
          <p style="color: #64748b; font-size: 12px;">
            This is an automated confirmation email. Please do not reply directly to this message.
          </p>
        </div>
      `,
    };

    // Send both emails
    await transporter.sendMail(adminEmailOptions);
    await transporter.sendMail(userEmailOptions);

    res.status(200).json({ message: 'Emails sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email', details: error.message });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Backend server is running' });
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
