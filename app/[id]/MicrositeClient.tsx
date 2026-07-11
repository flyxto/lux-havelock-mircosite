'use client';

import { useState, useEffect, useRef } from 'react';
import { Download, Share2, Image as ImageIcon, CheckCircle, ArrowDown, ExternalLink, Sparkles } from 'lucide-react';

interface ImageProps {
  image: {
    id: string;
    imageUrl: string;
    status: string | null;
    whatsappNumber: string | null;
  };
}

// Hardcoded user-calibrated layout coordinates
const FLOWER_CONFIG = {
  flower1: { size: 250, rotation: 20, x: -141, y: 105 },
  flower2: { size: 322, rotation: 185, x: -133, y: -175 },
  flower3: { size: 264, rotation: 45, x: -96, y: -144 },
  flower4: { size: 260, rotation: 320, x: -180, y: 14 },
};

export default function MicrositeClient({ image }: ImageProps) {
  const [isIOS, setIsIOS] = useState<boolean | null>(null);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [isSharing, setIsSharing] = useState<boolean>(false);
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const [imageError, setImageError] = useState<boolean>(false);

  const [imageFile, setImageFile] = useState<File | null>(null);

  const imgRef = useRef<HTMLImageElement>(null);

  // Safe URL encoding for filenames with spaces/special characters
  const imageUrl = encodeURI(image.imageUrl);

  useEffect(() => {
    // Detect iOS client platform
    const userAgent = window.navigator.userAgent || window.navigator.vendor || '';
    const isIOSDevice = /iPad|iPhone|iPod/.test(userAgent) ||
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    setIsIOS(isIOSDevice);

    // If image is already cached/complete, set loaded state
    if (imgRef.current && imgRef.current.complete) {
      setImageLoaded(true);
    }
  }, []);

  // Pre-fetch the file for synchronous iOS native share drawer invocation
  useEffect(() => {
    if (!imageLoaded) return;

    const prefetchImage = async () => {
      try {
        const targetUrl = `/api/download?id=${image.id}`;
        const response = await fetch(targetUrl);
        if (!response.ok) throw new Error('Proxy download failed');

        const blob = await response.blob();
        const fileExt = imageUrl.split('.').pop()?.split('?')[0] || 'jpg';
        const fileType = fileExt === 'png' ? 'image/png' : 'image/jpeg';
        const filename = `souvenir.${fileExt}`;
        const file = new File([blob], filename, { type: blob.type && blob.type !== 'application/octet-stream' ? blob.type : fileType });
        setImageFile(file);
      } catch (err) {
        console.error('Pre-fetching image file for share failed:', err);
      }
    };

    prefetchImage();
  }, [imageLoaded, imageUrl, image.id]);

  const handleDownload = async () => {
    setIsDownloading(true);
    setDownloadSuccess(false);
    try {
      const link = document.createElement('a');
      link.href = `/api/download?id=${image.id}`;
      // This will trigger the download headers configured in the API proxy
      link.setAttribute('download', '');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Show checkmark after a short duration
      setTimeout(() => {
        setIsDownloading(false);
        setDownloadSuccess(true);
        setTimeout(() => setDownloadSuccess(false), 3000);
      }, 1500);
    } catch (err) {
      console.error('Download error:', err);
      setIsDownloading(false);
    }
  };

  const handleShare = async () => {
    if (!navigator.share) {
      handleDownload();
      return;
    }

    // 1. If image file has been pre-fetched, trigger share immediately (maintaining gesture token)
    if (imageFile) {
      setIsSharing(true);
      try {
        if (navigator.canShare && navigator.canShare({ files: [imageFile] })) {
          await navigator.share({
            files: [imageFile],
            title: 'My Captured Memory',
            text: 'Check out my photo from the experience!',
          });
        } else {
          await navigator.share({
            url: window.location.href,
            title: 'My Captured Memory',
            text: 'Check out my photo from the experience!',
          });
        }
      } catch (err) {
        console.error('Natively sharing pre-fetched image failed:', err);
      } finally {
        setIsSharing(false);
      }
      return;
    }

    // 2. Fallback: pre-fetch was slow or failed, download file dynamically
    setIsSharing(true);
    try {
      const targetUrl = `/api/download?id=${image.id}`;
      const response = await fetch(targetUrl);
      const blob = await response.blob();
      const fileExt = imageUrl.split('.').pop()?.split('?')[0] || 'jpg';
      const fileType = fileExt === 'png' ? 'image/png' : 'image/jpeg';
      const filename = `souvenir.${fileExt}`;
      const file = new File([blob], filename, { type: blob.type && blob.type !== 'application/octet-stream' ? blob.type : fileType });

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: 'My Captured Memory',
          text: 'Check out my photo from the experience!',
        });
      } else {
        await navigator.share({
          url: window.location.href,
          title: 'My Captured Memory',
          text: 'Check out my photo from the experience!',
        });
      }
    } catch (err) {
      console.error('Natively sharing dynamically fetched image failed, sharing URL instead:', err);
      try {
        await navigator.share({
          url: window.location.href,
          title: 'My Captured Memory',
          text: 'Check out my photo from the experience!',
        });
      } catch (shareErr) {
        console.error('Web Share failed completely:', shareErr);
      }
    } finally {
      setIsSharing(false);
    }
  };


  return (
    <main className="min-h-screen bg-[#EEE8E0] text-[#2C2520] flex flex-col justify-between p-4 sm:p-6 relative overflow-hidden font-sans select-none">

      {/* Elegant Double Framing Borders */}
      <div className="absolute inset-4 sm:inset-6 border border-[#AE7FD2]/30 pointer-events-none z-0" />
      <div className="absolute inset-[22px] sm:inset-[30px] border border-[#AE7FD2]/50 pointer-events-none z-0">
        {/* Corner Flowers */}
        <img
          src="/images/flower-1.png"
          alt=""
          style={{
            width: `${FLOWER_CONFIG.flower1.size}px`,
            height: `${FLOWER_CONFIG.flower1.size}px`,
            transform: `rotate(${FLOWER_CONFIG.flower1.rotation}deg)`,
            top: `${FLOWER_CONFIG.flower1.y}px`,
            left: `${FLOWER_CONFIG.flower1.x}px`
          }}
          className="absolute object-contain pointer-events-none z-10"
        />
        <img
          src="/images/flower-2.png"
          alt=""
          style={{
            width: `${FLOWER_CONFIG.flower2.size}px`,
            height: `${FLOWER_CONFIG.flower2.size}px`,
            transform: `rotate(${FLOWER_CONFIG.flower2.rotation}deg)`,
            top: `${FLOWER_CONFIG.flower2.y}px`,
            right: `${FLOWER_CONFIG.flower2.x}px`
          }}
          className="absolute object-contain pointer-events-none z-10"
        />
        <img
          src="/images/flower-3.png"
          alt=""
          style={{
            width: `${FLOWER_CONFIG.flower3.size}px`,
            height: `${FLOWER_CONFIG.flower3.size}px`,
            transform: `rotate(${FLOWER_CONFIG.flower3.rotation}deg)`,
            bottom: `${FLOWER_CONFIG.flower3.y}px`,
            left: `${FLOWER_CONFIG.flower3.x}px`
          }}
          className="absolute object-contain pointer-events-none z-10"
        />
        <img
          src="/images/flower-4.png"
          alt=""
          style={{
            width: `${FLOWER_CONFIG.flower4.size}px`,
            height: `${FLOWER_CONFIG.flower4.size}px`,
            transform: `rotate(${FLOWER_CONFIG.flower4.rotation}deg)`,
            bottom: `${FLOWER_CONFIG.flower4.y}px`,
            right: `${FLOWER_CONFIG.flower4.x}px`
          }}
          className="absolute object-contain pointer-events-none z-10"
        />
      </div>

      {/* Botanical Backdrop Line Drawings */}
      {/* Top Left Leaf */}
      <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.6" className="absolute top-8 left-8 w-44 h-44 opacity-[0.14] text-[#AE7FD2] pointer-events-none z-0">
        <path d="M 0,0 C 15,20 22,45 35,70" />
        <path d="M 12,12 C 8,18 10,24 16,22 C 20,20 18,14 12,12 Z" fill="currentColor" fillOpacity="0.05" />
        <path d="M 18,20 C 15,28 18,33 22,29 C 25,26 21,21 18,20 Z" fill="currentColor" fillOpacity="0.05" />
        <path d="M 23,29 C 21,37 25,41 29,36 C 31,33 26,29 23,29 Z" fill="currentColor" fillOpacity="0.05" />
        <path d="M 14,10 C 20,6 25,10 22,15 C 19,17 15,13 14,10 Z" fill="currentColor" fillOpacity="0.05" />
        <path d="M 20,18 C 27,16 30,22 26,25 C 23,26 20,21 20,18 Z" fill="currentColor" fillOpacity="0.05" />
      </svg>
      {/* Bottom Right Leaf */}
      <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.6" className="absolute bottom-8 right-8 w-44 h-44 opacity-[0.14] text-[#AE7FD2] pointer-events-none z-0 rotate-180">
        <path d="M 0,0 C 15,20 22,45 35,70" />
        <path d="M 12,12 C 8,18 10,24 16,22 C 20,20 18,14 12,12 Z" fill="currentColor" fillOpacity="0.05" />
        <path d="M 18,20 C 15,28 18,33 22,29 C 25,26 21,21 18,20 Z" fill="currentColor" fillOpacity="0.05" />
        <path d="M 23,29 C 21,37 25,41 29,36 C 31,33 26,29 23,29 Z" fill="currentColor" fillOpacity="0.05" />
        <path d="M 14,10 C 20,6 25,10 22,15 C 19,17 15,13 14,10 Z" fill="currentColor" fillOpacity="0.05" />
        <path d="M 20,18 C 27,16 30,22 26,25 C 23,26 20,21 20,18 Z" fill="currentColor" fillOpacity="0.05" />
      </svg>

      {/* Main Container */}
      <div className="w-full max-w-md mx-auto my-auto relative z-10 flex flex-col items-center gap-5">

        {/* Invitation Text Frame */}
        <div className="text-center flex flex-col items-center select-none mb-1">
          <img src="/images/Lux-Logo-flat.png" alt="LUX Logo" className="w-16 sm:w-20 h-auto object-contain brightness-0 mb-1" />
          <h1 className="font-script text-4xl sm:text-5xl text-[#9A69BD] leading-tight tracking-wide">
            Bonjour to
          </h1>
          <h1 className="font-script text-4xl sm:text-5xl text-[#9A69BD] leading-none tracking-wide -mt-1.5">
            Glowing Skin
          </h1>
        </div>

        {/* Image Display */}
        <div className="relative w-[90%] aspect-[4/5] rounded-[1.4rem] overflow-hidden bg-[#ECE6DD]/80 border border-[#AE7FD2]/15 shadow-[0_8px_30px_rgba(174,127,210,0.06)] flex items-center justify-center group">
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
              <div className="w-9 h-9 border-2 border-[#AE7FD2]/20 border-t-[#AE7FD2] rounded-full animate-spin" />
              <span className="text-[11px] text-zinc-500 font-medium">Loading memory...</span>
            </div>
          )}

          {imageError && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center z-20 bg-[#EEE8E0]/90">
              <ImageIcon className="w-10 h-10 text-[#AE7FD2]/60 mb-1" />
              <span className="text-sm font-semibold text-zinc-700">Preview Unavailable</span>
              <span className="text-[11px] text-zinc-500 leading-normal">
                The image preview failed to load. However, the download and share buttons below remain fully functional.
              </span>
            </div>
          )}

          <img
            ref={imgRef}
            src={imageUrl}
            alt="Lux Souvenir"
            onLoad={() => setImageLoaded(true)}
            onError={() => {
              setImageError(true);
              setImageLoaded(false);
            }}
            className={`w-full h-full object-cover relative z-10 transition-all duration-700 ease-out select-none pointer-events-none ${imageLoaded && !imageError ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
              }`}
          />
        </div>

        {/* Action Area */}
        <div className="w-[90%] flex flex-col gap-2.5">
          {isIOS === null ? (
            // Loading fallback skeleton
            <div className="h-13 w-full bg-zinc-200/50 animate-pulse rounded-xl" />
          ) : isIOS ? (
            // iOS Native Share Trigger
            <button
              onClick={handleShare}
              disabled={isSharing}
              className="w-full h-13 bg-[#AE7FD2] hover:bg-[#9E6DC4] active:scale-[0.98] disabled:opacity-80 transition-all duration-300 rounded-xl font-semibold text-white shadow-md shadow-[#AE7FD2]/20 flex items-center justify-center gap-2 cursor-pointer relative overflow-hidden"
            >
              {isSharing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  <span className="text-xs uppercase tracking-wider">Preparing Share...</span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4" />
                  <span className="text-xs uppercase tracking-wider">Share & Save Image</span>
                </>
              )}
            </button>
          ) : (
            // Android & PC Direct Download
            <button
              onClick={handleDownload}
              disabled={isDownloading || downloadSuccess}
              className={`w-full h-13 transition-all duration-300 rounded-xl font-semibold text-white shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98] ${downloadSuccess
                  ? 'bg-emerald-600 shadow-emerald-600/10'
                  : 'bg-[#AE7FD2] hover:bg-[#9E6DC4] shadow-[#AE7FD2]/20'
                }`}
            >
              {isDownloading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  <span className="text-xs uppercase tracking-wider">Downloading...</span>
                </>
              ) : downloadSuccess ? (
                <>
                  <CheckCircle className="w-4 h-4 animate-bounce" />
                  <span className="text-xs uppercase tracking-wider">Saved Successfully!</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span className="text-xs uppercase tracking-wider">Download Image</span>
                </>
              )}
            </button>
          )}
        </div>

      </div>

      {/* Footer */}
      <footer className="w-full text-center py-4 relative z-10">
        <p className="text-[9px] text-[#5C5047]/60 tracking-wider">

        </p>
      </footer>


    </main>
  );
}
