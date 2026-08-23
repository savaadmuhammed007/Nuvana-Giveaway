/**
 * Social Sharing and Clipboard Helpers
 */

export const CONTACT_CONFIG = {
  travelsPhone: '+91 755 996 6620',
  travelsWhatsApp: '917559966620',
  cargoPhone: '+91 755 996 6621',
  cargoWhatsApp: '917559966621',
  email: 'nuvanago.fly@gmail.com',
  website: 'https://nuvanago.in',
  websiteDisplay: 'nuvanago.in',
  address: 'Opp Kattilepalli, Pappinisseri - 670561',
  locationPin: 'https://maps.google.com/?q=Pappinisseri+Kerala'
};

export function buildWhatsAppShareUrl(entryId, refUrl) {
  const targetUrl = refUrl || (typeof window !== 'undefined' ? `${window.location.origin}${window.location.pathname}?ref=${entryId}` : `https://nuvanago.in/?ref=${entryId}`);
  
  const message = `🎉 *Nuvana.go Pappinisseri Grand Launch Giveaway!* 🎁

I just entered the Nuvana.go Pappinisseri Launch Giveaway! (Entry ID: *${entryId}*)

✈️ *Travels • Worldwide Cargo • Visas • Flight Tickets*
You can enter for FREE and win exciting prizes including a Luxury Resort Stay & Free Shipment up to 10kg!

👉 Click the link to enter now:
${targetUrl}

#NuvanaGo #NuvanaEx #Pappinisseri #KeralaTravels #CargoServices`;

  return `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
}

export function buildDirectWhatsAppInquiry(serviceName = 'General Inquiry', category = 'travel') {
  const isCargo = category === 'cargo' || serviceName.toLowerCase().includes('cargo') || serviceName.toLowerCase().includes('freight') || serviceName.toLowerCase().includes('baggage') || serviceName.toLowerCase().includes('courier') || serviceName.toLowerCase().includes('shop');
  const number = isCargo ? CONTACT_CONFIG.cargoWhatsApp : CONTACT_CONFIG.travelsWhatsApp;
  const brandDivision = isCargo ? 'Nuvana.ex Cargo' : 'Nuvana.go Travels';
  
  const message = `Hello ${brandDivision} Pappinisseri team, I would like to enquire about your *${serviceName}* services.`;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export async function copyToClipboard(text) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // Fallback for older browsers / non-HTTPS
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      return successful;
    }
  } catch (err) {
    console.error('Failed to copy text: ', err);
    return false;
  }
}
