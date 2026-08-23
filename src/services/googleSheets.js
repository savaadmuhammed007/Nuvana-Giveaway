/**
 * Google Sheets API Integration Service
 * Dispatches form entries and delete requests to Google Apps Script Web App endpoint.
 */

import { addEntryToStorage, getScriptUrlConfig } from './storage';

const DEFAULT_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwtQxwaLr-dOkQOTkXiCkMaw1fRziO0UelG7zVEa_AbxhtRFYAxy4jjz-v1LHaxGBOJ/exec';

export async function submitGiveawayEntry(formData) {
  const configuredUrl = getScriptUrlConfig();
  const scriptUrl = (configuredUrl && configuredUrl.trim()) || import.meta.env.VITE_GOOGLE_SCRIPT_URL || DEFAULT_SCRIPT_URL;

  // 1. Save locally for instant UI responsiveness & offline safety
  const localResult = addEntryToStorage(formData);
  
  if (localResult.isDuplicate) {
    return localResult;
  }

  // 2. Prepare payload for Google Sheets
  const payload = {
    timestamp: new Date().toISOString(),
    entryId: localResult.entry.entryId,
    fullName: formData.fullName || '',
    phone: formData.phone || '',
    email: formData.email || '',
    location: formData.location || '',
    service: formData.service || '',
    consent: formData.consent ? 'YES' : 'NO',
    referralCode: localResult.entry.entryId,
    referredBy: formData.referredBy || '',
    qrSource: formData.qrSource || 'direct-web',
    device: typeof navigator !== 'undefined' ? navigator.userAgent : 'Web Browser',
    entryStatus: 'Active'
  };

  // 3. Dispatch to Google Apps Script Web App
  if (scriptUrl && scriptUrl.startsWith('https://script.google.com/')) {
    try {
      const formParams = new URLSearchParams();
      Object.entries(payload).forEach(([k, v]) => {
        formParams.append(k, String(v));
      });

      await fetch(scriptUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
        body: formParams.toString()
      });

      console.log('✅ Form submission dispatched to Google Sheet:', payload.entryId);
      return {
        ...localResult,
        syncedToSheets: true
      };
    } catch (err) {
      console.warn('Google Sheets dispatch attempt failed, data preserved locally:', err);
      return {
        ...localResult,
        syncedToSheets: false,
        warning: 'Entry saved locally and queued for sheet synchronization.'
      };
    }
  }

  return {
    ...localResult,
    syncedToSheets: false
  };
}

export async function fetchGoogleSheetsEntries() {
  const configuredUrl = getScriptUrlConfig();
  const scriptUrl = (configuredUrl && configuredUrl.trim()) || import.meta.env.VITE_GOOGLE_SCRIPT_URL || DEFAULT_SCRIPT_URL;

  if (!scriptUrl || !scriptUrl.startsWith('https://script.google.com/')) {
    return { success: false, entries: [], totalEntries: 0 };
  }

  try {
    const res = await fetch(scriptUrl);
    const data = await res.json();
    if (data.status === 'success') {
      const entries = Array.isArray(data.entries) ? data.entries : [];
      const totalEntries = typeof data.totalEntries === 'number' ? data.totalEntries : entries.length;
      return {
        success: true,
        entries,
        totalEntries,
        hasDetailedEntries: Array.isArray(data.entries) && data.entries.length > 0
      };
    }
    return { success: false, entries: [], totalEntries: 0 };
  } catch (err) {
    console.warn('Failed to fetch from Google Sheets endpoint:', err);
    return { success: false, entries: [], totalEntries: 0 };
  }
}

export async function deleteEntryFromGoogleSheets(entryId) {
  const configuredUrl = getScriptUrlConfig();
  const scriptUrl = (configuredUrl && configuredUrl.trim()) || import.meta.env.VITE_GOOGLE_SCRIPT_URL || DEFAULT_SCRIPT_URL;

  if (scriptUrl && scriptUrl.startsWith('https://script.google.com/')) {
    try {
      const formParams = new URLSearchParams();
      formParams.append('action', 'delete');
      formParams.append('entryId', entryId);

      await fetch(scriptUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
        body: formParams.toString()
      });
      console.log('✅ Delete dispatched to Google Sheet for Entry:', entryId);
    } catch (err) {
      console.warn('Google Sheets delete dispatch warning:', err);
    }
  }
}
