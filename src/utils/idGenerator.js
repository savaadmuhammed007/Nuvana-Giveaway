/**
 * Entry ID Generator for Pappinisseri Launch Giveaway
 * Format: PAP-2026-XXXXX (e.g. PAP-2026-00421)
 */

export function generateEntryId(sequenceNumber) {
  const currentYear = '2026';
  const prefix = 'PAP';
  
  if (sequenceNumber && typeof sequenceNumber === 'number') {
    const padded = String(sequenceNumber).padStart(5, '0');
    return `${prefix}-${currentYear}-${padded}`;
  }
  
  // Random fallback 5-digit number
  const randomNum = Math.floor(10000 + Math.random() * 90000);
  return `${prefix}-${currentYear}-${randomNum}`;
}

export function isValidEntryId(id) {
  if (!id || typeof id !== 'string') return false;
  return /^PAP-2026-\d{4,6}$/i.test(id.trim());
}
