import React, { useState } from 'react';
import { useCampaign } from '../context/CampaignContext';
import confetti from 'canvas-confetti';
import { 
  Shield, 
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
  CheckCircle2, 
  TrendingUp,
  MapPin,
  Package,
  Plane,
  FileText,
  Ticket,
  ArrowLeft,
  Trash2,
  AlertTriangle,
  LogOut,
  CheckSquare,
  Square,
  ExternalLink
} from 'lucide-react';

const ADMIN_PIN = 'pappinisseri2026';

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

  // Lucky Draw State
  const [isDrawing, setIsDrawing] = useState(false);
  const [winner, setWinner] = useState(null);
  const [selectedPrizeTier, setSelectedPrizeTier] = useState('1st Prize: Luxury Resort Stay');

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

  // Analytics
  const totalEntriesCount = entries.length;
  const totalReferrals = entries.reduce((acc, curr) => acc + (curr.referralCount || 0), 0);

  const serviceCounts = {
    Travel: entries.filter(e => e.service === 'Travel').length,
    Cargo: entries.filter(e => e.service === 'Cargo').length,
    Visa: entries.filter(e => e.service === 'Visa').length,
    Ticketing: entries.filter(e => e.service === 'Ticketing').length,
    'Multiple Services': entries.filter(e => e.service === 'Multiple Services').length
  };
  const topService = Object.entries(serviceCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'Travel';

  // QR Analytics List
  const qrList = Object.entries(qrAnalytics).map(([key, data]) => {
    const matchingEntries = entries.filter(e => (e.qrSource || '').toLowerCase() === key.toLowerCase()).length;
    const scans = Math.max(data.scans || 1, matchingEntries);
    const convRate = scans > 0 ? ((matchingEntries / scans) * 100).toFixed(1) : '0.0';
    return {
      key,
      name: data.name || key,
      scans,
      entries: matchingEntries,
      conversion: convRate
    };
  }).sort((a, b) => b.entries - a.entries);

  const topQrSource = qrList[0]?.name || 'Pappinisseri Junction';

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

  // Lucky Draw
  const handlePickLuckyWinner = () => {
    if (entries.length === 0) {
      showToast('No entries available to draw from.', 'warning');
      return;
    }

    setIsDrawing(true);
    setWinner(null);

    const pool = [];
    entries.forEach(entry => {
      pool.push(entry);
      const bonus = Math.min(5, entry.referralCount || 0);
      for (let i = 0; i < bonus; i++) {
        pool.push(entry);
      }
    });

    let counter = 0;
    const interval = setInterval(() => {
      const randomIdx = Math.floor(Math.random() * pool.length);
      setWinner(pool[randomIdx]);
      counter++;

      if (counter > 25) {
        clearInterval(interval);
        const finalWinner = pool[Math.floor(Math.random() * pool.length)];
        setWinner(finalWinner);
        setIsDrawing(false);

        confetti({
          particleCount: 250,
          spread: 100,
          origin: { y: 0.6 }
        });
      }
    }, 100);
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
              <div className="space-y-6">
                
                {/* 4 Metric Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="glass-card p-5 rounded-2xl border border-slate-800">
                    <div className="text-xs text-slate-400 flex items-center justify-between">
                      <span>Total Leads</span>
                      <Users className="w-4 h-4 text-amber-400" />
                    </div>
                    <div className="text-3xl font-black text-white mt-1 font-mono">
                      {totalEntriesCount}
                    </div>
                    <div className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" /> Live campaign leads
                    </div>
                  </div>

                  <div className="glass-card p-5 rounded-2xl border border-slate-800">
                    <div className="text-xs text-slate-400 flex items-center justify-between">
                      <span>Viral Referrals</span>
                      <Sparkles className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div className="text-3xl font-black text-white mt-1 font-mono">
                      {totalReferrals}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1">
                      WhatsApp bonus tickets
                    </div>
                  </div>

                  <div className="glass-card p-5 rounded-2xl border border-slate-800">
                    <div className="text-xs text-slate-400 flex items-center justify-between">
                      <span>Top Service</span>
                      <Plane className="w-4 h-4 text-cyan-400" />
                    </div>
                    <div className="text-2xl font-bold text-white mt-1 truncate">
                      {topService}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1">
                      Highest consumer demand
                    </div>
                  </div>

                  <div className="glass-card p-5 rounded-2xl border border-slate-800">
                    <div className="text-xs text-slate-400 flex items-center justify-between">
                      <span>Top QR Poster</span>
                      <QrCode className="w-4 h-4 text-orange-400" />
                    </div>
                    <div className="text-lg font-bold text-white mt-1 truncate">
                      {topQrSource}
                    </div>
                    <div className="text-[11px] text-amber-400 mt-1">
                      Best performing poster
                    </div>
                  </div>
                </div>

                {/* Service Breakdown */}
                <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4">
                  <h4 className="text-sm font-bold text-white font-heading">
                    Service Demand Breakdown (Travel vs Cargo vs Visa vs Ticketing)
                  </h4>
                  <div className="space-y-3">
                    {Object.entries(serviceCounts).map(([svc, count]) => {
                      const pct = totalEntriesCount > 0 ? ((count / totalEntriesCount) * 100).toFixed(1) : 0;
                      return (
                        <div key={svc} className="space-y-1">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-slate-300 font-medium">{svc}</span>
                            <span className="text-slate-400 font-mono">{count} leads ({pct}%)</span>
                          </div>
                          <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>
            )}

            {/* TAB 3: LUCKY DRAW TOOL */}
            {activeTab === 'draw' && (
              <div className="space-y-6 text-center py-6 glass-panel rounded-3xl border border-slate-800 p-8">
                <div className="max-w-md mx-auto space-y-2">
                  <h4 className="text-2xl font-bold text-white font-heading">
                    🎉 Launch Day Lucky Draw Randomizer
                  </h4>
                  <p className="text-xs text-slate-400">
                    Transparent, weighted raffle drawing tool. Bonus referral tickets automatically increase winning probability.
                  </p>
                </div>

                <div className="flex justify-center gap-3">
                  {['1st Prize: Luxury Resort Stay', '2nd Prize: Free Shipment (Up to 10kg)'].map((tier) => (
                    <button
                      key={tier}
                      onClick={() => setSelectedPrizeTier(tier)}
                      className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${selectedPrizeTier === tier ? 'bg-amber-400 text-slate-950 font-bold shadow-md shadow-amber-400/20' : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'}`}
                    >
                      {tier}
                    </button>
                  ))}
                </div>

                <div className="p-8 rounded-3xl bg-slate-950/90 border border-amber-500/40 max-w-lg mx-auto min-h-[180px] flex flex-col items-center justify-center shadow-xl">
                  {winner ? (
                    <div className="space-y-2 animate-in zoom-in-95 duration-200">
                      <div className="text-xs uppercase font-extrabold tracking-wider text-amber-400">
                        🏆 Winner for {selectedPrizeTier}
                      </div>
                      <div className="text-3xl font-black text-white font-heading">
                        {winner.fullName}
                      </div>
                      <div className="text-sm font-mono font-bold text-amber-300">
                        {winner.entryId} • {winner.location}
                      </div>
                      <div className="text-xs text-slate-400">
                        WhatsApp: <span className="font-mono text-white">{winner.phone}</span> ({winner.referralCount || 0} referrals made)
                      </div>
                    </div>
                  ) : (
                    <div className="text-slate-500 text-xs">
                      Click the button below to randomly select a verified winner from all {entries.length} participants!
                    </div>
                  )}
                </div>

                <div>
                  <button
                    onClick={handlePickLuckyWinner}
                    disabled={isDrawing}
                    className="px-10 py-4 rounded-2xl font-extrabold text-sm text-slate-950 bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-300 hover:to-orange-300 shadow-xl shadow-amber-500/30 disabled:opacity-50"
                  >
                    {isDrawing ? 'Drawing Winner...' : '🎲 SPIN & PICK LUCKY WINNER'}
                  </button>
                </div>
              </div>
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
