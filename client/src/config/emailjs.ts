// EmailJS Configuration
// To set up EmailJS:
// 1. Go to https://www.emailjs.com/
// 2. Create an account and service
// 3. Create an email template 
// 4. Replace the values below with your actual credentials

export const emailjsConfig = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID',
  // Template para confirmación al cliente
  clientTemplateId: import.meta.env.VITE_EMAILJS_CLIENT_TEMPLATE_ID || 'YOUR_CLIENT_TEMPLATE_ID',
  // Template para notificación al admin
  adminTemplateId: import.meta.env.VITE_EMAILJS_ADMIN_TEMPLATE_ID || 'YOUR_ADMIN_TEMPLATE_ID',
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY'
};

// Template Variables para Client Confirmation:
// - to_name: User's name (recipient)
// - to_email: User's email
// - from_name: 'Magne Software'
// - service_interest: Selected service

// Template Variables para Admin Notification:
// - from_name: User's name
// - reply_to: User's email  
// - service_interest: Selected service/subject
// - message: User's message
// - contact_date: Current date
// - to_name: 'Mariano García' (admin name)