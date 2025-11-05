# 📧 Configuración de EmailJS para Formulario de Contacto

## 🚀 Pasos para configurar el envío de correos electrónicos:

### 1. **Crear cuenta en EmailJS**
1. Ve a [https://www.emailjs.com/](https://www.emailjs.com/)
2. Crea una cuenta gratuita
3. Confirma tu email

### 2. **Configurar servicio de email**
1. En el dashboard, ve a **"Email Services"**
2. Haz clic en **"Add New Service"**
3. Selecciona tu proveedor (Gmail, Outlook, etc.)
4. Sigue las instrucciones para conectar tu cuenta
5. Copia el **SERVICE ID** que aparece

### 3. **Crear templates de email**

#### Template 1: Notificación para el equipo
1. Ve a **"Email Templates"**
2. Crea un nuevo template con este contenido:

**Subject:** Nuevo mensaje de contacto - {{from_name}}

**Content:**
```
Hola {{to_name}},

Has recibido un nuevo mensaje de contacto:

Nombre: {{from_name}}
Email: {{from_email}}
Mensaje: {{message}}

Responde a: {{reply_to}}

--
Sistema de contacto Cuerar
```

#### Template 2: Confirmación para el cliente
**Subject:** ¡Hemos recibido tu mensaje! - {{company_name}}

**Content:**
```
Hola {{to_name}},

¡Gracias por contactarnos!

Hemos recibido tu mensaje y alguien de nuestro equipo se pondrá en contacto contigo a la brevedad.

Saludos,
Equipo {{company_name}}

--
Este es un mensaje automático, no responder a este correo.
```

### 4. **Obtener las credenciales**
1. Ve a **"Account"** → **"General"**
2. Copia tu **PUBLIC KEY**
3. Copia los **TEMPLATE IDs** de ambos templates
4. Copia el **SERVICE ID**

### 5. **Configurar en el código**
Abre `java/contacto.js` y reemplaza:

```javascript
// Línea 4: Reemplaza TU_PUBLIC_KEY
emailjs.init('tu_public_key_aqui');

// Línea 32: Reemplaza TU_SERVICE_ID y TU_TEMPLATE_ID
emailjs.send('tu_service_id', 'tu_template_id_notificacion', templateParams)

// Línea 50: Reemplaza TU_SERVICE_ID y TU_TEMPLATE_CONFIRMACION_ID  
emailjs.send('tu_service_id', 'tu_template_id_confirmacion', templateParamsConfirmacion)
```

### 6. **Límites de la cuenta gratuita**
- 200 emails por mes
- Para más volumen, considera los planes de pago

## 🔧 **Alternativas más avanzadas:**

### **Opción 2: Backend con Node.js + Nodemailer**
Si quieres más control, puedes crear un servidor backend:

```bash
# Instalar dependencias
npm init -y
npm install express nodemailer cors body-parser
```

### **Opción 3: Servicios como Netlify Forms**
Si tu sitio está en Netlify, puedes usar Netlify Forms:

```html
<form name="contacto" method="POST" data-netlify="true">
```

### **Opción 4: Formspree**
Servicio simple para formularios:
```html
<form action="https://formspree.io/f/tu-form-id" method="POST">
```

## ⚠️ **Importante:**
- Nunca expongas credenciales sensibles en el frontend
- EmailJS es seguro porque usa tokens públicos limitados
- Para producción, considera un backend para mayor seguridad

## 📞 **Soporte:**
Si tienes problemas con la configuración, revisa:
1. Console del navegador para errores
2. Configuración de EmailJS
3. Spam/carpeta de correo no deseado