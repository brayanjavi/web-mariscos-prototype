import emailjs from '@emailjs/browser';

const EMAILJS_PUBLIC_KEY = import.meta.env.PUBLIC_EMAILJS_PUBLIC_KEY;
const EMAILJS_SERVICE_ID = import.meta.env.PUBLIC_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_CLIENT = import.meta.env.PUBLIC_EMAILJS_TEMPLATE_CLIENT;
const EMAILJS_TEMPLATE_BUSINESS = import.meta.env.PUBLIC_EMAILJS_TEMPLATE_BUSINESS;
const BUSINESS_EMAIL = import.meta.env.PUBLIC_BUSINESS_EMAIL ?? 'reservas@laperladelmar.mx';

let initialized = false;

function hasConfig() {
  return Boolean(
    EMAILJS_PUBLIC_KEY &&
      EMAILJS_SERVICE_ID &&
      EMAILJS_TEMPLATE_CLIENT &&
      EMAILJS_TEMPLATE_BUSINESS,
  );
}

function ensureEmailJs() {
  if (!hasConfig()) {
    throw new Error('Faltan variables públicas de EmailJS.');
  }

  if (!initialized) {
    emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
    initialized = true;
  }
}

export async function sendReservationEmails(data) {
  ensureEmailJs();

  const { name, phone, email, date, time, guests, zone, notes } = data;

  const baseParams = {
    client_name: name,
    client_phone: phone,
    client_email: email || 'No proporcionado',
    res_date: date,
    res_time: time,
    res_guests: guests,
    res_zone: zone || 'Sin preferencia',
    res_notes: notes || 'Ninguna',
  };

  const sends = [
    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_BUSINESS, {
      ...baseParams,
      to_email: BUSINESS_EMAIL,
      to_name: 'La Perla del Mar',
    }),
  ];

  if (email) {
    sends.push(
      emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_CLIENT, {
        ...baseParams,
        to_email: email,
        to_name: name,
      }),
    );
  }

  await Promise.all(sends);
}
