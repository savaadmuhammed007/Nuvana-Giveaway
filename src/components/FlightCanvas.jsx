import React, { useEffect, useRef, useState, useCallback } from 'react';

const TOTAL_FRAMES = 300;

function formatFramePath(index) {
  const padded = String(index).padStart(3, '0');
  return `/frames/ezgif-frame-${padded}.jpg`;
}

export default function FlightCanvas({ scrollProgress = 0 }) {
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const [loadedCount, setLoadedCount] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const currentFrameRef = useRef(1);
  const targetFrameRef = useRef(1);
  const rafRef = useRef(null);

  // Mouse Parallax coordinates for 3D depth feeling
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  // Preload frames progressively
  useEffect(() => {
    let isMounted = true;
    const images = new Array(TOTAL_FRAMES + 1);
    imagesRef.current = images;

    let loaded = 0;

    // 1. Immediately load frame 1 (instant visual)
    const firstImg = new Image();
    firstImg.src = formatFramePath(1);
    firstImg.onload = () => {
      if (!isMounted) return;
      images[1] = firstImg;
      loaded++;
      setLoadedCount(loaded);
      setIsReady(true);
      drawFrame(1, 0, 0);

      // 2. Load keyframes spaced every 10 frames
      for (let i = 10; i <= TOTAL_FRAMES; i += 10) {
        const keyImg = new Image();
        keyImg.src = formatFramePath(i);
        keyImg.onload = () => {
          if (!isMounted) return;
          images[i] = keyImg;
          loaded++;
          setLoadedCount((prev) => prev + 1);
        };
      }

      // 3. Load all remaining frames in chunks
      let index = 2;
      const loadBatch = () => {
        if (!isMounted) return;
        const end = Math.min(index + 15, TOTAL_FRAMES);
        for (; index <= end; index++) {
          if (images[index]) continue; // already keyframe
          const frameIndex = index;
          const img = new Image();
          img.src = formatFramePath(frameIndex);
          img.onload = () => {
            if (!isMounted) return;
            images[frameIndex] = img;
            loaded++;
            setLoadedCount((prev) => prev + 1);
          };
        }
        if (index <= TOTAL_FRAMES) {
          requestIdleCallback ? requestIdleCallback(loadBatch) : setTimeout(loadBatch, 30);
        }
      };

      setTimeout(loadBatch, 50);
    };

    return () => {
      isMounted = false;
    };
  }, []);

  // Update target frame based on scroll progress (0.0 -> 1.0)
  useEffect(() => {
    const rawFrame = 1 + Math.round(scrollProgress * (TOTAL_FRAMES - 1));
    const clampedFrame = Math.max(1, Math.min(TOTAL_FRAMES, rawFrame));
    targetFrameRef.current = clampedFrame;
  }, [scrollProgress]);

  // Handle mouse move for subtle 3D window drift
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 2; // -1 to 1
      const y = (e.clientY / innerHeight - 0.5) * 2; // -1 to 1
      mouseRef.current.targetX = x;
      mouseRef.current.targetY = y;
    };

    const handleDeviceOrientation = (e) => {
      if (e.gamma !== null && e.beta !== null) {
        mouseRef.current.targetX = Math.max(-1, Math.min(1, e.gamma / 25));
        mouseRef.current.targetY = Math.max(-1, Math.min(1, (e.beta - 45) / 25));
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('deviceorientation', handleDeviceOrientation, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('deviceorientation', handleDeviceOrientation);
    };
  }, []);

  // Drawing function with cover fitting & parallax drift
  const drawFrame = useCallback((frameIdx, mouseX, mouseY) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Find closest loaded frame if current frame is still loading
    let img = imagesRef.current[frameIdx];
    if (!img || !img.complete) {
      for (let offset = 1; offset < 30; offset++) {
        if (imagesRef.current[frameIdx - offset]?.complete) {
          img = imagesRef.current[frameIdx - offset];
          break;
        }
        if (imagesRef.current[frameIdx + offset]?.complete) {
          img = imagesRef.current[frameIdx + offset];
          break;
        }
      }
      if (!img || !img.complete) {
        img = imagesRef.current[1];
      }
    }

    if (!img || !img.complete || img.naturalWidth === 0) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
      canvas.width = width * dpr;
      canvas.height = height * dpr;
    }

    ctx.save();
    ctx.scale(dpr, dpr);

    // Calculate Aspect Ratio Cover
    const imgAspect = img.naturalWidth / img.naturalHeight;
    const canvasAspect = width / height;

    let drawWidth, drawHeight, offsetX, offsetY;

    // Add extra margin for subtle mouse parallax panning
    const parallaxFactor = 0.035; // 3.5% drift room
    const renderWidth = width * (1 + parallaxFactor * 2);
    const renderHeight = height * (1 + parallaxFactor * 2);

    if (canvasAspect > imgAspect) {
      drawWidth = renderWidth;
      drawHeight = renderWidth / imgAspect;
    } else {
      drawHeight = renderHeight;
      drawWidth = renderHeight * imgAspect;
    }

    // Parallax offset based on smoothed mouse
    const panX = -mouseX * (width * parallaxFactor);
    const panY = -mouseY * (height * parallaxFactor);

    offsetX = (width - drawWidth) / 2 + panX;
    offsetY = (height - drawHeight) / 2 + panY;

    // Clear and draw image
    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);

    // Cinematic Color Grading Overlay (enhances natural sky blues & lush greens)
    const grad = ctx.createRadialGradient(
      width / 2, height / 2, width * 0.2,
      width / 2, height / 2, width * 0.75
    );
    grad.addColorStop(0, 'rgba(0, 0, 0, 0)');
    grad.addColorStop(0.7, 'rgba(3, 6, 12, 0.2)');
    grad.addColorStop(1, 'rgba(3, 6, 12, 0.65)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    ctx.restore();
  }, []);

  // Animation Loop: LERP target frame and mouse positions smoothly
  useEffect(() => {
    let isRunning = true;

    const renderLoop = () => {
      if (!isRunning) return;

      // Lerp mouse
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.06;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.06;

      // Lerp frame progress
      const target = targetFrameRef.current;
      const current = currentFrameRef.current;
      const diff = target - current;

      if (Math.abs(diff) > 0.01) {
        currentFrameRef.current += diff * 0.22; // snappy, high-speed scrubbing
      } else {
        currentFrameRef.current = target;
      }

      const frameToDraw = Math.round(currentFrameRef.current);
      drawFrame(frameToDraw, mouseRef.current.x, mouseRef.current.y);

      rafRef.current = requestAnimationFrame(renderLoop);
    };

    rafRef.current = requestAnimationFrame(renderLoop);

    return () => {
      isRunning = false;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [drawFrame]);

  // Window resize handler
  useEffect(() => {
    const handleResize = () => {
      drawFrame(Math.round(currentFrameRef.current), mouseRef.current.x, mouseRef.current.y);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [drawFrame]);

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden bg-[#03060C]">
      {/* 3D Flight Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover transition-opacity duration-700"
        style={{ opacity: isReady ? 1 : 0 }}
      />

      {/* Atmospheric Glass/Vignette Tint Layer */}
      <div className="absolute inset-0 cinematic-vignette opacity-80 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#03060C] via-transparent to-[#03060C]/60 pointer-events-none" />

      {/* Loading indicator for initial buffer */}
      {!isReady && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#03060C] z-50">
          <div className="w-12 h-12 rounded-full border-2 border-white/10 border-t-[#FF6B00] animate-spin mb-4" />
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400 font-mono">
            Initializing Flight Visuals...
          </p>
        </div>
      )}

      {/* Subtle Frame Buffer Indicator */}
      {isReady && loadedCount < TOTAL_FRAMES && (
        <div className="absolute bottom-3 right-4 z-20 flex items-center gap-2 pointer-events-none opacity-40 hover:opacity-100 transition-opacity">
          <div className="w-1.5 h-1.5 rounded-full bg-[#FF6B00] animate-pulse" />
          <span className="text-[10px] font-mono text-slate-400">
            HQ Buffer {Math.round((loadedCount / TOTAL_FRAMES) * 100)}%
          </span>
        </div>
      )}
    </div>
  );
}
