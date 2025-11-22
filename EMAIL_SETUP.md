# Email Setup Guide

## Overview
The contact form is configured to send emails using your govisibi.ai email hosting via SMTP.

## Configuration

### Email Server Details
- **SMTP Server:** reymail.ukdns.biz
- **Port:** 465 (SSL/TLS)
- **Email:** info@govisibi.ai
- **Incoming Protocols:** POP3 (995), IMAP (993)

### Backend Setup

**Location:** `backend/`

**Environment Variables** (`.env`):
```env
EMAIL_HOST=reymail.ukdns.biz
EMAIL_PORT=465
EMAIL_USER=info@govisibi.ai
EMAIL_PASS=7Fy3f81u^
EMAIL_FROM=info@govisibi.ai
EMAIL_TO=info@govisibi.ai
PORT=3001
```

**⚠️ Security Note:** The `.env` file is gitignored and should never be committed to version control.

### Dependencies
```json
{
  "express": "^4.18.2",
  "nodemailer": "^6.9.7",
  "cors": "^2.8.5",
  "dotenv": "^16.3.1"
}
```

## How It Works

### 1. User Submits Contact Form
- Frontend: `frontend/src/pages/ContactPage.jsx`
- Form fields: name, company (optional), email, topic (optional), message
- Submits to: `http://localhost:3001/api/send-email` (dev) or `VITE_API_URL/api/send-email` (production)

### 2. Backend Processes Request
- Endpoint: `POST /api/send-email`
- Validates required fields (name, email, message)
- Sends two emails:

#### Email 1: Notification to You
**To:** info@govisibi.ai  
**Subject:** New Contact Form Submission: [Topic]  
**Contains:**
- Sender's name
- Company (if provided)
- Email address
- Topic (if provided)
- Message content

#### Email 2: Confirmation to User
**To:** User's email address  
**Subject:** Thank you for contacting VISIBI  
**Contains:**
- Personalized greeting
- Confirmation of message receipt
- Copy of their submitted message
- Links to your services
- 24-hour response time promise

## Running the Servers

### Start Backend (Port 3001)
```bash
cd backend
npm install
node server.js
```

### Start Frontend (Port 5173)
```bash
cd frontend
npm install
npm run dev
```

## Testing

1. Open http://localhost:5173/contact
2. Fill out the contact form
3. Submit
4. Check:
   - ✅ Success message appears on website
   - ✅ Notification email arrives at info@govisibi.ai
   - ✅ User receives confirmation email

## API Endpoints

### POST `/api/send-email`
Sends contact form emails.

**Request Body:**
```json
{
  "name": "John Doe",
  "company": "Acme Corp",
  "email": "john@example.com",
  "topic": "GEO Services",
  "message": "I'm interested in your services..."
}
```

**Response (Success):**
```json
{
  "message": "Emails sent successfully"
}
```

**Response (Error):**
```json
{
  "error": "Failed to send email",
  "details": "error message"
}
```

### GET `/api/health`
Health check endpoint.

**Response:**
```json
{
  "status": "OK",
  "message": "Backend server is running"
}
```

## Production Deployment

### Environment Variables
Set these in your hosting platform (Vercel, Railway, etc.):
```env
EMAIL_HOST=reymail.ukdns.biz
EMAIL_PORT=465
EMAIL_USER=info@govisibi.ai
EMAIL_PASS=7Fy3f81u^
EMAIL_FROM=info@govisibi.ai
EMAIL_TO=info@govisibi.ai
PORT=3001
```

### Frontend Configuration
Update `frontend/.env`:
```env
VITE_API_URL=https://your-backend-domain.com
```

## Troubleshooting

### Email Not Sending
1. Check backend server is running: `http://localhost:3001/api/health`
2. Verify SMTP credentials in `.env`
3. Check backend console for error messages
4. Ensure firewall allows port 465 (SMTP SSL)

### CORS Errors
- Backend has CORS enabled for all origins in development
- For production, restrict CORS to your domain in `server.js`

### Connection Refused
- Ensure both frontend (5173) and backend (3001) are running
- Check `VITE_API_URL` points to correct backend URL
- Verify no other services are using port 3001

## File Structure
```
visibiApp/
├── backend/
│   ├── server.js           # Main server file
│   ├── package.json        # Dependencies
│   ├── .env                # Email credentials (gitignored)
│   └── .gitignore
└── frontend/
    ├── src/pages/
    │   └── ContactPage.jsx # Contact form
    └── .env                # API URL configuration
```

## Security Best Practices

1. ✅ `.env` files are gitignored
2. ✅ Use environment variables for sensitive data
3. ✅ SMTP uses SSL/TLS (port 465)
4. ⚠️ Consider adding rate limiting to prevent spam
5. ⚠️ Add CAPTCHA for production (e.g., Google reCAPTCHA)
6. ⚠️ Restrict CORS to your domain in production

## Future Enhancements

- [ ] Add rate limiting (e.g., express-rate-limit)
- [ ] Implement CAPTCHA verification
- [ ] Add email templates with HTML/CSS styling
- [ ] Set up email logging/monitoring
- [ ] Add attachment support
- [ ] Implement email queue for better reliability
