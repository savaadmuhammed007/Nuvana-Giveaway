import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  getStoredEntries, 
  getMyEntry, 
  getQrAnalytics, 
  recordQrScan, 
  getScriptUrlConfig, 
  saveScriptUrlConfig,
  deleteEntryFromStorage,
  deleteMultipleEntriesFromStorage
} from '../services/storage';
import { submitGiveawayEntry } from '../services/googleSheets';

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

    // 2. Load stored entries, active entry, and analytics
    const storedEntries = getStoredEntries();
    setEntries(storedEntries);
    const activeMyEntry = getMyEntry();
    setMyEntry(activeMyEntry);
    setQrAnalyticsState(getQrAnalytics());
    setGoogleScriptUrl(getScriptUrlConfig());

    // 3. Setup realistic live social proof ticker interval
    const recentSampleNames = [
      { name: 'Nitheesh K.', place: 'Keecheri', service: 'GCC Cargo' },
      { name: 'Fathima Zahra', place: 'Pappinisseri Town', service: 'Dubai Visa' },
      { name: 'Sujith Kumar', place: 'Kalliasseri', service: 'Flight Ticket' },
      { name: 'Arjun V.', place: 'Aaron', service: 'Europe Tour Package' },
      { name: 'Ramees K. P.', place: 'Dharmasala', service: 'Express Courier' },
      { name: 'Ananya S.', place: 'Valapattanam', service: 'Family Holiday' }
    ];

    let tickerIndex = 0;
    const tickerInterval = setInterval(() => {
      const sample = recentSampleNames[tickerIndex % recentSampleNames.length];
      setRecentNotification({
        id: Date.now(),
        name: sample.name,
        place: sample.place,
        service: sample.service,
        time: 'Just now'
      });
      tickerIndex++;

      setTimeout(() => {
        setRecentNotification(null);
      }, 5000);
    }, 14000);

    return () => clearInterval(tickerInterval);
  }, []);

  const showToast = (message, type = 'info') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => setToast(null), 4500);
  };

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
      qrSource: qrSource || 'direct-web',
      referredBy: referredBy || ''
    };

    const result = await submitGiveawayEntry(payload);
    
    // Refresh state
    setEntries(getStoredEntries());
    setQrAnalyticsState(getQrAnalytics());
    
    if (result.isDuplicate) {
      setMyEntry(result.entry);
      showToast(result.message, 'warning');
      setIsGiveawayOpen(false);
      setIsSuccessOpen(true);
      return result;
    }

    if (result.success) {
      setMyEntry(result.entry);
      setIsGiveawayOpen(false);
      setIsSuccessOpen(true);
      showToast('🎉 Giveaway entry submitted successfully! Good luck!', 'success');
      return result;
    }

    showToast('Something went wrong. Please try again.', 'error');
    return result;
  };

  const deleteEntry = (entryId) => {
    const updated = deleteEntryFromStorage(entryId);
    setEntries(updated);
    setMyEntry(getMyEntry());
    showToast(`Entry ${entryId} deleted successfully.`, 'info');
  };

  const deleteMultipleEntries = (entryIds) => {
    const updated = deleteMultipleEntriesFromStorage(entryIds);
    setEntries(updated);
    setMyEntry(getMyEntry());
    showToast(`${entryIds.length} entries deleted successfully.`, 'info');
  };

  const updateScriptUrl = (url) => {
    saveScriptUrlConfig(url);
    setGoogleScriptUrl(url);
    showToast('Google Sheet Webhook URL saved successfully!', 'success');
  };

  const exportEntriesCSV = () => {
    const data = getStoredEntries();
    if (!data.length) {
      showToast('No entries to export', 'warning');
      return;
    }

    const headers = [
      'Timestamp', 'Entry ID', 'Full Name', 'WhatsApp Number', 
      'Email', 'Location', 'Interested Service', 'Consent', 
      'Referral Code', 'Referred By', 'Referrals Made', 'QR Source', 'Status'
    ];

    const csvRows = [headers.join(',')];

    data.forEach(row => {
      const values = [
        `"${row.timestamp || ''}"`,
        `"${row.entryId || ''}"`,
        `"${(row.fullName || '').replace(/"/g, '""')}"`,
        `"${row.phone || ''}"`,
        `"${row.email || ''}"`,
        `"${(row.location || '').replace(/"/g, '""')}"`,
        `"${row.service || ''}"`,
        `"${row.consent ? 'YES' : 'NO'}"`,
        `"${row.referralCode || ''}"`,
        `"${row.referredBy || ''}"`,
        `"${row.referralCount || 0}"`,
        `"${row.qrSource || ''}"`,
        `"${row.status || 'Active'}"`
      ];
      csvRows.push(values.join(','));
    });

    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Nuvana_Pappinisseri_Entries_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Campaign entries exported as CSV!', 'success');
  };

  return (
    <CampaignContext.Provider
      value={{
        currentRoute,
        navigateTo,
        qrSource,
        referredBy,
        myEntry,
        entries,
        totalCount: 1284 + entries.length,
        qrAnalytics,
        googleScriptUrl,
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
        exportEntriesCSV,
        showToast
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
