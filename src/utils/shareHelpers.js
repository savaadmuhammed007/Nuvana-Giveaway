/**
 * Social Sharing and Clipboard Helpers
 */

export function buildWhatsAppShareUrl(entryId, refUrl) {
  const targetUrl = refUrl || (typeof window !== 'undefined' ? `${window.location.origin}${window.location.pathname}?ref=${entryId}` : `https://nuvana.go/?ref=${entryId}`);
  
  const message = `🎉 *Nuvana.go Pappinisseri Grand Launch Giveaway!* 🎁

ഞാൻ Nuvana.go പാപ്പിനിശ്ശേരി ഓഫീസിന്റെ ലോഞ്ച് ഗിവ്എവേയിൽ പങ്കെടുത്തു! (Entry ID: *${entryId}*)

✈️ *Travel • Cargo • Visa • Flight Tickets*
നിങ്ങൾക്കും സൗജന്യമായി പങ്കെടുക്കാം, വമ്പൻ സമ്മാനങ്ങൾ നേടാം!

👉 ലിങ്ക് ക്ലിക്ക് ചെയ്ത് പങ്കെടുക്കൂ:
${targetUrl}

#NuvanaGo #PappinisseriLaunch #KeralaTravels #CargoServices`;

  return `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
}

export function buildDirectWhatsAppInquiry(serviceName = 'General Inquiry') {
  const officialNumber = '919876543210'; // Default official WhatsApp number (can be updated)
  const message = `Hello Nuvana.go Pappinisseri team, I saw your *Scan • Explore • Win* launch campaign. I would like to know more about your *${serviceName}* services.`;
  return `https://wa.me/${officialNumber}?text=${encodeURIComponent(message)}`;
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
