# EmailJS Setup Guide

This guide will help you set up EmailJS to enable the contact form to send emails to your Gmail address (sv72910501@gmail.com).

## Step 1: Create EmailJS Account

1. Go to [EmailJS.com](https://www.emailjs.com/) and sign up for a free account
2. Verify your email address

## Step 2: Add Email Service

1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose "Gmail" as your email service
4. Connect your Gmail account (sv72910501@gmail.com)
5. Give your service a name (e.g., "gmail_service")
6. Note down the **Service ID** (you'll need this later)

## Step 3: Create Email Template

1. Go to "Email Templates" in your EmailJS dashboard
2. Click "Create New Template"
3. Use this template content:

**Template Name:** `contact_form`

**Subject:** `New Contact Form Message from {{from_name}}`

**Email Content:**
```
Hello,

You have received a new message from your portfolio contact form:

Name: {{from_name}}
Email: {{from_email}}
Subject: {{subject}}

Message:
{{message}}

---
This message was sent from your portfolio website.
```

4. Save the template and note down the **Template ID**

## Step 4: Get Your Public Key

1. Go to "Account" → "API Keys" in your EmailJS dashboard
2. Copy your **Public Key**

## Step 5: Update Your Code

Replace the placeholder values in your `script.js` file:

```javascript
// Replace "YOUR_PUBLIC_KEY" with your actual public key
emailjs.init("YOUR_PUBLIC_KEY");

// Replace "YOUR_SERVICE_ID" with your Gmail service ID
// Replace "YOUR_TEMPLATE_ID" with your template ID
emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
```

## Example with Real Values:

```javascript
// Initialize EmailJS
(function() {
    emailjs.init("user_abc123def456ghi789"); // Your actual public key
})();

// In the form submission:
emailjs.send('gmail_service', 'contact_form', templateParams)
```

## Step 6: Test Your Form

1. Open your portfolio website
2. Go to the "Get In Touch" section
3. Fill out the contact form
4. Click "Send Message"
5. Check your Gmail inbox (sv72910501@gmail.com) for the test message

## Troubleshooting

- **Emails not sending:** Check your browser console for error messages
- **Service ID not found:** Make sure you've correctly copied the Service ID from EmailJS dashboard
- **Template ID not found:** Verify the Template ID matches exactly
- **Public Key issues:** Ensure your Public Key is correct and the account is verified

## Security Notes

- The free EmailJS plan allows 200 emails per month
- Your public key is safe to include in client-side code
- Consider upgrading to a paid plan for higher email limits

## Alternative Setup (if EmailJS doesn't work)

If you prefer not to use EmailJS, you can also:
1. Use a backend service like Netlify Forms
2. Set up a simple backend API with Node.js/Express
3. Use Google Apps Script to handle form submissions

Let me know if you need help with any of these alternatives!
