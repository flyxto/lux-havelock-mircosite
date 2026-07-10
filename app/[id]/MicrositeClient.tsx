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

export default function MicrositeClient({ image }: ImageProps) {
  const [isIOS, setIsIOS] = useState<boolean | null>(null);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [isSharing, setIsSharing] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const [imageError, setImageError] = useState<boolean>(false);

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
      // Fallback: Copy link to clipboard
      handleCopyLink();
      return;
    }

    setIsSharing(true);
    try {
      // 1. Try to fetch the image file to share it natively
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const filename = imageUrl.substring(imageUrl.lastIndexOf('/') + 1) || 'photo.jpg';
      const file = new File([blob], filename, { type: blob.type || 'image/jpeg' });

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: 'My Captured Memory',
          text: 'Check out my photo from the Lumina Havelock experience!',
        });
      } else {
        // Fallback to sharing the URL directly if files cannot be shared
        await navigator.share({
          url: window.location.href,
          title: 'My Captured Memory',
          text: 'Check out my photo from the Lumina Havelock experience!',
        });
      }
    } catch (err) {
      console.error('Natively sharing image failed, sharing URL instead:', err);
      try {
        await navigator.share({
          url: window.location.href,
          title: 'My Captured Memory',
          text: 'Check out my photo from the Lumina Havelock experience!',
        });
      } catch (shareErr) {
        console.error('Web Share failed completely:', shareErr);
      }
    } finally {
      setIsSharing(false);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <main className="min-h-screen bg-[#EEE8E0] text-[#2C2520] flex flex-col justify-between p-4 sm:p-6 relative overflow-hidden font-sans select-none">
      
      {/* Elegant Double Framing Borders */}
      <div className="absolute inset-4 sm:inset-6 border border-[#AE7FD2]/30 rounded-[2.2rem] pointer-events-none z-0" />
      <div className="absolute inset-[22px] sm:inset-[30px] border border-[#AE7FD2]/50 rounded-[1.9rem] pointer-events-none z-0">
        
        {/* Corner Flourishes */}
        {/* Top-Left */}
        <svg className="absolute top-3 left-3 w-5 h-5 text-[#AE7FD2]/85" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
          <path d="M2,2 L14,2 M2,2 L2,14 M2,2 L10,10" />
          <circle cx="10" cy="10" r="1" fill="currentColor" />
        </svg>
        {/* Top-Right */}
        <svg className="absolute top-3 right-3 w-5 h-5 text-[#AE7FD2]/85 rotate-90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
          <path d="M2,2 L14,2 M2,2 L2,14 M2,2 L10,10" />
          <circle cx="10" cy="10" r="1" fill="currentColor" />
        </svg>
        {/* Bottom-Left */}
        <svg className="absolute bottom-3 left-3 w-5 h-5 text-[#AE7FD2]/85 -rotate-90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
          <path d="M2,2 L14,2 M2,2 L2,14 M2,2 L10,10" />
          <circle cx="10" cy="10" r="1" fill="currentColor" />
        </svg>
        {/* Bottom-Right */}
        <svg className="absolute bottom-3 right-3 w-5 h-5 text-[#AE7FD2]/85 rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
          <path d="M2,2 L14,2 M2,2 L2,14 M2,2 L10,10" />
          <circle cx="10" cy="10" r="1" fill="currentColor" />
        </svg>
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

      {/* Header bar */}
      <header className="w-full max-w-xl mx-auto flex items-center justify-between py-4 relative z-10">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#AE7FD2] animate-pulse" />
          <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#5C5047]">Lumina Experience</span>
        </div>
        <button
          onClick={handleCopyLink}
          className="text-xs font-semibold text-[#5C5047] hover:text-[#AE7FD2] bg-white/50 border border-[#AE7FD2]/20 px-3 py-1.5 rounded-full backdrop-blur-md transition-all active:scale-95 duration-200 cursor-pointer"
        >
          {copied ? 'Link Copied!' : 'Copy Link'}
        </button>
      </header>

      {/* Main Container */}
      <div className="w-full max-w-md mx-auto my-auto relative z-10 flex flex-col items-center gap-5">
        
        {/* Invitation Text Frame */}
        <div className="text-center flex flex-col items-center select-none">
          <h1 className="font-script text-4xl sm:text-5xl text-[#9A69BD] leading-tight tracking-wide">
            Bonjour to
          </h1>
          <h1 className="font-script text-4xl sm:text-5xl text-[#9A69BD] leading-none tracking-wide -mt-1.5">
            Glowing Skin
          </h1>
          <div className="flex items-center justify-center gap-2 text-[#AE7FD2]/60 py-1.5 w-32">
            <div className="flex-1 h-[0.8px] bg-current" />
            <span className="text-[8px]">✦</span>
            <div className="flex-1 h-[0.8px] bg-current" />
          </div>
          <p className="font-serif text-base tracking-[0.08em] text-[#3A302B] uppercase font-semibold">
            Meet us at our Pop-Up
          </p>
        </div>

        {/* Polaroid Card wrapper */}
        <div className="w-full bg-white/50 backdrop-blur-xl border border-white/70 rounded-[2rem] p-5 shadow-[0_8px_30px_rgba(174,127,210,0.1)] flex flex-col gap-5">
          
          {/* Image Display */}
          <div className="relative w-full aspect-[4/5] rounded-[1.4rem] overflow-hidden bg-[#ECE6DD]/80 border border-[#AE7FD2]/15 shadow-inner flex items-center justify-center group">
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
            
            {/* Ambient Image Glow */}
            {imageLoaded && !imageError && (
              <div 
                className="absolute inset-0 scale-[1.08] blur-2xl opacity-15 pointer-events-none transition-all duration-700"
                style={{ backgroundImage: `url(${imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
              />
            )}

            <img
              ref={imgRef}
              src={imageUrl}
              alt="Lumina Souvenir"
              onLoad={() => setImageLoaded(true)}
              onError={() => {
                setImageError(true);
                setImageLoaded(false);
              }}
              className={`w-full h-full object-cover relative z-10 transition-all duration-700 ease-out select-none pointer-events-none ${
                imageLoaded && !imageError ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
              }`}
            />
          </div>

          {/* Action Area */}
          <div className="flex flex-col gap-2.5">
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
                className={`w-full h-13 transition-all duration-300 rounded-xl font-semibold text-white shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98] ${
                  downloadSuccess
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

            {/* Platform notes */}
            {isIOS && (
              <p className="text-[9px] text-center text-[#5C5047] leading-relaxed px-4">
                Tap the button to open the share sheet, then select <strong className="text-zinc-700">"Save Image"</strong>.
              </p>
            )}
            
            {!isIOS && isIOS !== null && (
              <p className="text-[9px] text-center text-[#5C5047] leading-relaxed px-4">
                The image will download automatically to your Downloads folder.
              </p>
            )}
          </div>

        </div>

      </div>

      {/* Footer */}
      <footer className="w-full text-center py-4 relative z-10">
        <p className="text-[9px] text-[#5C5047]/60 tracking-wider">
          © {new Date().getFullYear()} Lumina Havelock • Powered by FLYXTO
        </p>
      </footer>
    </main>
  );
}
