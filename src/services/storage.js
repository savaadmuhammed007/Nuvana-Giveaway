/**
 * Local Campaign Data & Storage Layer
 * Supports offline-first persistence and fallback for Google Sheets.
 */

import { generateEntryId } from '../utils/idGenerator';

const STORAGE_KEYS = {
  ENTRIES: 'nuvana_giveaway_entries',
  MY_ENTRY: 'nuvana_my_entry',
  QR_ANALYTICS: 'nuvana_qr_analytics',
  CONFIG: 'nuvana_campaign_config'
};

// Seed realistic initial entries for Pappinisseri launch campaign activity
const INITIAL_SEED_ENTRIES = [
  {
    entryId: 'PAP-2026-00001',
    fullName: 'Muhammed Shafi',
    phone: '+91 98471 23450',
    email: 'shafi.m@gmail.com',
    location: 'Keecheri, Pappinisseri',
    service: 'Cargo',
    consent: true,
    qrSource: 'pappinisseri-junction',
    referralCode: 'PAP-2026-00001',
    referredBy: '',
    referralCount: 4,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 28).toISOString(),
    status: 'Verified'
  },
  {
    entryId: 'PAP-2026-00002',
    fullName: 'Anjali Ramesh',
    phone: '+91 94472 88910',
    email: 'anjaliramesh@yahoo.com',
    location: 'Kalliasseri Central',
    service: 'Travel',
    consent: true,
    qrSource: 'bus-stand',
    referralCode: 'PAP-2026-00002',
    referredBy: '',
    referralCount: 2,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 22).toISOString(),
    status: 'Verified'
  },
  {
    entryId: 'PAP-2026-00003',
    fullName: 'Faizal Rahman',
    phone: '+91 97455 12093',
    email: 'faizal.dxb@gmail.com',
    location: 'Aaron, Pappinisseri',
    service: 'Visa',
    consent: true,
    qrSource: 'keechery-poster',
    referralCode: 'PAP-2026-00003',
    referredBy: 'PAP-2026-00001',
    referralCount: 3,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString(),
    status: 'Verified'
  },
  {
    entryId: 'PAP-2026-00004',
    fullName: 'Deepak V. K.',
    phone: '+91 99951 45821',
    email: 'deepakvk@outlook.com',
    location: 'Dharmasala Hub',
    service: 'Ticketing',
    consent: true,
    qrSource: 'dharmasala-hub',
    referralCode: 'PAP-2026-00004',
    referredBy: '',
    referralCount: 1,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
    status: 'Verified'
  },
  {
    entryId: 'PAP-2026-00005',
    fullName: 'Nabeel K. P.',
    phone: '+91 96052 77810',
    email: 'nabeelkp@gmail.com',
    location: 'Valapattanam Bridge',
    service: 'Cargo',
    consent: true,
    qrSource: 'valapattanam-gate',
    referralCode: 'PAP-2026-00005',
    referredBy: 'PAP-2026-00001',
    referralCount: 5,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
    status: 'Verified'
  },
  {
    entryId: 'PAP-2026-00006',
    fullName: 'Sneha Pavithran',
    phone: '+91 94963 11200',
    email: 'sneha.pavi@gmail.com',
    location: 'Pappinisseri Railway Gate',
    service: 'Multiple Services',
    consent: true,
    qrSource: 'railway-station',
    referralCode: 'PAP-2026-00006',
    referredBy: 'PAP-2026-00002',
    referralCount: 0,
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    status: 'Verified'
  }
];

const INITIAL_QR_ANALYTICS = {
  'pappinisseri-junction': { name: 'Pappinisseri Main Junction Poster', scans: 482, entries: 312 },
  'bus-stand': { name: 'Pappinisseri Bus Stand Shelter', scans: 395, entries: 264 },
  'keechery-poster': { name: 'Keecheri Market Entrance', scans: 340, entries: 218 },
  'railway-station': { name: 'Pappinisseri Railway Station Road', scans: 290, entries: 184 },
  'dharmasala-hub': { name: 'Dharmasala College Junction', scans: 210, entries: 145 },
  'valapattanam-gate': { name: 'Valapattanam Toll / Highway', scans: 190, entries: 120 },
  'poster-01': { name: 'Poster 01 - General Street', scans: 85, entries: 41 }
};

export function getStoredEntries() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ENTRIES);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.ENTRIES, JSON.stringify(INITIAL_SEED_ENTRIES));
      return INITIAL_SEED_ENTRIES;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error('Storage parse error', e);
    return INITIAL_SEED_ENTRIES;
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
      localStorage.setItem(STORAGE_KEYS.QR_ANALYTICS, JSON.stringify(INITIAL_QR_ANALYTICS));
      return INITIAL_QR_ANALYTICS;
    }
    return JSON.parse(raw);
  } catch (e) {
    return INITIAL_QR_ANALYTICS;
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
    try {
      localStorage.setItem(STORAGE_KEYS.QR_ANALYTICS, JSON.stringify(analytics));
    } catch (e) {
      console.error('Failed to record QR entry', e);
    }
  }
}

export function addEntryToStorage(formData) {
  const entries = getStoredEntries();
  
  // Clean phone number for duplicate checking
  const cleanPhone = formData.phone.replace(/\D/g, '').slice(-10);
  const existing = entries.find(e => e.phone.replace(/\D/g, '').slice(-10) === cleanPhone);
  
  if (existing) {
    return {
      success: false,
      isDuplicate: true,
      entry: existing,
      message: `You have already entered with this mobile number! Your Entry ID is ${existing.entryId}.`
    };
  }
  
  // Generate sequential next Entry ID
  const nextSeq = 1284 + entries.length + 1;
  const newEntryId = generateEntryId(nextSeq);
  
  // Check if referred by someone
  let updatedReferredBy = formData.referredBy || '';
  if (updatedReferredBy && updatedReferredBy !== newEntryId) {
    const referrerIndex = entries.findIndex(e => e.entryId === updatedReferredBy || e.referralCode === updatedReferredBy);
    if (referrerIndex !== -1) {
      const currentCount = entries[referrerIndex].referralCount || 0;
      if (currentCount < 5) {
        entries[referrerIndex].referralCount = currentCount + 1;
      }
    }
  }

  const newEntry = {
    entryId: newEntryId,
    fullName: formData.fullName.trim(),
    phone: formData.phone.trim(),
    email: formData.email?.trim() || '',
    location: formData.location.trim(),
    service: formData.service || 'Travel',
    consent: Boolean(formData.consent),
    qrSource: formData.qrSource || 'direct-web',
    referralCode: newEntryId,
    referredBy: updatedReferredBy,
    referralCount: 0,
    timestamp: new Date().toISOString(),
    status: 'Verified'
  };

  entries.unshift(newEntry);
  
  try {
    localStorage.setItem(STORAGE_KEYS.ENTRIES, JSON.stringify(entries));
    saveMyEntry(newEntry);
    recordQrEntry(formData.qrSource);
  } catch (e) {
    console.error('Failed to persist new entry', e);
  }

  return {
    success: true,
    isDuplicate: false,
    entry: newEntry,
    totalEntries: 1284 + entries.length
  };
}

export function deleteEntryFromStorage(entryId) {
  try {
    const entries = getStoredEntries();
    const updated = entries.filter(e => e.entryId !== entryId);
    localStorage.setItem(STORAGE_KEYS.ENTRIES, JSON.stringify(updated));
    
    // Also remove from myEntry if it matched
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

export function deleteMultipleEntriesFromStorage(entryIds) {
  try {
    const idSet = new Set(entryIds);
    const entries = getStoredEntries();
    const updated = entries.filter(e => !idSet.has(e.entryId));
    localStorage.setItem(STORAGE_KEYS.ENTRIES, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Failed to delete multiple entries', e);
    return getStoredEntries();
  }
}

export function getScriptUrlConfig() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CONFIG);
    if (raw) {
      const parsed = JSON.parse(raw);
      return parsed.scriptUrl || import.meta.env.VITE_GOOGLE_SCRIPT_URL || '';
    }
    return import.meta.env.VITE_GOOGLE_SCRIPT_URL || '';
  } catch (e) {
    return '';
  }
}

export function saveScriptUrlConfig(url) {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CONFIG) || '{}';
    const parsed = JSON.parse(raw);
    parsed.scriptUrl = url.trim();
    localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(parsed));
  } catch (e) {
    console.error('Failed to save config', e);
  }
}
