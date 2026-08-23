import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  getStoredEntries, 
  saveStoredEntries,
  getMyEntry, 
  getQrAnalytics, 
  recordQrScan, 
  getScriptUrlConfig, 
  saveScriptUrlConfig,
  deleteEntryFromStorage,
  deleteMultipleEntriesFromStorage,
  clearAllDemoEntries
} from '../services/storage';
import { submitGiveawayEntry, deleteEntryFromGoogleSheets, fetchGoogleSheetsEntries } from '../services/googleSheets';

const CampaignContext = createContext();

function getRouteFromLocation() {
  if (typeof window === 'undefined') return 'home';
  const path = window.location.pathname.toLowerCase();
  const hash = window.location.hash.toLowerCase();
  const search = window.location.search.toLowerCase();

  if (path.startsWith('/admin') || hash.startsWith('#/admin') || hash === '#admin') {
    return 'admin';
  }
  if (path.startsWith('/giveaway') || hash.startsWith('#/giveaway') || hash === '#giveaway' || search.includes('giveaway=true') || search.includes('page=giveaway')) {
    return 'giveaway';
  }
  return 'home';
}

export function CampaignProvider({ children }) {
  const [currentRoute, setCurrentRoute] = useState(getRouteFromLocation());

  const [qrSource, setQrSource] = useState('pappinisseri-junction');
  const [referredBy, setReferredBy] = useState('');
  const [myEntry, setMyEntry] = useState(null);
  const [entries, setEntries] = useState([]);
  const [qrAnalytics, setQrAnalyticsState] = useState({});
  const [googleScriptUrl, setGoogleScriptUrl] = useState('');
  const [isSyncing, setIsSyncing] = useState(false);
  
  // Modals & UI states
  const [isGiveawayOpen, setIsGiveawayOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [isQRGenOpen, setIsQRGenOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [prefilledService, setPrefilledService] = useState('Travel');
  
  // Toasts & notifications
  const [toast, setToast] = useState(null);
  const [recentNotification, setRecentNotification] = useState(null);

  // Sync route on popstate / hashchange
  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentRoute(getRouteFromLocation());
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  const navigateTo = (path) => {
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', path);
      setCurrentRoute(getRouteFromLocation());
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const showToast = (message, type = 'info') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => setToast(null), 4500);
  };

  const [sheetTotalEntries, setSheetTotalEntries] = useState(0);

  // Sync entries from Google Sheets Web App
  const syncFromGoogleSheets = async (showNotifications = false) => {
    setIsSyncing(true);
    try {
      const result = await fetchGoogleSheetsEntries();
      if (result.success) {
        if (Array.isArray(result.entries) && result.entries.length > 0) {
          setEntries(result.entries);
          saveStoredEntries(result.entries);
        }
        if (typeof result.totalEntries === 'number') {
          setSheetTotalEntries(result.totalEntries);
        }
        if (showNotifications) {
          if (Array.isArray(result.entries) && result.entries.length > 0) {
            showToast(`Synced ${result.entries.length} live entries from Google Sheets!`, 'success');
          } else if (result.totalEntries > 0) {
            showToast(`Google Sheet has ${result.totalEntries} entries. Update & Deploy 'New Version' in Apps Script to view row details!`, 'info');
          } else {
            showToast('Google Sheet connection verified (0 entries).', 'info');
          }
        }
        return result;
      } else if (showNotifications) {
        showToast('Google Sheet connection verified.', 'info');
      }
    } catch (e) {
      console.warn('Sync warning:', e);
      if (showNotifications) {
        showToast('Could not fetch from Google Sheets.', 'warning');
      }
    } finally {
      setIsSyncing(false);
    }
  };

  // Initialize on mount
  useEffect(() => {
    // 1. Check URL parameters for ?source= and ?ref=
    const params = new URLSearchParams(window.location.search);
    const sourceParam = params.get('source');
    const refParam = params.get('ref');

    let currentSource = 'pappinisseri-junction';
    if (sourceParam) {
      currentSource = sourceParam.toLowerCase().trim();
      sessionStorage.setItem('nuvana_active_source', currentSource);
    } else {
      const cachedSource = sessionStorage.getItem('nuvana_active_source');
      if (cachedSource) currentSource = cachedSource;
    }
    setQrSource(currentSource);
    recordQrScan(currentSource);

    if (refParam) {
      const cleanRef = refParam.toUpperCase().trim();
      setReferredBy(cleanRef);
      sessionStorage.setItem('nuvana_referred_by', cleanRef);
    } else {
      const cachedRef = sessionStorage.getItem('nuvana_referred_by');
      if (cachedRef) setReferredBy(cachedRef);
    }

    // 2. Load stored local entries & configuration
    const storedEntries = getStoredEntries();
    setEntries(storedEntries);
    const activeMyEntry = getMyEntry();
    setMyEntry(activeMyEntry);
    setQrAnalyticsState(getQrAnalytics());
    setGoogleScriptUrl(getScriptUrlConfig());

    // 3. Attempt initial sync from Google Sheets
    syncFromGoogleSheets(false);
  }, []);

  const openGiveaway = (serviceName = 'Travel') => {
    setPrefilledService(serviceName);
    setIsGiveawayOpen(true);
  };

  const closeGiveaway = () => {
    setIsGiveawayOpen(false);
  };

  const openServiceDetails = (service) => {
    setSelectedService(service);
  };

  const closeServiceDetails = () => {
    setSelectedService(null);
  };

  const submitForm = async (formData) => {
    const payload = {
      ...formData,
      qrSource: formData.qrSource || qrSource,
      referredBy: formData.referredBy || referredBy
    };

    const result = await submitGiveawayEntry(payload);
    
    if (result.success || result.isDuplicate) {
      const updated = getStoredEntries();
      setEntries(updated);
      setMyEntry(result.entry);
      setQrAnalyticsState(getQrAnalytics());
      
      if (result.isDuplicate) {
        showToast(result.message, 'warning');
        setIsGiveawayOpen(false);
        setIsSuccessOpen(true);
      } else {
        showToast('You are officially entered into the Giveaway! 🎉', 'success');
        setIsGiveawayOpen(false);
        setIsSuccessOpen(true);
      }
    } else {
      showToast(result.message || 'Failed to submit entry. Please try again.', 'error');
    }

    return result;
  };

  const deleteEntry = async (entryId) => {
    const updated = deleteEntryFromStorage(entryId);
    setEntries(updated);
    if (myEntry && myEntry.entryId === entryId) {
      setMyEntry(null);
    }
    showToast(`Entry ${entryId} deleted.`, 'info');
    await deleteEntryFromGoogleSheets(entryId);
  };

  const deleteMultipleEntries = async (entryIds) => {
    const updated = deleteMultipleEntriesFromStorage(entryIds);
    setEntries(updated);
    if (myEntry && entryIds.includes(myEntry.entryId)) {
      setMyEntry(null);
    }
    showToast(`Deleted ${entryIds.length} entries.`, 'info');
    for (const id of entryIds) {
      await deleteEntryFromGoogleSheets(id);
    }
  };

  const updateScriptUrl = (url) => {
    saveScriptUrlConfig(url);
    setGoogleScriptUrl(url);
    showToast('Google Sheet Web App URL updated!', 'success');
    syncFromGoogleSheets(true);
  };

  const resetAllData = () => {
    clearAllDemoEntries();
    setEntries([]);
    setMyEntry(null);
    showToast('All local data has been reset to 0 entries.', 'info');
  };

  const exportEntriesCSV = () => {
    if (entries.length === 0) {
      showToast('No entries to export.', 'warning');
      return;
    }

    const headers = [
      'Entry ID',
      'Full Name',
      'Phone',
      'Email',
      'Location',
      'Service',
      'Consent',
      'Referral Code',
      'Referred By',
      'Referrals Count',
      'QR Source',
      'Date Submitted',
      'Status'
    ];

    const rows = entries.map(e => [
      e.entryId,
      `"${(e.fullName || '').replace(/"/g, '""')}"`,
      `"${e.phone}"`,
      `"${e.email || ''}"`,
      `"${e.location || ''}"`,
      `"${e.service || ''}"`,
      e.consent ? 'YES' : 'NO',
      e.referralCode || e.entryId,
      e.referredBy || '',
      e.referralCount || 0,
      e.qrSource || 'direct-web',
      e.timestamp ? new Date(e.timestamp).toLocaleString() : '',
      e.status || 'Verified'
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(r => r.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `nuvana_giveaway_entries_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Exported entries as CSV file!', 'success');
  };

  return (
    <CampaignContext.Provider
      value={{
        currentRoute,
        qrSource,
        referredBy,
        myEntry,
        entries,
        totalCount: Math.max(entries.length, sheetTotalEntries),
        qrAnalytics,
        googleScriptUrl,
        isSyncing,
        isGiveawayOpen,
        isSuccessOpen,
        isQRGenOpen,
        selectedService,
        prefilledService,
        toast,
        recentNotification,
        openGiveaway,
        closeGiveaway,
        setIsSuccessOpen,
        setIsQRGenOpen,
        openServiceDetails,
        closeServiceDetails,
        submitForm,
        deleteEntry,
        deleteMultipleEntries,
        updateScriptUrl,
        syncFromGoogleSheets,
        resetAllData,
        exportEntriesCSV,
        showToast,
        navigateTo
      }}
    >
      {children}
    </CampaignContext.Provider>
  );
}

export function useCampaign() {
  const context = useContext(CampaignContext);
  if (!context) {
    throw new Error('useCampaign must be used within a CampaignProvider');
  }
  return context;
}
