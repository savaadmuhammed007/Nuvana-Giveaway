/**
 * Local Campaign Data & Storage Layer
 * Manages real entries, QR scan analytics, and Google Sheets sync.
 */

import { generateEntryId } from '../utils/idGenerator';

const STORAGE_KEYS = {
  ENTRIES: 'nuvana_giveaway_entries_v2',
  MY_ENTRY: 'nuvana_my_entry',
  QR_ANALYTICS: 'nuvana_qr_analytics_v2',
  CONFIG: 'nuvana_campaign_config'
};

const DEFAULT_QR_LOCATIONS = {
  'pappinisseri-junction': { name: 'Pappinisseri Main Junction Poster', scans: 0, entries: 0 },
  'bus-stand': { name: 'Pappinisseri Bus Stand Shelter', scans: 0, entries: 0 },
  'keechery-poster': { name: 'Keecheri Market Entrance', scans: 0, entries: 0 },
  'railway-station': { name: 'Pappinisseri Railway Station Road', scans: 0, entries: 0 },
  'dharmasala-hub': { name: 'Dharmasala College Junction', scans: 0, entries: 0 },
  'valapattanam-gate': { name: 'Valapattanam Toll / Highway', scans: 0, entries: 0 },
  'direct-web': { name: 'Direct Website / Organic', scans: 0, entries: 0 }
};

export function getStoredEntries() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ENTRIES);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    // Filter out any legacy dummy mock entries
    const dummyNames = ['muhammed shafi', 'anjali ramesh', 'faizal rahman', 'deepak v. k.', 'nabeel k. p.', 'sneha pavithran'];
    return parsed.filter(e => e && e.fullName && !dummyNames.includes(e.fullName.toLowerCase().trim()));
  } catch (e) {
    console.error('Storage parse error', e);
    return [];
  }
}

export function saveStoredEntries(entries) {
  try {
    localStorage.setItem(STORAGE_KEYS.ENTRIES, JSON.stringify(entries));
  } catch (e) {
    console.error('Failed to save entries to storage', e);
  }
}

export function getMyEntry() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.MY_ENTRY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

export function saveMyEntry(entry) {
  try {
    localStorage.setItem(STORAGE_KEYS.MY_ENTRY, JSON.stringify(entry));
  } catch (e) {
    console.error('Failed to save my entry', e);
  }
}

export function getQrAnalytics() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.QR_ANALYTICS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.QR_ANALYTICS, JSON.stringify(DEFAULT_QR_LOCATIONS));
      return DEFAULT_QR_LOCATIONS;
    }
    return JSON.parse(raw);
  } catch (e) {
    return DEFAULT_QR_LOCATIONS;
  }
}

export function recordQrScan(sourceKey) {
  if (!sourceKey) return;
  const analytics = getQrAnalytics();
  const normalizedKey = sourceKey.toLowerCase().trim();
  
  if (!analytics[normalizedKey]) {
    analytics[normalizedKey] = {
      name: `Custom Location (${normalizedKey})`,
      scans: 1,
      entries: 0
    };
  } else {
    analytics[normalizedKey].scans += 1;
  }
  
  try {
    localStorage.setItem(STORAGE_KEYS.QR_ANALYTICS, JSON.stringify(analytics));
  } catch (e) {
    console.error('Failed to record QR scan', e);
  }
}

export function recordQrEntry(sourceKey) {
  if (!sourceKey) return;
  const analytics = getQrAnalytics();
  const normalizedKey = sourceKey.toLowerCase().trim();
  
  if (analytics[normalizedKey]) {
    analytics[normalizedKey].entries += 1;
  } else {
    analytics[normalizedKey] = {
      name: `Custom Location (${normalizedKey})`,
      scans: 1,
      entries: 1
    };
  }

  try {
    localStorage.setItem(STORAGE_KEYS.QR_ANALYTICS, JSON.stringify(analytics));
  } catch (e) {
    console.error('Failed to record QR entry', e);
  }
}

export function addEntryToStorage(formData) {
  const entries = getStoredEntries();
  
  // Clean phone number for duplicate checking
  const cleanPhone = (formData.phone || '').replace(/\D/g, '').slice(-10);
  const existing = entries.find(e => e.phone && e.phone.replace(/\D/g, '').slice(-10) === cleanPhone);
  
  if (existing) {
    return {
      success: false,
      isDuplicate: true,
      entry: existing,
      message: `You have already entered with this mobile number! Your Entry ID is ${existing.entryId}.`
    };
  }
  
  // Generate sequential next Entry ID starting from actual entries count + 1
  const nextSeq = entries.length + 1;
  const newEntryId = generateEntryId(nextSeq);
  
  // Check if referred by someone
  const referredByCode = (formData.referredBy || '').trim().toUpperCase();
  if (referredByCode && referredByCode !== newEntryId) {
    const referrerIndex = entries.findIndex(
      e => e.entryId.toUpperCase() === referredByCode || (e.referralCode && e.referralCode.toUpperCase() === referredByCode)
    );
    if (referrerIndex !== -1) {
      entries[referrerIndex].referralCount = Math.min(5, (entries[referrerIndex].referralCount || 0) + 1);
    }
  }

  const newEntry = {
    entryId: newEntryId,
    fullName: (formData.fullName || '').trim(),
    phone: (formData.phone || '').trim(),
    email: (formData.email || '').trim(),
    location: formData.location || '',
    service: formData.service || '',
    consent: Boolean(formData.consent),
    qrSource: formData.qrSource || 'direct-web',
    referralCode: newEntryId,
    referredBy: referredByCode,
    referralCount: 0,
    timestamp: new Date().toISOString(),
    status: 'Verified'
  };

  entries.unshift(newEntry);
  saveStoredEntries(entries);
  saveMyEntry(newEntry);
  recordQrEntry(formData.qrSource || 'direct-web');

  return {
    success: true,
    isDuplicate: false,
    entry: newEntry,
    message: 'Entry submitted successfully!'
  };
}

export function deleteEntryFromStorage(entryId) {
  try {
    const entries = getStoredEntries();
    const updated = entries.filter(e => e.entryId !== entryId);
    saveStoredEntries(updated);

    const myEntry = getMyEntry();
    if (myEntry && myEntry.entryId === entryId) {
      localStorage.removeItem(STORAGE_KEYS.MY_ENTRY);
    }
    return updated;
  } catch (e) {
    console.error('Failed to delete entry', e);
    return getStoredEntries();
  }
}

export function deleteMultipleEntriesFromStorage(entryIds = []) {
  try {
    const entries = getStoredEntries();
    const updated = entries.filter(e => !entryIds.includes(e.entryId));
    saveStoredEntries(updated);

    const myEntry = getMyEntry();
    if (myEntry && entryIds.includes(myEntry.entryId)) {
      localStorage.removeItem(STORAGE_KEYS.MY_ENTRY);
    }
    return updated;
  } catch (e) {
    console.error('Failed to delete entries', e);
    return getStoredEntries();
  }
}

export function getScriptUrlConfig() {
  try {
    return localStorage.getItem(STORAGE_KEYS.CONFIG) || '';
  } catch (e) {
    return '';
  }
}

export function saveScriptUrlConfig(url) {
  try {
    localStorage.setItem(STORAGE_KEYS.CONFIG, (url || '').trim());
  } catch (e) {
    console.error('Failed to save script config', e);
  }
}

export function clearAllDemoEntries() {
  try {
    localStorage.removeItem(STORAGE_KEYS.ENTRIES);
    localStorage.removeItem(STORAGE_KEYS.MY_ENTRY);
    localStorage.removeItem(STORAGE_KEYS.QR_ANALYTICS);
    return [];
  } catch (e) {
    return [];
  }
}
