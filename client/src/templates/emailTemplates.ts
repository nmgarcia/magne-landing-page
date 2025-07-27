// Email templates for Magne Software with brand identity

export const clientConfirmationTemplate = {
  subject: "¡Gracias por contactar a Magne Software! 🚀",
  html: `
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Confirmación - Magne Software</title>
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Poppins:wght@300;400;500;600;700&display=swap');
            
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            
            body {
                font-family: 'Poppins', sans-serif;
                line-height: 1.6;
                color: #ffffff;
                background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #4c1d95 100%);
                min-height: 100vh;
                padding: 20px;
            }
            
            .container {
                max-width: 600px;
                margin: 0 auto;
                background: linear-gradient(135deg, #1e293b 0%, #334155 50%, #4c1d95 100%);
                border-radius: 20px;
                overflow: hidden;
                box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
                border: 1px solid rgba(255, 255, 255, 0.1);
            }
            
            .header {
                background: linear-gradient(135deg, #f97316 0%, #ea580c 50%, #9333ea 100%);
                padding: 40px 30px;
                text-align: center;
                position: relative;
                overflow: hidden;
            }
            
            .header::before {
                content: '';
                position: absolute;
                top: -50%;
                left: -50%;
                width: 200%;
                height: 200%;
                background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
                animation: rotate 20s linear infinite;
            }
            
            @keyframes rotate {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            
            .logo {
                font-family: 'Space Grotesk', sans-serif;
                font-size: 32px;
                font-weight: 700;
                color: #ffffff;
                margin-bottom: 10px;
                text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
                position: relative;
                z-index: 2;
            }
            
            .tagline {
                font-size: 14px;
                color: rgba(255, 255, 255, 0.9);
                font-weight: 300;
                position: relative;
                z-index: 2;
            }
            
            .content {
                padding: 40px 30px;
            }
            
            .greeting {
                font-size: 24px;
                font-weight: 600;
                color: #f97316;
                margin-bottom: 20px;
                text-align: center;
            }
            
            .message {
                font-size: 16px;
                color: #e2e8f0;
                margin-bottom: 25px;
                line-height: 1.7;
            }
            
            .ceo-section {
                background: linear-gradient(135deg, rgba(249, 115, 22, 0.1) 0%, rgba(147, 51, 234, 0.1) 100%);
                border: 1px solid rgba(249, 115, 22, 0.2);
                border-radius: 15px;
                padding: 25px;
                margin: 30px 0;
                text-align: center;
            }
            
            .ceo-name {
                font-size: 20px;
                font-weight: 600;
                color: #f97316;
                margin-bottom: 5px;
            }
            
            .ceo-title {
                font-size: 14px;
                color: #9333ea;
                font-weight: 500;
                margin-bottom: 15px;
            }
            
            .ceo-message {
                font-size: 16px;
                color: #e2e8f0;
                font-style: italic;
                line-height: 1.6;
            }
            
            .features {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
                gap: 20px;
                margin: 30px 0;
            }
            
            .feature {
                text-align: center;
                padding: 20px;
                background: rgba(255, 255, 255, 0.05);
                border-radius: 12px;
                border: 1px solid rgba(255, 255, 255, 0.1);
            }
            
            .feature-icon {
                font-size: 24px;
                margin-bottom: 10px;
            }
            
            .feature-text {
                font-size: 14px;
                color: #cbd5e1;
            }
            
            .cta-section {
                text-align: center;
                margin: 30px 0;
            }
            
            .cta-button {
                display: inline-block;
                background: linear-gradient(135deg, #f97316 0%, #ea580c 50%, #9333ea 100%);
                color: #ffffff;
                text-decoration: none;
                padding: 15px 30px;
                border-radius: 50px;
                font-weight: 600;
                font-size: 16px;
                transition: all 0.3s ease;
                box-shadow: 0 10px 25px rgba(249, 115, 22, 0.3);
            }
            
            .footer {
                background: rgba(0, 0, 0, 0.3);
                padding: 30px;
                text-align: center;
                border-top: 1px solid rgba(255, 255, 255, 0.1);
            }
            
            .contact-info {
                margin-bottom: 20px;
            }
            
            .contact-item {
                display: inline-block;
                margin: 0 15px;
                color: #94a3b8;
                font-size: 14px;
            }
            
            .social-links {
                margin-top: 20px;
            }
            
            .social-link {
                display: inline-block;
                margin: 0 10px;
                color: #f97316;
                text-decoration: none;
                font-size: 20px;
            }
            
            .copyright {
                margin-top: 20px;
                font-size: 12px;
                color: #64748b;
            }
            
            @media (max-width: 600px) {
                .container {
                    margin: 10px;
                    border-radius: 15px;
                }
                
                .header, .content, .footer {
                    padding: 25px 20px;
                }
                
                .logo {
                    font-size: 28px;
                }
                
                .greeting {
                    font-size: 20px;
                }
                
                .features {
                    grid-template-columns: 1fr;
                }
                
                .contact-item {
                    display: block;
                    margin: 5px 0;
                }
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <div class="logo">magne.</div>
                <div class="tagline">Innovation • Technology • Magnetism</div>
            </div>
            
            <div class="content">
                <div class="greeting">¡Hola {{to_name}}! 👋</div>
                
                <div class="message">
                    Muchas gracias por escribirnos. Hemos recibido tu mensaje y queremos que sepas que es muy importante para nosotros.
                </div>
                
                <div class="ceo-section">
                    <div class="ceo-name">Mariano García</div>
                    <div class="ceo-title">CEO & Founder - Magne Software Solutions</div>
                    <div class="ceo-message">
                        "Tu mensaje puede ser el comienzo de algo extraordinario. En Magne Software, cada proyecto es una oportunidad de crear soluciones que realmente marquen la diferencia. Pronto nos comunicaremos contigo para conocer más sobre tu visión."
                    </div>
                </div>
                
                <div class="message">
                    Nuestro equipo revisará tu consulta y te contactaremos dentro de las próximas <strong style="color: #f97316;">24 horas</strong> para comenzar a magnetizar tus ideas.
                </div>
                
                <div class="features">
                    <div class="feature">
                        <div class="feature-icon">🚀</div>
                        <div class="feature-text">Respuesta rápida garantizada</div>
                    </div>
                    <div class="feature">
                        <div class="feature-icon">⚡</div>
                        <div class="feature-text">Soluciones innovadoras</div>
                    </div>
                    <div class="feature">
                        <div class="feature-icon">🎯</div>
                        <div class="feature-text">Enfoque personalizado</div>
                    </div>
                </div>
                
                <div class="cta-section">
                    <a href="https://magne.io class="cta-button">
                        Conoce más sobre nosotros
                    </a>
                </div>
                
                <div class="message">
                    Mientras tanto, te invitamos a explorar nuestros servicios y proyectos en nuestro sitio web.
                </div>
            </div>
            
            <div class="footer">
                <div class="contact-info">
                    <span class="contact-item">📧 hello@magne.io</span>
                    <span class="contact-item">📱 +54 2974620917</span>
                    <span class="contact-item">📍 Santa Fe, Argentina</span>
                </div>
                
                <div class="social-links">
                    <a href="#" class="social-link">🌐</a>
                    <a href="#" class="social-link">💼</a>
                    <a href="#" class="social-link">📱</a>
                </div>
                
                <div class="copyright">
                    © 2025 Magne Software Solutions. Todos los derechos reservados.
                </div>
            </div>
        </div>
    </body>
    </html>
  `
};

export const adminNotificationTemplate = {
  subject: "🎯 Nuevo contacto desde Magne Software - {{from_name}}",
  html: `
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Nuevo Contacto - Magne Software</title>
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Poppins:wght@300;400;500;600;700&display=swap');
            
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            
            body {
                font-family: 'Poppins', sans-serif;
                line-height: 1.6;
                color: #ffffff;
                background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #4c1d95 100%);
                min-height: 100vh;
                padding: 20px;
            }
            
            .container {
                max-width: 650px;
                margin: 0 auto;
                background: linear-gradient(135deg, #1e293b 0%, #334155 50%, #4c1d95 100%);
                border-radius: 20px;
                overflow: hidden;
                box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
                border: 1px solid rgba(255, 255, 255, 0.1);
            }
            
            .header {
                background: linear-gradient(135deg, #dc2626 0%, #ea580c 50%, #9333ea 100%);
                padding: 30px;
                text-align: center;
            }
            
            .logo {
                font-family: 'Space Grotesk', sans-serif;
                font-size: 28px;
                font-weight: 700;
                color: #ffffff;
                margin-bottom: 10px;
            }
            
            .alert-badge {
                background: rgba(255, 255, 255, 0.2);
                border: 1px solid rgba(255, 255, 255, 0.3);
                border-radius: 50px;
                padding: 8px 20px;
                font-size: 14px;
                font-weight: 500;
                display: inline-block;
            }
            
            .content {
                padding: 30px;
            }
            
            .notification-title {
                font-size: 22px;
                font-weight: 600;
                color: #f97316;
                margin-bottom: 20px;
                text-align: center;
            }
            
            .client-info {
                background: linear-gradient(135deg, rgba(249, 115, 22, 0.1) 0%, rgba(147, 51, 234, 0.1) 100%);
                border: 1px solid rgba(249, 115, 22, 0.2);
                border-radius: 15px;
                padding: 25px;
                margin-bottom: 25px;
            }
            
            .client-info h3 {
                color: #f97316;
                font-size: 18px;
                margin-bottom: 15px;
                border-bottom: 1px solid rgba(249, 115, 22, 0.2);
                padding-bottom: 10px;
            }
            
            .info-grid {
                display: grid;
                gap: 15px;
            }
            
            .info-item {
                display: flex;
                align-items: flex-start;
                gap: 12px;
            }
            
            .info-label {
                font-weight: 600;
                color: #9333ea;
                min-width: 80px;
                font-size: 14px;
            }
            
            .info-value {
                color: #e2e8f0;
                flex: 1;
                font-size: 14px;
            }
            
            .message-section {
                background: rgba(0, 0, 0, 0.2);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 12px;
                padding: 20px;
                margin: 20px 0;
            }
            
            .message-section h4 {
                color: #f97316;
                margin-bottom: 10px;
                font-size: 16px;
            }
            
            .message-content {
                color: #cbd5e1;
                line-height: 1.6;
                font-size: 15px;
                background: rgba(255, 255, 255, 0.05);
                padding: 15px;
                border-radius: 8px;
                border-left: 4px solid #f97316;
            }
            
            .priority-section {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin: 25px 0;
                padding: 20px;
                background: rgba(220, 38, 38, 0.1);
                border: 1px solid rgba(220, 38, 38, 0.2);
                border-radius: 12px;
            }
            
            .priority-text {
                color: #fca5a5;
                font-weight: 600;
                font-size: 16px;
            }
            
            .timestamp {
                color: #94a3b8;
                font-size: 12px;
            }
            
            .action-buttons {
                display: flex;
                gap: 15px;
                justify-content: center;
                margin: 30px 0;
            }
            
            .action-btn {
                padding: 12px 25px;
                border-radius: 8px;
                text-decoration: none;
                font-weight: 600;
                font-size: 14px;
                text-align: center;
                transition: all 0.3s ease;
            }
            
            .btn-primary {
                background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
                color: #ffffff;
            }
            
            .btn-secondary {
                background: rgba(147, 51, 234, 0.2);
                border: 1px solid #9333ea;
                color: #9333ea;
            }
            
            .footer {
                background: rgba(0, 0, 0, 0.3);
                padding: 20px;
                text-align: center;
                border-top: 1px solid rgba(255, 255, 255, 0.1);
                font-size: 12px;
                color: #64748b;
            }
            
            @media (max-width: 600px) {
                .container {
                    margin: 10px;
                    border-radius: 15px;
                }
                
                .header, .content {
                    padding: 20px;
                }
                
                .action-buttons {
                    flex-direction: column;
                }
                
                .priority-section {
                    flex-direction: column;
                    gap: 10px;
                    text-align: center;
                }
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <div class="logo">magne.</div>
                <div class="alert-badge">🚨 NUEVO CONTACTO</div>
            </div>
            
            <div class="content">
                <div class="notification-title">
                    Nuevo cliente potencial contactó
                </div>
                
                <div class="client-info">
                    <h3>📋 Información del Cliente</h3>
                    <div class="info-grid">
                        <div class="info-item">
                            <span class="info-label">👤 Nombre:</span>
                            <span class="info-value">{{from_name}}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">📧 Email:</span>
                            <span class="info-value">{{reply_to}}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">🎯 Servicio:</span>
                            <span class="info-value">{{service_interest}}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">📅 Fecha:</span>
                            <span class="info-value">{{contact_date}}</span>
                        </div>
                    </div>
                </div>
                
                <div class="message-section">
                    <h4>💬 Mensaje del Cliente</h4>
                    <div class="message-content">
                        {{message}}
                    </div>
                </div>
                
                <div class="priority-section">
                    <div class="priority-text">⚡ Respuesta rápida prometida</div>
                    <div class="timestamp">Responder dentro de 24 horas</div>
                </div>
                
                <div class="action-buttons">
                    <a href="mailto:{{reply_to}}?subject=Re: Consulta sobre {{service_interest}}" class="action-btn btn-primary">
                        📧 Responder Email
                    </a>
                    <a href="https://magne.io" class="action-btn btn-secondary">
                        🌐 Ver Sitio Web
                    </a>
                </div>
            </div>
            
            <div class="footer">
                Sistema automático de notificaciones - Magne Software Solutions<br>
                Este email fue generado automáticamente desde el formulario de contacto
            </div>
        </div>
    </body>
    </html>
  `
};