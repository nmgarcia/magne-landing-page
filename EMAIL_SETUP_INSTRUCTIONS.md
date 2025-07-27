# Configuración de EmailJS para Magne Software

## Instrucciones de Setup

### 1. Crear cuenta en EmailJS
1. Ve a [https://www.emailjs.com/](https://www.emailjs.com/)
2. Crea una cuenta gratuita
3. Verifica tu email

### 2. Configurar servicio de email
1. En el dashboard, ve a "Email Services"
2. Conecta tu servicio de email (Gmail, Outlook, etc.)
3. Anota el **Service ID**

### 3. Crear Template de Confirmación al Cliente
1. Ve a "Email Templates" → "Create New Template"
2. **Template Name**: `Client Confirmation Template`
3. **Template ID**: `template_client_confirmation`
4. En el editor de template, usa el contenido HTML de:
   ```
   client/src/templates/emailTemplates.ts → clientConfirmationTemplate.html
   ```
5. Configura las variables del template:
   - `{{to_name}}` - Nombre del cliente
   - `{{to_email}}` - Email del cliente  
   - `{{service_interest}}` - Servicio de interés

### 4. Crear Template de Notificación Admin
1. Crear otro template con:
2. **Template Name**: `Admin Notification Template`
3. **Template ID**: `template_admin_notification`
4. Usar el contenido HTML de:
   ```
   client/src/templates/emailTemplates.ts → adminNotificationTemplate.html
   ```
5. Variables del template:
   - `{{from_name}}` - Nombre del cliente
   - `{{reply_to}}` - Email del cliente
   - `{{service_interest}}` - Servicio solicitado
   - `{{message}}` - Mensaje del cliente
   - `{{contact_date}}` - Fecha del contacto

### 5. Configurar Variables de Entorno
Crea las siguientes variables de entorno en Replit:

```env
VITE_EMAILJS_SERVICE_ID=tu_service_id_aqui
VITE_EMAILJS_CLIENT_TEMPLATE_ID=template_client_confirmation
VITE_EMAILJS_ADMIN_TEMPLATE_ID=template_admin_notification
VITE_EMAILJS_PUBLIC_KEY=tu_public_key_aqui
```

### 6. Configurar Email de Destino Admin
En el template de notificación admin, configura el email de destino:
- **To Email**: marianogarcia@magne.io (o tu email preferido)
- **From Name**: {{from_name}}
- **Reply To**: {{reply_to}}

### 7. Configurar Email de Confirmación Cliente
En el template de confirmación cliente:
- **To Email**: {{to_email}}
- **From Name**: Magne Software
- **From Email**: hello@magne.io (o el email configurado en tu servicio)

## Flujo de Emails

### Cuando un cliente envía el formulario:

1. **Email al Cliente** (Confirmación):
   - Template visualmente impactante con colores de Magne
   - Mensaje cálido de Mariano García (CEO)
   - Promesa de respuesta en 24 horas
   - Información sobre la empresa
   
2. **Email al Admin** (Notificación):
   - Información completa del cliente
   - Mensaje del cliente
   - Botones de acción rápida
   - Recordatorio de respuesta rápida

## Personalización de Templates

Los templates están diseñados con:
- Colores oficiales de Magne Software
- Gradientes y efectos visuales
- Responsive design
- Identidad corporativa consistente
- Fonts: Space Grotesk (headings) y Poppins (body)

## Colores Utilizados
- Naranja principal: `#f97316`
- Púrpura: `#9333ea`
- Slate backgrounds: `#0f172a`, `#1e293b`, `#334155`
- Gradientes dinámicos con animaciones CSS

## Testing
Para probar los templates:
1. Usa la función "Test" en EmailJS dashboard
2. Envía un email de prueba desde el formulario
3. Verifica que ambos emails lleguen correctamente
4. Revisa que el diseño se vea bien en diferentes clientes de email

## Notas Importantes
- Los templates incluyen fallbacks para clientes de email que no soportan CSS avanzado
- Las animaciones CSS funcionan en clientes modernos
- Los emails son completamente responsive
- Se incluyen enlaces de acción para respuesta rápida