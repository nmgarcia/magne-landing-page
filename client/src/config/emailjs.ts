// EmailJS Configuration
// To set up EmailJS:
// 1. Go to https://www.emailjs.com/
// 2. Create an account and service
// 3. Create an email template 
// 4. Replace the values below with your actual credentials

export const emailjsConfig = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID',
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID', 
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY'
};

// Template Variables that will be sent to EmailJS:
// - from_name: User's name
// - from_email: User's email  
// - subject: Selected service/subject
// - message: User's message
// - to_name: 'Magne Software' (recipient name)