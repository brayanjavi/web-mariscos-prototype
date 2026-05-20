/* ================================================================
   SERVICIO DE RESERVACIONES — EmailJS
   ================================================================
   Para activar el envío de correos, sigue estos pasos:

   1. Crea una cuenta gratuita en https://www.emailjs.com
   2. En "Email Services", conecta tu cuenta de Gmail (u otro proveedor).
   3. Crea DOS plantillas de correo ("Email Templates"):

      ── Plantilla para el CLIENTE (EMAILJS_TEMPLATE_CLIENT) ──────
         Subject : Confirmación de reservación – La Perla del Mar
         Body    :
           Hola {{to_name}},
           Tu reservación ha sido confirmada. Aquí los detalles:
           • Fecha  : {{res_date}}
           • Hora   : {{res_time}}
           • Personas: {{res_guests}}
           • Zona   : {{res_zone}}
           • Notas  : {{res_notes}}
           ¡Te esperamos! — La Perla del Mar

      ── Plantilla para el NEGOCIO (EMAILJS_TEMPLATE_BUSINESS) ────
         Subject : Nueva reservación de {{client_name}}
         Body    :
           Nueva solicitud de reservación:
           • Nombre  : {{client_name}}
           • Teléfono: {{client_phone}}
           • Email   : {{client_email}}
           • Fecha   : {{res_date}}
           • Hora    : {{res_time}}
           • Personas: {{res_guests}}
           • Zona    : {{res_zone}}
           • Notas   : {{res_notes}}

   4. En "Account" → copia tu Public Key.
   5. Reemplaza los cuatro valores EMAILJS_* de abajo con tus credenciales.
   ================================================================ */

const EMAILJS_PUBLIC_KEY        = 'TU_PUBLIC_KEY';       // Account → Public Key
const EMAILJS_SERVICE_ID        = 'TU_SERVICE_ID';       // Email Services → Service ID
const EMAILJS_TEMPLATE_CLIENT   = 'TU_TEMPLATE_CLIENTE'; // ID de la plantilla del cliente
const EMAILJS_TEMPLATE_BUSINESS = 'TU_TEMPLATE_NEGOCIO'; // ID de la plantilla del negocio

const BUSINESS_EMAIL = 'djbjmo@gmail.com';

/* ── Inicializa EmailJS ──────────────────────────────────────── */
(function initEmailJS() {
  if (typeof emailjs !== 'undefined') {
    emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
  }
})();

/* ── Envía los correos de reservación ───────────────────────── */
/**
 * Envía una notificación al restaurante y, si se proporcionó correo,
 * una confirmación al cliente.
 *
 * @param {Object} data
 * @param {string} data.name    - Nombre completo del cliente
 * @param {string} data.phone   - Teléfono del cliente
 * @param {string} data.email   - Correo del cliente (puede ser vacío)
 * @param {string} data.date    - Fecha formateada (ej. "25 de Diciembre de 2024")
 * @param {string} data.time    - Horario seleccionado (ej. "14:00")
 * @param {string} data.guests  - Número de personas
 * @param {string} data.zone    - Zona preferida
 * @param {string} data.notes   - Notas especiales
 * @returns {Promise<void>}
 */
async function sendReservationEmails(data) {
  if (typeof emailjs === 'undefined') {
    throw new Error('EmailJS no está disponible. Verifica que el CDN esté cargado.');
  }

  const { name, phone, email, date, time, guests, zone, notes } = data;

  const baseParams = {
    client_name:  name,
    client_phone: phone,
    client_email: email || 'No proporcionado',
    res_date:     date,
    res_time:     time,
    res_guests:   guests,
    res_zone:     zone || 'Sin preferencia',
    res_notes:    notes || 'Ninguna',
  };

  const sends = [];

  // Siempre notifica al restaurante
  sends.push(
    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_BUSINESS, {
      ...baseParams,
      to_email: BUSINESS_EMAIL,
      to_name:  'La Perla del Mar',
    })
  );

  // Confirma al cliente solo si proporcionó su correo
  if (email) {
    sends.push(
      emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_CLIENT, {
        ...baseParams,
        to_email: email,
        to_name:  name,
      })
    );
  }

  await Promise.all(sends);
}
