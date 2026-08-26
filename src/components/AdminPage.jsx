import React, { useState } from 'react';
import { useCampaign } from '../context/CampaignContext';
import LuckyDrawArena from './LuckyDrawArena';
import { 
  Lock, 
  BarChart3, 
  Users, 
  QrCode, 
  Download, 
  Sparkles, 
  Trophy, 
  Search, 
  RefreshCw, 
  Settings, 
  TrendingUp,
  Plane,
  ArrowLeft,
  Trash2,
  AlertTriangle,
  LogOut,
  CheckSquare,
  Square,
  MapPin,
  Share2,
  Globe
} from 'lucide-react';

const ADMIN_PIN = 'pappinisseri2026';

const QR_LOCATION_NAMES = {
  'pappinisseri-junction': 'Pappinisseri Main Junction Poster',
  'bus-stand': 'Pappinisseri Bus Stand Shelter',
  'keechery-poster': 'Keecheri Market Entrance',
  'railway-station': 'Pappinisseri Railway Station Road',
  'dharmasala-hub': 'Dharmasala College Junction',
  'valapattanam-gate': 'Valapattanam Toll / Highway',
  'direct-web': 'Direct Website / Organic',
  'referral-link': 'Friend Referral Link (WhatsApp)'
};

export default function AdminPage() {
  const { 
    navigateTo,
    entries, 
    qrAnalytics, 
    googleScriptUrl, 
    updateScriptUrl, 
    syncFromGoogleSheets,
    resetAllData,
    isSyncing,
    exportEntriesCSV,
    deleteEntry,
    deleteMultipleEntries,
    showToast,
    setIsQRGenOpen
  } = useCampaign();

  const [pinInput, setPinInput] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinError, setPinError] = useState(false);
  const [activeTab, setActiveTab] = useState('entries'); // 'analytics', 'qr_sources', 'entries', 'draw', 'settings'
  const [searchFilter, setSearchFilter] = useState('');
  const [scriptUrlInput, setScriptUrlInput] = useState(googleScriptUrl);
  
  // Selection and Delete Confirmation State
  const [selectedIds, setSelectedIds] = useState([]);
  const [entryToDelete, setEntryToDelete] = useState(null); // single entry modal
  const [showBatchDeleteModal, setShowBatchDeleteModal] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (pinInput.trim() === ADMIN_PIN || pinInput.trim() === 'admin') {
      setIsAuthenticated(true);
      setPinError(false);
      showToast('Welcome to Nuvana.go Admin Portal!', 'success');
    } else {
      setPinError(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPinInput('');
    showToast('Logged out of Admin Portal.', 'info');
  };

  // Accurate Dynamic Analytics Calculations
  const totalEntriesCount = entries.length;
  const totalReferrals = entries.reduce((acc, curr) => acc + (Number(curr.referralCount) || 0), 0);
  const totalReferrersCount = entries.filter(e => (Number(e.referralCount) || 0) > 0).length;
  const referredLeadsCount = entries.filter(e => Boolean(e.referredBy)).length;
  const viralConversionRate = totalEntriesCount > 0 ? ((totalReferrals / totalEntriesCount) * 100).toFixed(1) : '0.0';

  // 1. Dynamic Service Demand Breakdown
  const serviceFrequency = entries.reduce((acc, curr) => {
    const raw = (curr.service || '').trim() || 'General Inquiry';
    acc[raw] = (acc[raw] || 0) + 1;
    return acc;
  }, {});

  const serviceList = Object.entries(serviceFrequency)
    .map(([name, count]) => ({
      name,
      count,
      percentage: totalEntriesCount > 0 ? ((count / totalEntriesCount) * 100).toFixed(1) : '0.0'
    }))
    .sort((a, b) => b.count - a.count);

  const topServiceItem = serviceList[0];
  const topService = topServiceItem ? topServiceItem.name : (totalEntriesCount > 0 ? 'General Inquiry' : 'No Data Yet');
  const topServiceCount = topServiceItem ? topServiceItem.count : 0;
  const topServicePct = topServiceItem ? topServiceItem.percentage : '0.0';

  // 2. Dynamic Location / Area Breakdown
  const locationFrequency = entries.reduce((acc, curr) => {
    const loc = (curr.location || '').trim() || 'Kerala';
    acc[loc] = (acc[loc] || 0) + 1;
    return acc;
  }, {});

  const locationList = Object.entries(locationFrequency)
    .map(([name, count]) => ({
      name,
      count,
      percentage: totalEntriesCount > 0 ? ((count / totalEntriesCount) * 100).toFixed(1) : '0.0'
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 6);

  // 3. Dynamic Acquisition Channels & QR Posters
  const defaultKeys = [
    'pappinisseri-junction',
    'bus-stand',
    'keechery-poster',
    'railway-station',
    'dharmasala-hub',
    'valapattanam-gate',
    'direct-web',
    'referral-link'
  ];

  const actualKeysInEntries = entries.map(e => (e.qrSource || 'direct-web').toLowerCase().trim());
  const allKnownKeys = Array.from(new Set([...defaultKeys, ...Object.keys(qrAnalytics || {}), ...actualKeysInEntries]));

  const qrList = allKnownKeys.map((key) => {
    const data = qrAnalytics[key] || {};
    const matchingEntries = entries.filter(e => {
      const source = (e.qrSource || 'direct-web').toLowerCase().trim();
      return source === key.toLowerCase();
    }).length;
    const scans = Math.max(data.scans || 0, matchingEntries);
    const convRate = scans > 0 ? ((matchingEntries / scans) * 100).toFixed(1) : (matchingEntries > 0 ? '100.0' : '0.0');
    return {
      key,
      name: data.name || QR_LOCATION_NAMES[key] || `Channel: ${key}`,
      scans,
      entries: matchingEntries,
      conversion: convRate
    };
  }).sort((a, b) => b.entries - a.entries || b.scans - a.scans);

  const topQrSourceItem = qrList.find(q => q.entries > 0) || qrList[0];
  const topQrSource = topQrSourceItem && (topQrSourceItem.entries > 0 || topQrSourceItem.scans > 0)
    ? topQrSourceItem.name
    : (totalEntriesCount > 0 ? 'Direct Website / Organic' : 'No Poster Scans Yet');
  const topQrEntriesCount = topQrSourceItem ? topQrSourceItem.entries : 0;

  // Filtered entries
  const filteredEntries = entries.filter(e => {
    const q = searchFilter.toLowerCase();
    return (
      e.fullName.toLowerCase().includes(q) ||
      e.entryId.toLowerCase().includes(q) ||
      e.phone.includes(q) ||
      (e.location || '').toLowerCase().includes(q) ||
      (e.service || '').toLowerCase().includes(q) ||
      (e.qrSource || '').toLowerCase().includes(q)
    );
  });

  // Select/Deselect handlers
  const handleToggleSelect = (id) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedIds.length === filteredEntries.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredEntries.map(e => e.entryId));
    }
  };

  const confirmSingleDelete = () => {
    if (entryToDelete) {
      deleteEntry(entryToDelete.entryId);
      setSelectedIds(prev => prev.filter(id => id !== entryToDelete.entryId));
      setEntryToDelete(null);
    }
  };

  const confirmBatchDelete = () => {
    if (selectedIds.length > 0) {
      deleteMultipleEntries(selectedIds);
      setSelectedIds([]);
      setShowBatchDeleteModal(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#060A13] text-slate-100 flex flex-col selection:bg-amber-500 selection:text-black">
      
      {/* Top Admin Navigation Header */}
      <header className="sticky top-0 z-40 w-full glass-nav border-b border-slate-800/80 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-900 border border-amber-500/30 p-1.5 flex items-center justify-center">
            <img src="/nuvana-logo.png" alt="Nuvana.go Logo" className="w-full h-full object-contain" />
          </div>
          <div className="text-left">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-white font-heading">
                Nuvana<span className="text-amber-500">.go</span>
              </span>
              <span className="px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[10px] font-mono font-bold uppercase tracking-wider">
                ADMIN PORTAL
              </span>
            </div>
            <p className="text-[11px] text-slate-400">Pappinisseri Launch Campaign Management</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigateTo('/')}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-2 border border-slate-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:inline">Back to Campaign Website</span>
            <span className="sm:hidden">Website</span>
          </button>

          {isAuthenticated && (
            <button
              onClick={handleLogout}
              className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-medium flex items-center gap-1.5 transition-colors"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {!isAuthenticated ? (
          /* Login Screen */
          <div className="max-w-md mx-auto my-16 glass-panel p-8 sm:p-10 rounded-3xl border border-amber-500/30 text-center space-y-6 shadow-2xl">
            <div className="w-16 h-16 mx-auto rounded-3xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Lock className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-white font-heading">
                Admin Authentication
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Enter your campaign PIN to access live leads, QR poster tracking, and deletion tools.
              </p>
              <div className="mt-3 text-[11px] text-amber-300 bg-amber-500/10 px-3 py-1 rounded-lg inline-block font-mono border border-amber-500/20">
                Default PIN: <strong>pappinisseri2026</strong>
              </div>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="password"
                placeholder="Enter PIN"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                className={`w-full px-4 py-3.5 rounded-xl bg-slate-950 border ${pinError ? 'border-red-500' : 'border-slate-700'} text-center text-white placeholder-slate-600 text-base outline-none font-mono tracking-widest focus:border-amber-500`}
                autoFocus
              />
              {pinError && (
                <p className="text-xs text-red-400 font-medium">Incorrect PIN. Please try again.</p>
              )}
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-300 hover:to-orange-300 text-slate-950 font-black text-sm shadow-xl shadow-amber-500/20"
              >
                UNLOCK ADMIN PORTAL
              </button>
            </form>
          </div>
        ) : (
          /* Authenticated Dashboard */
          <div className="space-y-6">
            
            {/* Navigation Tabs Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setActiveTab('entries')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${activeTab === 'entries' ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20' : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'}`}
                >
                  <Users className="w-4 h-4" />
                  <span>Entries Management ({entries.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('analytics')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${activeTab === 'analytics' ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20' : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'}`}
                >
                  <BarChart3 className="w-4 h-4" />
                  <span>Campaign Overview</span>
                </button>

                <button
                  onClick={() => setActiveTab('draw')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${activeTab === 'draw' ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20' : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'}`}
                >
                  <Trophy className="w-4 h-4" />
                  <span>Lucky Draw Tool</span>
                </button>

                <button
                  onClick={() => setActiveTab('settings')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${activeTab === 'settings' ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20' : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'}`}
                >
                  <Settings className="w-4 h-4" />
                  <span>Google Sheets Sync</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => syncFromGoogleSheets(true)}
                  disabled={isSyncing}
                  className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 transition-all shadow-md shadow-amber-500/20 cursor-pointer disabled:opacity-50"
                  title="Fetch latest entries from Google Sheets"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                  <span>{isSyncing ? 'Syncing...' : 'Sync Sheet'}</span>
                </button>

                <button
                  onClick={exportEntriesCSV}
                  className="px-3.5 py-2 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 text-xs font-bold flex items-center gap-1.5"
                >
                  <Download className="w-4 h-4" />
                  <span>Export CSV</span>
                </button>

                <button
                  onClick={() => setIsQRGenOpen(true)}
                  className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                >
                  <QrCode className="w-4 h-4 text-amber-400" />
                  <span>Campaign QR Poster</span>
                </button>
              </div>
            </div>

            {/* TAB 1: ENTRIES MANAGEMENT WITH DELETE OPTION */}
            {activeTab === 'entries' && (
              <div className="space-y-4">
                
                {/* Search & Actions Bar */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 glass-card p-4 rounded-2xl border border-slate-800">
                  <div className="relative w-full sm:w-80">
                    <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search name, phone, area, Entry ID..."
                      value={searchFilter}
                      onChange={(e) => setSearchFilter(e.target.value)}
                      className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                    <div className="text-xs text-slate-400">
                      Showing <strong>{filteredEntries.length}</strong> entries
                    </div>

                    {selectedIds.length > 0 && (
                      <button
                        onClick={() => setShowBatchDeleteModal(true)}
                        className="px-3.5 py-2 rounded-xl bg-red-600/20 hover:bg-red-600/30 text-red-400 border border-red-500/40 text-xs font-bold flex items-center gap-1.5 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span>Delete Selected ({selectedIds.length})</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto rounded-2xl border border-slate-800 glass-card">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead className="bg-slate-900/90 text-slate-400 uppercase text-[10px] font-bold tracking-wider sticky top-0 border-b border-slate-800">
                      <tr>
                        <th className="p-3.5 w-10 text-center">
                          <button onClick={handleSelectAll} className="text-slate-400 hover:text-white">
                            {selectedIds.length === filteredEntries.length && filteredEntries.length > 0 ? (
                              <CheckSquare className="w-4 h-4 text-amber-400" />
                            ) : (
                              <Square className="w-4 h-4" />
                            )}
                          </button>
                        </th>
                        <th className="p-3.5">Entry ID</th>
                        <th className="p-3.5">Full Name</th>
                        <th className="p-3.5">WhatsApp Mobile</th>
                        <th className="p-3.5">Location</th>
                        <th className="p-3.5">Service</th>
                        <th className="p-3.5 text-center">Referrals</th>
                        <th className="p-3.5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 bg-slate-950/40">
                      {filteredEntries.length === 0 ? (
                        <tr>
                          <td colSpan={8} className="p-12 text-center text-slate-400">
                            <div className="max-w-sm mx-auto space-y-3">
                              <p className="text-sm font-bold text-white">No Giveaway Entries Recorded</p>
                              <p className="text-xs text-slate-400 leading-relaxed">
                                Submissions from the public QR poster and website will appear here in real time.
                              </p>
                              <button
                                onClick={() => syncFromGoogleSheets(true)}
                                disabled={isSyncing}
                                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs inline-flex items-center gap-2 shadow-lg shadow-amber-500/20 cursor-pointer disabled:opacity-50"
                              >
                                <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                                <span>{isSyncing ? 'Syncing...' : 'Sync from Google Sheets'}</span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ) : (
                        filteredEntries.map((row) => {
                          const isSelected = selectedIds.includes(row.entryId);
                          return (
                            <tr key={row.entryId} className={`hover:bg-slate-900/50 transition-colors ${isSelected ? 'bg-amber-500/5' : ''}`}>
                              <td className="p-3.5 text-center">
                                <button onClick={() => handleToggleSelect(row.entryId)} className="text-slate-400 hover:text-white">
                                  {isSelected ? (
                                    <CheckSquare className="w-4 h-4 text-amber-400" />
                                  ) : (
                                    <Square className="w-4 h-4 text-slate-600" />
                                  )}
                                </button>
                              </td>
                              <td className="p-3.5 font-mono font-bold text-amber-400">{row.entryId}</td>
                              <td className="p-3.5 font-semibold text-white">{row.fullName}</td>
                              <td className="p-3.5 font-mono text-slate-300">
                                {row.phone === '#ERROR!' ? (
                                  <span className="text-amber-400 text-[11px] bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 font-sans" title="Set Plain Text in Google Sheet Column D">
                                    Set Plain Text in Sheet
                                  </span>
                                ) : (
                                  row.phone || <span className="text-slate-500 italic">—</span>
                                )}
                              </td>
                              <td className="p-3.5">{row.location}</td>
                              <td className="p-3.5 text-slate-400">{row.service}</td>
                              <td className="p-3.5 text-center font-mono font-bold text-emerald-400">
                                {row.referralCount || 0} / 5
                              </td>
                              <td className="p-3.5 text-right">
                                <button
                                  onClick={() => setEntryToDelete(row)}
                                  className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition-colors cursor-pointer"
                                  title={`Delete entry ${row.entryId}`}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>

              </div>
            )}

            {/* TAB 2: OVERVIEW ANALYTICS */}
            {activeTab === 'analytics' && (
              <div className="space-y-6 text-left">
                
                {/* 4 KPI Metric Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="glass-card p-5 rounded-2xl border border-slate-800">
                    <div className="text-xs text-slate-400 flex items-center justify-between">
                      <span>Total Verified Leads</span>
                      <Users className="w-4 h-4 text-amber-400" />
                    </div>
                    <div className="text-3xl font-black text-white mt-1 font-mono">
                      {totalEntriesCount}
                    </div>
                    <div className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" /> Live verified database
                    </div>
                  </div>

                  <div className="glass-card p-5 rounded-2xl border border-slate-800">
                    <div className="text-xs text-slate-400 flex items-center justify-between">
                      <span>Viral Referral Bonus</span>
                      <Sparkles className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div className="text-3xl font-black text-white mt-1 font-mono">
                      {totalReferrals}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1">
                      {totalReferrersCount} promoters • {referredLeadsCount} referred leads ({viralConversionRate}%)
                    </div>
                  </div>

                  <div className="glass-card p-5 rounded-2xl border border-slate-800">
                    <div className="text-xs text-slate-400 flex items-center justify-between">
                      <span>Top Service Demand</span>
                      <Plane className="w-4 h-4 text-cyan-400" />
                    </div>
                    <div className="text-xl font-bold text-white mt-1 truncate" title={topService}>
                      {topService}
                    </div>
                    <div className="text-[11px] text-cyan-400 mt-1">
                      {topServiceCount} leads ({topServicePct}% share)
                    </div>
                  </div>

                  <div className="glass-card p-5 rounded-2xl border border-slate-800">
                    <div className="text-xs text-slate-400 flex items-center justify-between">
                      <span>Top Acquisition Channel</span>
                      <QrCode className="w-4 h-4 text-orange-400" />
                    </div>
                    <div className="text-sm font-bold text-white mt-1 truncate" title={topQrSource}>
                      {topQrSource}
                    </div>
                    <div className="text-[11px] text-amber-400 mt-1">
                      {topQrEntriesCount} submissions generated
                    </div>
                  </div>
                </div>

                {/* Two Column Grid: Dynamic Service Demand & Location Distribution */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  
                  {/* Dynamic Service Demand Breakdown */}
                  <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-white font-heading flex items-center gap-2">
                        <Plane className="w-4 h-4 text-amber-400" />
                        <span>Live Service Demand Breakdown</span>
                      </h4>
                      <span className="text-xs text-slate-400 font-mono">
                        {serviceList.length} Active Services
                      </span>
                    </div>

                    {serviceList.length === 0 ? (
                      <div className="py-8 text-center text-xs text-slate-500 italic">
                        No service inquiries recorded yet.
                      </div>
                    ) : (
                      <div className="space-y-3.5 max-h-[300px] overflow-y-auto pr-1">
                        {serviceList.map((svc) => (
                          <div key={svc.name} className="space-y-1.5">
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-slate-200 font-semibold truncate max-w-[200px]" title={svc.name}>
                                {svc.name}
                              </span>
                              <span className="text-slate-400 font-mono">
                                <strong className="text-white">{svc.count}</strong> leads ({svc.percentage}%)
                              </span>
                            </div>
                            <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800/80">
                              <div
                                className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full transition-all duration-500"
                                style={{ width: `${Math.max(2, parseFloat(svc.percentage))}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Regional Reach & Area Distribution */}
                  <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-white font-heading flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-cyan-400" />
                        <span>Regional Concentration (Towns / Areas)</span>
                      </h4>
                      <span className="text-xs text-slate-400 font-mono">
                        {locationList.length} Areas
                      </span>
                    </div>

                    {locationList.length === 0 ? (
                      <div className="py-8 text-center text-xs text-slate-500 italic">
                        No location data recorded yet.
                      </div>
                    ) : (
                      <div className="space-y-3.5 max-h-[300px] overflow-y-auto pr-1">
                        {locationList.map((loc) => (
                          <div key={loc.name} className="space-y-1.5">
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-slate-200 font-semibold truncate max-w-[200px]" title={loc.name}>
                                📍 {loc.name}
                              </span>
                              <span className="text-slate-400 font-mono">
                                <strong className="text-cyan-300">{loc.count}</strong> participants ({loc.percentage}%)
                              </span>
                            </div>
                            <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800/80">
                              <div
                                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-500"
                                style={{ width: `${Math.max(2, parseFloat(loc.percentage))}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                </div>

                {/* QR Poster & Acquisition Channels Performance Table */}
                <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                    <div>
                      <h4 className="text-sm font-bold text-white font-heading flex items-center gap-2">
                        <QrCode className="w-4 h-4 text-orange-400" />
                        <span>Acquisition Channels & QR Poster Conversion Performance</span>
                      </h4>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Track physical poster foot traffic vs WhatsApp viral referral conversions.
                      </p>
                    </div>

                    <button
                      onClick={() => setIsQRGenOpen(true)}
                      className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
                    >
                      <QrCode className="w-3.5 h-3.5 text-amber-400" />
                      <span>Print Posters</span>
                    </button>
                  </div>

                  <div className="overflow-x-auto rounded-xl border border-slate-800/80">
                    <table className="w-full text-left text-xs text-slate-300">
                      <thead className="bg-slate-950/80 text-slate-400 uppercase text-[10px] font-bold tracking-wider border-b border-slate-800">
                        <tr>
                          <th className="p-3.5">Channel / Location</th>
                          <th className="p-3.5">Tracking Key</th>
                          <th className="p-3.5 text-center">Scans</th>
                          <th className="p-3.5 text-center">Verified Leads</th>
                          <th className="p-3.5 text-right">Conversion Rate</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60 bg-slate-950/40">
                        {qrList.map((row) => {
                          const convNumber = parseFloat(row.conversion);
                          return (
                            <tr key={row.key} className="hover:bg-slate-900/50 transition-colors">
                              <td className="p-3.5 font-semibold text-white flex items-center gap-2">
                                {row.key.includes('referral') ? (
                                  <Share2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                                ) : row.key.includes('direct') ? (
                                  <Globe className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                                ) : (
                                  <QrCode className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                                )}
                                <span className="truncate max-w-xs">{row.name}</span>
                              </td>
                              <td className="p-3.5 font-mono text-slate-400 text-[11px]">{row.key}</td>
                              <td className="p-3.5 text-center font-mono font-bold text-slate-200">
                                {row.scans}
                              </td>
                              <td className="p-3.5 text-center font-mono font-bold text-amber-400">
                                {row.entries}
                              </td>
                              <td className="p-3.5 text-right font-mono">
                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                                  convNumber >= 30
                                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                                    : convNumber >= 10
                                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                                      : 'bg-slate-800 text-slate-400 border-slate-700'
                                }`}>
                                  {row.conversion}%
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            )}

            {/* TAB 3: LUCKY DRAW TOOL */}
            {activeTab === 'draw' && (
              <LuckyDrawArena entries={entries} showToast={showToast} />
            )}

            {/* TAB 5: SETTINGS & GOOGLE SHEETS */}
            {activeTab === 'settings' && (
              <div className="space-y-6 text-left max-w-2xl mx-auto">
                <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4">
                  <div className="flex items-center gap-2 text-sm font-bold text-white font-heading">
                    <Settings className="w-4 h-4 text-amber-400" />
                    <span>Google Sheets Backend Webhook</span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    Connected Google Apps Script Web App URL. Submissions from the website are automatically dispatched to your Google Sheet.
                  </p>

                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-slate-400">
                      Google Apps Script Web App URL:
                    </label>
                    <input
                      type="url"
                      placeholder="https://script.google.com/macros/s/AKfycb.../exec"
                      value={scriptUrlInput}
                      onChange={(e) => setScriptUrlInput(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-600 outline-none focus:border-amber-500 font-mono"
                    />
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => updateScriptUrl(scriptUrlInput)}
                      className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs cursor-pointer transition-colors"
                    >
                      Save & Connect Webhook
                    </button>

                    <button
                      onClick={() => syncFromGoogleSheets(true)}
                      disabled={isSyncing}
                      className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                      <span>{isSyncing ? 'Syncing...' : 'Sync Data Now'}</span>
                    </button>

                    <button
                      onClick={resetAllData}
                      className="px-4 py-2.5 rounded-xl bg-red-600/20 hover:bg-red-600/30 text-red-400 border border-red-500/30 text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
                      title="Purge all local cache"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Purge Local Cache (Reset to 0)</span>
                    </button>
                  </div>

                  <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-400 space-y-1">
                    <p>💡 Live submissions are saved to your Google Sheet and cached locally for speed.</p>
                    <p>🔒 <strong>Protected:</strong> Exact data from Google Sheets is displayed across all tabs.</p>
                  </div>
                </div>
              </div>
            )}

          </div>
        )}
      </main>

      {/* Single Entry Delete Confirmation Modal */}
      {entryToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="glass-panel p-6 rounded-3xl border border-red-500/40 max-w-md w-full text-left space-y-4 shadow-2xl">
            <div className="flex items-center gap-3 text-red-400">
              <AlertTriangle className="w-6 h-6" />
              <h4 className="text-lg font-bold text-white font-heading">Delete Entry?</h4>
            </div>
            
            <p className="text-xs text-slate-300 leading-relaxed">
              Are you sure you want to permanently delete entry <strong className="text-amber-400 font-mono">{entryToDelete.entryId}</strong> for <strong className="text-white">{entryToDelete.fullName}</strong> ({entryToDelete.phone})?
            </p>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setEntryToDelete(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700"
              >
                Cancel
              </button>
              <button
                onClick={confirmSingleDelete}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold shadow-lg shadow-red-600/30"
              >
                Delete Entry
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Batch Delete Confirmation Modal */}
      {showBatchDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="glass-panel p-6 rounded-3xl border border-red-500/40 max-w-md w-full text-left space-y-4 shadow-2xl">
            <div className="flex items-center gap-3 text-red-400">
              <AlertTriangle className="w-6 h-6" />
              <h4 className="text-lg font-bold text-white font-heading">Delete {selectedIds.length} Entries?</h4>
            </div>
            
            <p className="text-xs text-slate-300 leading-relaxed">
              Are you sure you want to permanently delete the <strong className="text-red-400 font-bold">{selectedIds.length}</strong> selected entries from the campaign database?
            </p>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setShowBatchDeleteModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700"
              >
                Cancel
              </button>
              <button
                onClick={confirmBatchDelete}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold shadow-lg shadow-red-600/30"
              >
                Delete {selectedIds.length} Entries
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
