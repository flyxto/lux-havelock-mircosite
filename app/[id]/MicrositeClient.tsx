'use client';

import { useState, useEffect, useRef } from 'react';
import { Download, Share2, Image as ImageIcon, CheckCircle, ArrowDown, ExternalLink } from 'lucide-react';

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
    <main className="min-h-screen bg-[#070709] text-zinc-100 flex flex-col justify-between p-4 sm:p-6 relative overflow-hidden font-sans select-none">
      {/* Background Decorative Glow Elements */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-violet-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-teal-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[150px] pointer-events-none" />

      {/* Header bar */}
      <header className="w-full max-w-xl mx-auto flex items-center justify-between py-4 relative z-10">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-violet-500 animate-pulse" />
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-zinc-400">Lumina Experience</span>
        </div>
        <button
          onClick={handleCopyLink}
          className="text-xs font-medium text-zinc-400 hover:text-white bg-zinc-900/60 border border-zinc-800/80 px-3 py-1.5 rounded-full backdrop-blur-md transition-all active:scale-95 duration-200 cursor-pointer"
        >
          {copied ? 'Link Copied!' : 'Copy Link'}
        </button>
      </header>

      {/* Main Container */}
      <div className="w-full max-w-md mx-auto my-auto relative z-10 flex flex-col items-center">
        <div className="w-full bg-zinc-950/40 backdrop-blur-2xl border border-white/[0.08] rounded-[2.5rem] p-5 sm:p-6 shadow-2xl flex flex-col gap-6">
          
          {/* Image Display */}
          <div className="relative w-full aspect-[4/5] rounded-[1.8rem] overflow-hidden bg-zinc-900/80 border border-white/[0.04] shadow-inner flex items-center justify-center group">
            {!imageLoaded && !imageError && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <div className="w-10 h-10 border-3 border-violet-500/20 border-t-violet-500 rounded-full animate-spin" />
                <span className="text-xs text-zinc-500">Loading your memory...</span>
              </div>
            )}

            {imageError && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center z-20 bg-zinc-950/80">
                <ImageIcon className="w-12 h-12 text-zinc-650 mb-1" />
                <span className="text-sm font-semibold text-zinc-300">Preview Unavailable</span>
                <span className="text-xs text-zinc-500 leading-normal">
                  The image preview failed to load. However, the download and share buttons below remain fully functional.
                </span>
              </div>
            )}
            
            {/* Ambient Image Glow */}
            {imageLoaded && !imageError && (
              <div 
                className="absolute inset-0 scale-[1.08] blur-2xl opacity-20 pointer-events-none transition-all duration-700"
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
          <div className="flex flex-col gap-3">
            {isIOS === null ? (
              // Loading fallback skeleton
              <div className="h-14 w-full bg-zinc-800/40 animate-pulse rounded-2xl" />
            ) : isIOS ? (
              // iOS Native Share Trigger
              <button
                onClick={handleShare}
                disabled={isSharing}
                className="w-full h-14 bg-gradient-to-r from-violet-600 via-indigo-600 to-indigo-700 hover:from-violet-500 hover:to-indigo-600 active:scale-[0.98] disabled:opacity-75 transition-all duration-300 rounded-2xl font-semibold text-white shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2.5 cursor-pointer relative overflow-hidden"
              >
                {isSharing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    <span>Preparing Share...</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-5 h-5" />
                    <span>Share & Save Image</span>
                  </>
                )}
              </button>
            ) : (
              // Android & PC Direct Download
              <button
                onClick={handleDownload}
                disabled={isDownloading || downloadSuccess}
                className={`w-full h-14 transition-all duration-300 rounded-2xl font-semibold text-white shadow-lg flex items-center justify-center gap-2.5 cursor-pointer active:scale-[0.98] ${
                  downloadSuccess
                    ? 'bg-emerald-600 shadow-emerald-600/20'
                    : 'bg-gradient-to-r from-violet-600 via-indigo-600 to-indigo-700 hover:from-violet-500 hover:to-indigo-600 shadow-indigo-600/20'
                }`}
              >
                {isDownloading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    <span>Downloading...</span>
                  </>
                ) : downloadSuccess ? (
                  <>
                    <CheckCircle className="w-5 h-5 animate-bounce" />
                    <span>Saved Successfully!</span>
                  </>
                ) : (
                  <>
                    <Download className="w-5 h-5" />
                    <span>Download Image</span>
                  </>
                )}
              </button>
            )}

            {/* iOS specific note */}
            {isIOS && (
              <p className="text-[10px] text-center text-zinc-500 mt-1 leading-relaxed px-4">
                Tap the button to open the share sheet, then select <strong className="text-zinc-400">"Save Image"</strong> to store it in your Photos library.
              </p>
            )}
            
            {/* PC/Android specific note */}
            {!isIOS && isIOS !== null && (
              <p className="text-[10px] text-center text-zinc-500 mt-1 leading-relaxed px-4">
                The image will download automatically to your device's Downloads directory.
              </p>
            )}
          </div>

        </div>
      </div>

      {/* Footer */}
      <footer className="w-full text-center py-6 relative z-10">
        <p className="text-[10px] text-zinc-600 tracking-wider">
          © {new Date().getFullYear()} Lumina Havelock • Powered by FLYXTO
        </p>
      </footer>
    </main>
  );
}
