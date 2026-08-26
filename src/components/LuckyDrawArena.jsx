import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { 
  Trophy, 
  Gift, 
  Sparkles, 
  Clock, 
  Volume2, 
  VolumeX, 
  RotateCcw, 
  Zap, 
  Copy, 
  Check, 
  MapPin, 
  Phone, 
  Ticket, 
  AlertCircle,
  ExternalLink,
  Flame,
  Layers
} from 'lucide-react';

const SPIN_DURATION_SECONDS = 180; // 3 Minutes (180s)

// Lightweight Web Audio API Synthesizers (no external assets required)
function createAudioPlayer() {
  let audioCtx = null;
  const initCtx = () => {
    if (!audioCtx && typeof window !== 'undefined') {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) audioCtx = new AudioContextClass();
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  };

  return {
    playTick: (pitch = 500) => {
      try {
        const ctx = initCtx();
        if (!ctx) return;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(pitch, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(pitch * 1.5, ctx.currentTime + 0.025);
        gain.gain.setValueAtTime(0.06, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.025);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.028);
      } catch {
        // audio muted or blocked
      }
    },
    playFanfare: () => {
      try {
        const ctx = initCtx();
        if (!ctx) return;
        const chord = [523.25, 659.25, 783.99, 1046.50, 1318.51]; // C5, E5, G5, C6, E6
        chord.forEach((freq, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          const startTime = ctx.currentTime + (i * 0.1);
          osc.frequency.setValueAtTime(freq, startTime);
          gain.gain.setValueAtTime(0.18, startTime);
          gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.7);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(startTime);
          osc.stop(startTime + 0.75);
        });
      } catch {
        // ignore
      }
    }
  };
}

const audioPlayer = createAudioPlayer();

export default function LuckyDrawArena({ entries = [], showToast = () => {} }) {
  // Active View Tab: 'prize1' | 'prize2' | 'dual'
  const [activeTab, setActiveTab] = useState('prize1');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [copiedId, setCopiedId] = useState(null);
  const [excludePreviousWinner, setExcludePreviousWinner] = useState(true);

  // PRIZE 1 STATE
  const [prize1State, setPrize1State] = useState({
    id: 'prize1',
    title: '1st Grand Prize',
    prizeName: 'Luxury Resort Stay in Kerala',
    description: '3 Days & 2 Nights Premium Resort Stay (All Inclusive)',
    icon: Trophy,
    isDrawing: false,
    remainingSeconds: SPIN_DURATION_SECONDS,
    currentCandidate: null,
    winner: null,
    drawHistory: [],
    drawnAt: null
  });

  // PRIZE 2 STATE
  const [prize2State, setPrize2State] = useState({
    id: 'prize2',
    title: '2nd Prize',
    prizeName: 'Free International Shipment (Up to 10kg)',
    description: 'Complimentary Door-to-Door Worldwide Cargo Shipment',
    icon: Gift,
    isDrawing: false,
    remainingSeconds: SPIN_DURATION_SECONDS,
    currentCandidate: null,
    winner: null,
    drawHistory: [],
    drawnAt: null
  });

  // Animation and Timer Refs for clean teardown
  const p1IntervalRef = useRef(null);
  const p2IntervalRef = useRef(null);
  const p1TimerRef = useRef(null);
  const p2TimerRef = useRef(null);

  // Weight calculation helper:
  // Base entry (0 referrals) = 1 ticket
  // Active referrers (referralCount >= 1) receive a gentle priority boost:
  // Base (1) + Referrer Boost (2) + (2 per referral, max 5) => 5x to 13x tickets
  const getEntryTickets = (entry) => {
    if (!entry) return 1;
    const count = entry.referralCount || 0;
    if (count <= 0) return 1;
    return 1 + 2 + (Math.min(5, count) * 2);
  };

  // Build weighted pool for a specific prize
  const buildPool = (excludeEntryId = null) => {
    let pool = [];
    entries.forEach(entry => {
      if (excludeEntryId && entry.entryId === excludeEntryId) return;
      
      const tickets = getEntryTickets(entry);
      for (let i = 0; i < tickets; i++) {
        pool.push(entry);
      }
    });
    return pool;
  };

  // Launch celebration confetti
  const triggerCelebration = () => {
    if (soundEnabled) audioPlayer.playFanfare();

    // Multi-burst confetti
    const count = 200;
    const defaults = { origin: { y: 0.6 } };

    function fire(particleRatio, opts) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
      });
    }

    fire(0.25, { spread: 26, startVelocity: 55, colors: ['#FF6B00', '#FBBF24', '#F59E0B'] });
    fire(0.2, { spread: 60, colors: ['#FDE047', '#EAB308', '#FFFFFF'] });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8, colors: ['#FF6B00', '#F59E0B', '#38BDF8'] });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, colors: ['#FBBF24', '#FFFFFF'] });
    fire(0.1, { spread: 120, startVelocity: 45, colors: ['#FF6B00', '#FDE047'] });
  };

  // Copy details helper
  const handleCopy = (entry) => {
    if (!entry) return;
    const text = `🎉 Nuvana.go Lucky Winner:\nName: ${entry.fullName}\nEntry ID: ${entry.entryId}\nPhone: ${entry.phone}\nLocation: ${entry.location || 'Kerala'}`;
    navigator.clipboard.writeText(text);
    setCopiedId(entry.entryId);
    showToast('Winner details copied to clipboard!', 'success');
    setTimeout(() => setCopiedId(null), 2500);
  };

  // -------------------------------------------------------------
  // START 3-MINUTE SPIN ENGINE
  // -------------------------------------------------------------
  const startDraw = (prizeKey) => {
    if (entries.length === 0) {
      showToast('No entries recorded yet. Submit entries first!', 'warning');
      return;
    }

    const isP1 = prizeKey === 'prize1';
    const otherWinnerId = isP1 
      ? (excludePreviousWinner ? prize2State.winner?.entryId : null)
      : (excludePreviousWinner ? prize1State.winner?.entryId : null);

    const pool = buildPool(otherWinnerId);

    if (pool.length === 0) {
      showToast('No eligible entries available for this draw.', 'warning');
      return;
    }

    // Reset current prize state
    if (isP1) {
      clearInterval(p1IntervalRef.current);
      clearInterval(p1TimerRef.current);
      setPrize1State(prev => ({
        ...prev,
        isDrawing: true,
        remainingSeconds: SPIN_DURATION_SECONDS,
        winner: null,
        currentCandidate: pool[Math.floor(Math.random() * pool.length)],
        drawHistory: []
      }));
    } else {
      clearInterval(p2IntervalRef.current);
      clearInterval(p2TimerRef.current);
      setPrize2State(prev => ({
        ...prev,
        isDrawing: true,
        remainingSeconds: SPIN_DURATION_SECONDS,
        winner: null,
        currentCandidate: pool[Math.floor(Math.random() * pool.length)],
        drawHistory: []
      }));
    }

    let remaining = SPIN_DURATION_SECONDS;
    const startTime = Date.now();
    const durationMs = SPIN_DURATION_SECONDS * 1000;

    // Helper to calculate shuffle delay based on time remaining (Deceleration curve)
    const getShuffleDelay = (remainingSec) => {
      if (remainingSec > 20) return 65; // Hyper shuffle (~65ms)
      if (remainingSec > 10) return 120; // Suspense starts (~120ms)
      if (remainingSec > 5) return 240; // Decelerating (~240ms)
      if (remainingSec > 2) return 500; // Slowing ticks (~500ms)
      if (remainingSec > 1) return 850; // Dramatic penultimate tick (~850ms)
      return 1200; // Final dramatic lock (~1200ms)
    };

    // Recursive shuffle function with dynamic interval
    let shuffleTimeoutId = null;
    const runDynamicShuffle = () => {
      const elapsed = Date.now() - startTime;
      const currentRemaining = Math.max(0, SPIN_DURATION_SECONDS - Math.floor(elapsed / 1000));

      const randomIdx = Math.floor(Math.random() * pool.length);
      const candidate = pool[randomIdx];

      if (soundEnabled && currentRemaining <= 25) {
        const pitch = 400 + ((25 - currentRemaining) * 20);
        audioPlayer.playTick(pitch);
      } else if (soundEnabled && Math.random() > 0.6) {
        audioPlayer.playTick(450);
      }

      if (isP1) {
        setPrize1State(prev => ({
          ...prev,
          currentCandidate: candidate,
          drawHistory: [candidate, ...prev.drawHistory.slice(0, 4)]
        }));
      } else {
        setPrize2State(prev => ({
          ...prev,
          currentCandidate: candidate,
          drawHistory: [candidate, ...prev.drawHistory.slice(0, 4)]
        }));
      }

      if (elapsed < durationMs) {
        const nextDelay = getShuffleDelay(currentRemaining);
        shuffleTimeoutId = setTimeout(runDynamicShuffle, nextDelay);
      }
    };

    runDynamicShuffle();

    // 1-second countdown clock interval
    const timerInterval = setInterval(() => {
      remaining -= 1;
      
      if (isP1) {
        setPrize1State(prev => ({ ...prev, remainingSeconds: Math.max(0, remaining) }));
      } else {
        setPrize2State(prev => ({ ...prev, remainingSeconds: Math.max(0, remaining) }));
      }

      if (remaining <= 0) {
        clearInterval(timerInterval);
        clearTimeout(shuffleTimeoutId);

        // Pick Final Verified Winner
        const finalWinner = pool[Math.floor(Math.random() * pool.length)];

        if (isP1) {
          setPrize1State(prev => ({
            ...prev,
            isDrawing: false,
            winner: finalWinner,
            currentCandidate: finalWinner,
            drawnAt: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
          }));
        } else {
          setPrize2State(prev => ({
            ...prev,
            isDrawing: false,
            winner: finalWinner,
            currentCandidate: finalWinner,
            drawnAt: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
          }));
        }

        triggerCelebration();
        showToast(`🎉 ${isP1 ? '1st Grand Prize' : '2nd Prize'} Winner Selected: ${finalWinner.fullName}!`, 'success');
      }
    }, 1000);

    if (isP1) {
      p1TimerRef.current = timerInterval;
    } else {
      p2TimerRef.current = timerInterval;
    }
  };

  // Instant Reveal Helper (Skip remaining time)
  const instantFinish = (prizeKey) => {
    const isP1 = prizeKey === 'prize1';
    const otherWinnerId = isP1 
      ? (excludePreviousWinner ? prize2State.winner?.entryId : null)
      : (excludePreviousWinner ? prize1State.winner?.entryId : null);

    const pool = buildPool(otherWinnerId);
    if (pool.length === 0) return;

    if (isP1) {
      clearInterval(p1TimerRef.current);
      clearInterval(p1IntervalRef.current);
    } else {
      clearInterval(p2TimerRef.current);
      clearInterval(p2IntervalRef.current);
    }

    const finalWinner = pool[Math.floor(Math.random() * pool.length)];

    if (isP1) {
      setPrize1State(prev => ({
        ...prev,
        isDrawing: false,
        remainingSeconds: 0,
        winner: finalWinner,
        currentCandidate: finalWinner,
        drawnAt: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      }));
    } else {
      setPrize2State(prev => ({
        ...prev,
        isDrawing: false,
        remainingSeconds: 0,
        winner: finalWinner,
        currentCandidate: finalWinner,
        drawnAt: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      }));
    }

    triggerCelebration();
    showToast(`⚡ Instant Reveal: ${finalWinner.fullName} is the Winner!`, 'success');
  };

  // Reset Prize
  const resetDraw = (prizeKey) => {
    const isP1 = prizeKey === 'prize1';
    if (isP1) {
      clearInterval(p1TimerRef.current);
      clearInterval(p1IntervalRef.current);
      setPrize1State(prev => ({
        ...prev,
        isDrawing: false,
        remainingSeconds: SPIN_DURATION_SECONDS,
        winner: null,
        currentCandidate: null,
        drawHistory: [],
        drawnAt: null
      }));
    } else {
      clearInterval(p2TimerRef.current);
      clearInterval(p2IntervalRef.current);
      setPrize2State(prev => ({
        ...prev,
        isDrawing: false,
        remainingSeconds: SPIN_DURATION_SECONDS,
        winner: null,
        currentCandidate: null,
        drawHistory: [],
        drawnAt: null
      }));
    }
    showToast('Lucky draw reset to initial state.', 'info');
  };

  // Clean up all intervals on unmount
  useEffect(() => {
    const p1Int = p1IntervalRef;
    const p2Int = p2IntervalRef;
    const p1Tmr = p1TimerRef;
    const p2Tmr = p2TimerRef;
    return () => {
      clearInterval(p1Int.current);
      clearInterval(p2Int.current);
      clearInterval(p1Tmr.current);
      clearInterval(p2Tmr.current);
    };
  }, []);

  // Format seconds into MM:SS
  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Total weighted chances in pool and referred entries count
  const totalPoolEntries = entries.reduce((acc, curr) => acc + getEntryTickets(curr), 0);
  const totalReferredEntries = entries.filter(e => (e.referralCount || 0) > 0).length;

  // Render a Single Prize Spin Arena Card
  const renderPrizeArena = (prizeState) => {
    const isP1 = prizeState.id === 'prize1';
    const progressPercent = ((SPIN_DURATION_SECONDS - prizeState.remainingSeconds) / SPIN_DURATION_SECONDS) * 100;
    const otherWinner = isP1 ? prize2State.winner : prize1State.winner;
    const IconComponent = prizeState.icon;

    return (
      <div 
        key={prizeState.id}
        className={`relative overflow-hidden rounded-3xl border transition-all duration-300 ${
          prizeState.winner 
            ? 'bg-gradient-to-b from-amber-950/40 via-slate-900/90 to-slate-950 border-amber-500/60 shadow-2xl shadow-amber-500/20' 
            : prizeState.isDrawing 
              ? 'bg-gradient-to-b from-orange-950/30 via-slate-900/90 to-slate-950 border-orange-500/50 shadow-2xl shadow-orange-500/10'
              : 'bg-slate-900/70 border-slate-800 shadow-xl'
        } p-6 sm:p-8 flex flex-col justify-between`}
      >
        {/* Glow ambient background effect during spin */}
        {prizeState.isDrawing && (
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-gradient-to-br from-amber-500/20 to-orange-600/20 rounded-full blur-3xl pointer-events-none animate-pulse" />
        )}

        <div>
          {/* Prize Header */}
          <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-800/80">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border shadow-lg ${
                isP1 
                  ? 'bg-gradient-to-br from-amber-500/20 to-yellow-600/30 border-amber-500/40 text-amber-400' 
                  : 'bg-gradient-to-br from-cyan-500/20 to-blue-600/30 border-cyan-500/40 text-cyan-400'
              }`}>
                <IconComponent className="w-6 h-6" />
              </div>
              <div className="text-left">
                <div className="flex items-center gap-2">
                  <span className={`text-[11px] font-mono font-black uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                    isP1 ? 'bg-amber-500/20 text-amber-300 border-amber-500/30' : 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30'
                  }`}>
                    {prizeState.title}
                  </span>
                  {prizeState.winner && (
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30 font-bold">
                      🏆 WINNER DECLARED
                    </span>
                  )}
                  {prizeState.isDrawing && (
                    <span className="text-[10px] bg-orange-500/20 text-orange-300 px-2 py-0.5 rounded-full border border-orange-500/30 font-bold animate-pulse flex items-center gap-1">
                      <Flame className="w-3 h-3 text-orange-400" /> LIVE 3-MIN SPIN
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-black text-white font-heading mt-1">
                  {prizeState.prizeName}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">{prizeState.description}</p>
              </div>
            </div>

            {/* Quick Actions (Reset) */}
            {(prizeState.winner || prizeState.isDrawing) && (
              <button
                onClick={() => resetDraw(prizeState.id)}
                className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700/60 text-xs transition-colors cursor-pointer"
                title="Reset this spin"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* 3-MINUTE TIMER & PROGRESS BAR */}
          {prizeState.isDrawing && (
            <div className="my-6 p-4 rounded-2xl bg-slate-950/80 border border-orange-500/30 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-orange-400">
                  <Clock className="w-4 h-4 animate-spin text-orange-400" />
                  <span>COUNTDOWN TO WINNER:</span>
                </div>
                <div className="text-2xl font-black font-mono tracking-widest text-amber-300 animate-pulse">
                  {formatTime(prizeState.remainingSeconds)}
                </div>
              </div>

              {/* Linear Progress Bar */}
              <div className="w-full bg-slate-900 h-3 rounded-full overflow-hidden border border-slate-800 relative">
                <div 
                  className="h-full bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-400 transition-all duration-300 rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                <span>Phase: {prizeState.remainingSeconds > 20 ? '⚡ Ultra-Speed Raffle Shuffle' : prizeState.remainingSeconds > 5 ? '🔥 Decelerating Tension' : '🎯 Final Step Reveal'}</span>
                <span>{Math.round(progressPercent)}% Elapsed</span>
              </div>
            </div>
          )}

          {/* CURRENT SHUFFLING NAME / ACTIVE DISPLAY BOX */}
          <div className="my-6">
            {prizeState.winner ? (
              /* WINNER REVEALED CARD */
              <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-amber-500/15 via-slate-950 to-slate-950 border-2 border-amber-500/60 text-center space-y-4 shadow-2xl animate-in zoom-in-95 duration-300">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-black uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  Official {prizeState.title} Winner
                </div>

                <div className="space-y-1">
                  <div className="text-3xl sm:text-4xl font-black text-white font-heading tracking-tight">
                    {prizeState.winner.fullName}
                  </div>
                  <div className="text-sm font-mono font-bold text-amber-400">
                    {prizeState.winner.entryId}
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-left text-xs bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
                  <div className="space-y-0.5">
                    <span className="text-slate-400 text-[11px] flex items-center gap-1">
                      <Phone className="w-3 h-3 text-amber-400" /> WhatsApp Phone:
                    </span>
                    <span className="font-mono font-bold text-white text-sm">
                      {prizeState.winner.phone}
                    </span>
                  </div>

                  <div className="space-y-0.5">
                    <span className="text-slate-400 text-[11px] flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-cyan-400" /> Area / Location:
                    </span>
                    <span className="font-bold text-white">
                      {prizeState.winner.location || 'Kerala'}
                    </span>
                  </div>

                  <div className="space-y-0.5">
                    <span className="text-slate-400 text-[11px] flex items-center gap-1">
                      <Ticket className="w-3 h-3 text-emerald-400" /> Draw Weight & Boost:
                    </span>
                    <span className="font-mono text-emerald-300 font-bold">
                      {getEntryTickets(prizeState.winner)}x Weighted Tickets ({prizeState.winner.referralCount || 0} referrals)
                    </span>
                  </div>

                  <div className="space-y-0.5">
                    <span className="text-slate-400 text-[11px] flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" /> Drawn Time:
                    </span>
                    <span className="font-mono text-slate-300">
                      {prizeState.drawnAt || 'Live Launch'}
                    </span>
                  </div>
                </div>

                {/* Action Buttons for Winner */}
                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <a
                    href={`https://wa.me/${prizeState.winner.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                      `Congratulations ${prizeState.winner.fullName}! 🎉 You have won the ${prizeState.prizeName} in the Nuvana.go Launch Lucky Draw (Entry ID: ${prizeState.winner.entryId}). Our team will contact you shortly!`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Congratulate on WhatsApp</span>
                  </a>

                  <button
                    onClick={() => handleCopy(prizeState.winner)}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    {copiedId === prizeState.winner.entryId ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-slate-400" />
                        <span>Copy Details</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ) : prizeState.isDrawing ? (
              /* LIVE RAPID SHUFFLING VIEW */
              <div className="p-6 sm:p-8 rounded-3xl bg-slate-950 border-2 border-orange-500/60 text-center space-y-4 shadow-2xl relative overflow-hidden">
                <div className="flex items-center justify-center gap-2">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
                  </span>
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-orange-400">
                    CURRENT SHUFFLING CANDIDATE
                  </span>
                </div>

                {prizeState.currentCandidate && (
                  <div className="space-y-2 py-2 animate-in fade-in duration-75">
                    <div className="text-3xl sm:text-4xl font-black text-white font-heading truncate drop-shadow-md">
                      {prizeState.currentCandidate.fullName}
                    </div>

                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-slate-900 border border-amber-500/40 text-amber-300 text-xs font-mono font-bold">
                      <span>{prizeState.currentCandidate.entryId}</span>
                      <span>•</span>
                      <span className="text-slate-300">{prizeState.currentCandidate.location || 'Kerala'}</span>
                    </div>

                    <div className="text-xs text-slate-400 font-mono flex items-center justify-center flex-wrap gap-2">
                      <span>Phone: <span className="text-white font-bold">{prizeState.currentCandidate.phone.slice(0, 6)}****</span></span>
                      {prizeState.currentCandidate.referralCount > 0 ? (
                        <span className="text-amber-300 font-bold bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/30 text-[11px]">
                          🌟 {getEntryTickets(prizeState.currentCandidate)}x Priority Boost ({prizeState.currentCandidate.referralCount} referrals)
                        </span>
                      ) : (
                        <span className="text-slate-500 text-[11px]">
                          (1x Standard Entry)
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Shuffling History Stream Ticker */}
                {prizeState.drawHistory.length > 0 && (
                  <div className="pt-3 border-t border-slate-800/80">
                    <div className="text-[10px] text-slate-500 font-mono uppercase mb-1.5">
                      Raffle Feed Stream
                    </div>
                    <div className="flex items-center justify-center gap-2 overflow-hidden text-[11px] font-mono text-slate-400">
                      {prizeState.drawHistory.map((item, idx) => (
                        <span 
                          key={`${item.entryId}-${idx}`} 
                          className={`px-2 py-0.5 rounded-md bg-slate-900/90 border border-slate-800 truncate max-w-[120px] ${
                            idx === 0 ? 'text-amber-300 border-amber-500/30' : 'text-slate-500 opacity-60'
                          }`}
                        >
                          {item.fullName}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* IDLE READY STATE */
              <div className="p-8 rounded-3xl bg-slate-950/60 border border-slate-800 text-center space-y-3 min-h-[180px] flex flex-col items-center justify-center">
                <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 mx-auto">
                  <IconComponent className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-white">Ready for 3-Minute Lucky Draw</h4>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto">
                    Click the button below to start the 3-minute high-suspense live randomizer. Names will shuffle dynamically across all {entries.length} participants with weighted bonus tickets.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* BOTTOM ACTION BUTTONS */}
        <div className="pt-4 border-t border-slate-800/60 space-y-3">
          {prizeState.isDrawing ? (
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => instantFinish(prizeState.id)}
                className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center gap-2 shadow-lg shadow-amber-500/20 cursor-pointer transition-all"
                title="Skip timer directly to the winner"
              >
                <Zap className="w-4 h-4 fill-current" />
                <span>⚡ Instant Reveal (Skip 3m)</span>
              </button>

              <button
                onClick={() => resetDraw(prizeState.id)}
                className="px-4 py-3 rounded-xl bg-slate-800 hover:bg-red-500/20 hover:text-red-400 hover:border-red-500/30 text-slate-300 border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Stop / Abort Spin</span>
              </button>
            </div>
          ) : (
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => startDraw(prizeState.id)}
                disabled={entries.length === 0}
                className={`w-full sm:w-auto px-8 py-3.5 rounded-2xl font-black text-xs text-slate-950 transition-all shadow-xl cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 ${
                  isP1
                    ? 'bg-gradient-to-r from-amber-400 via-orange-400 to-amber-300 hover:from-amber-300 hover:to-orange-300 shadow-amber-500/20'
                    : 'bg-gradient-to-r from-cyan-400 via-teal-400 to-sky-300 hover:from-cyan-300 hover:to-teal-300 shadow-cyan-500/20'
                }`}
              >
                <IconComponent className="w-4 h-4" />
                <span>{prizeState.winner ? `🔄 RE-SPIN FOR ${prizeState.title.toUpperCase()}` : `🎲 START 3-MINUTE SPIN FOR ${prizeState.title.toUpperCase()}`}</span>
              </button>

              {prizeState.winner && (
                <button
                  onClick={() => resetDraw(prizeState.id)}
                  className="px-4 py-3.5 rounded-2xl bg-slate-800/80 hover:bg-slate-750 text-slate-300 border border-slate-700 text-xs font-semibold cursor-pointer"
                >
                  Clear Winner
                </button>
              )}
            </div>
          )}

          {/* Cross Winner Excluded Notice */}
          {excludePreviousWinner && otherWinner && (
            <div className="text-[11px] text-slate-400 flex items-center justify-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
              <span>
                Note: <strong>{otherWinner.fullName}</strong> ({otherWinner.entryId}) won the other prize and is excluded from this draw pool.
              </span>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Mode Switcher */}
      <div className="glass-card p-5 rounded-3xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-mono font-bold">
              3-MINUTE DUAL SPIN SYSTEM
            </span>
            <span className="text-xs text-slate-400">
              • {entries.length} Participants ({totalPoolEntries} Weighted Tickets • {totalReferredEntries} Referrers Prioritized)
            </span>
          </div>
          <h2 className="text-2xl font-black text-white font-heading mt-1">
            🎉 Official Launch Day Lucky Draw
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Two distinct prize draws with 3-minute live real-time candidate shuffling and gentle priority weighting for participants who made referrals.
          </p>
        </div>

        {/* Global Controls: Audio & View Switcher */}
        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          {/* Sound Toggle */}
          <button
            onClick={() => setSoundEnabled(prev => !prev)}
            className={`px-3 py-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
              soundEnabled 
                ? 'bg-amber-500/15 border-amber-500/40 text-amber-300' 
                : 'bg-slate-800 border-slate-700 text-slate-400'
            }`}
            title={soundEnabled ? 'Mute Sound Effects' : 'Unmute Sound Effects'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-amber-400" /> : <VolumeX className="w-4 h-4" />}
            <span className="hidden sm:inline">{soundEnabled ? 'Sound ON' : 'Muted'}</span>
          </button>

          {/* Exclude Winner Toggle */}
          <button
            onClick={() => setExcludePreviousWinner(prev => !prev)}
            className={`px-3 py-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
              excludePreviousWinner 
                ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300' 
                : 'bg-slate-800 border-slate-700 text-slate-400'
            }`}
            title="Ensure one participant cannot win both 1st and 2nd prizes"
          >
            <Check className={`w-3.5 h-3.5 ${excludePreviousWinner ? 'text-emerald-400' : 'text-slate-500'}`} />
            <span className="hidden sm:inline">Unique Winners Only</span>
          </button>

          {/* View Modes */}
          <div className="flex items-center rounded-xl bg-slate-950 p-1 border border-slate-800">
            <button
              onClick={() => setActiveTab('prize1')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'prize1' ? 'bg-amber-400 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              🏆 1st Prize
            </button>
            <button
              onClick={() => setActiveTab('prize2')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'prize2' ? 'bg-cyan-400 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              🎁 2nd Prize
            </button>
            <button
              onClick={() => setActiveTab('dual')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                activeTab === 'dual' ? 'bg-slate-200 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
              }`}
              title="View both prizes side by side on big screen"
            >
              <Layers className="w-3 h-3" />
              <span className="hidden sm:inline">Dual Arena</span>
            </button>
          </div>
        </div>
      </div>

      {/* RENDER ACTIVE PRIZE ARENA(S) */}
      {activeTab === 'prize1' && (
        <div className="max-w-3xl mx-auto">
          {renderPrizeArena(prize1State)}
        </div>
      )}

      {activeTab === 'prize2' && (
        <div className="max-w-3xl mx-auto">
          {renderPrizeArena(prize2State)}
        </div>
      )}

      {activeTab === 'dual' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {renderPrizeArena(prize1State)}
          {renderPrizeArena(prize2State)}
        </div>
      )}

      {/* SUMMARY DASHBOARD OF BOTH WINNERS */}
      {(prize1State.winner || prize2State.winner) && (
        <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-white flex items-center gap-2 font-heading">
              <Trophy className="w-4 h-4 text-amber-400" />
              <span>Official Launch Day Winners Summary</span>
            </h4>
            <span className="text-[11px] text-emerald-400 font-mono">
              Ready for Live Stage Announcement
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Prize 1 Summary Card */}
            <div className={`p-4 rounded-2xl border ${prize1State.winner ? 'bg-amber-950/20 border-amber-500/40' : 'bg-slate-900/50 border-slate-800'}`}>
              <div className="text-[11px] font-mono font-bold text-amber-400 uppercase">
                1st Prize: Luxury Resort Stay
              </div>
              {prize1State.winner ? (
                <div className="mt-2 space-y-1">
                  <div className="text-lg font-bold text-white">{prize1State.winner.fullName}</div>
                  <div className="text-xs font-mono text-amber-300">{prize1State.winner.entryId} • {prize1State.winner.phone}</div>
                  <div className="text-[11px] text-slate-400">{prize1State.winner.location || 'Kerala'}</div>
                </div>
              ) : (
                <div className="text-xs text-slate-500 mt-2 italic">Not drawn yet</div>
              )}
            </div>

            {/* Prize 2 Summary Card */}
            <div className={`p-4 rounded-2xl border ${prize2State.winner ? 'bg-cyan-950/20 border-cyan-500/40' : 'bg-slate-900/50 border-slate-800'}`}>
              <div className="text-[11px] font-mono font-bold text-cyan-400 uppercase">
                2nd Prize: Free Shipment (Up to 10kg)
              </div>
              {prize2State.winner ? (
                <div className="mt-2 space-y-1">
                  <div className="text-lg font-bold text-white">{prize2State.winner.fullName}</div>
                  <div className="text-xs font-mono text-cyan-300">{prize2State.winner.entryId} • {prize2State.winner.phone}</div>
                  <div className="text-[11px] text-slate-400">{prize2State.winner.location || 'Kerala'}</div>
                </div>
              ) : (
                <div className="text-xs text-slate-500 mt-2 italic">Not drawn yet</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
