import { Metadata } from 'next';
import { Camera, QrCode, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Lumina Havelock Experience Portal',
  description: 'Access your high-quality souvenirs and digital memories from the Lumina Havelock experience.',
};

export default function RootPage() {
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
      <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.6" className="absolute top-8 left-8 w-44 h-44 opacity-[0.14] text-[#AE7FD2] pointer-events-none z-0">
        <path d="M 0,0 C 15,20 22,45 35,70" />
        <path d="M 12,12 C 8,18 10,24 16,22 C 20,20 18,14 12,12 Z" fill="currentColor" fillOpacity="0.05" />
        <path d="M 18,20 C 15,28 18,33 22,29 C 25,26 21,21 18,20 Z" fill="currentColor" fillOpacity="0.05" />
        <path d="M 23,29 C 21,37 25,41 29,36 C 31,33 26,29 23,29 Z" fill="currentColor" fillOpacity="0.05" />
        <path d="M 14,10 C 20,6 25,10 22,15 C 19,17 15,13 14,10 Z" fill="currentColor" fillOpacity="0.05" />
        <path d="M 20,18 C 27,16 30,22 26,25 C 23,26 20,21 20,18 Z" fill="currentColor" fillOpacity="0.05" />
      </svg>
      <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.6" className="absolute bottom-8 right-8 w-44 h-44 opacity-[0.14] text-[#AE7FD2] pointer-events-none z-0 rotate-180">
        <path d="M 0,0 C 15,20 22,45 35,70" />
        <path d="M 12,12 C 8,18 10,24 16,22 C 20,20 18,14 12,12 Z" fill="currentColor" fillOpacity="0.05" />
        <path d="M 18,20 C 15,28 18,33 22,29 C 25,26 21,21 18,20 Z" fill="currentColor" fillOpacity="0.05" />
        <path d="M 23,29 C 21,37 25,41 29,36 C 31,33 26,29 23,29 Z" fill="currentColor" fillOpacity="0.05" />
        <path d="M 14,10 C 20,6 25,10 22,15 C 19,17 15,13 14,10 Z" fill="currentColor" fillOpacity="0.05" />
        <path d="M 20,18 C 27,16 30,22 26,25 C 23,26 20,21 20,18 Z" fill="currentColor" fillOpacity="0.05" />
      </svg>

      {/* Header */}
      <header className="w-full max-w-xl mx-auto flex items-center justify-center py-4 relative z-10">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#AE7FD2] animate-pulse" />
          <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#5C5047]">Lumina Havelock</span>
        </div>
      </header>

      {/* Main Card */}
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

        <div className="w-full bg-white/50 backdrop-blur-xl border border-white/70 rounded-[2.5rem] p-7 sm:p-8 text-center shadow-[0_8px_30px_rgba(174,127,210,0.1)] flex flex-col items-center gap-6">
          <div className="w-14 h-14 bg-[#AE7FD2]/10 border border-[#AE7FD2]/20 rounded-2xl flex items-center justify-center text-[#AE7FD2]">
            <Camera className="w-7 h-7" />
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-bold text-zinc-800 tracking-tight uppercase">
              Capture Your Souvenir
            </h2>
            <p className="text-xs text-[#5C5047] leading-relaxed px-2 font-medium">
              Scan the custom QR code presented at the terminal display at the end of your Lumina experience.
            </p>
          </div>

          <div className="w-full border-t border-[#AE7FD2]/15 my-1" />

          {/* Guide Steps */}
          <div className="w-full flex flex-col gap-3.5 text-left">
            <div className="flex items-start gap-4 p-3.5 bg-white/40 rounded-xl border border-white/60">
              <div className="w-7 h-7 bg-[#AE7FD2]/10 border border-[#AE7FD2]/20 rounded-lg flex items-center justify-center text-[#AE7FD2] text-xs font-bold shrink-0">
                1
              </div>
              <div>
                <h3 className="text-xs font-bold text-zinc-850 uppercase tracking-wide">Scan QR Code</h3>
                <p className="text-[11px] text-[#5C5047] leading-normal font-medium mt-0.5">Scan the QR code displayed at the photo booth with your phone's camera.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-3.5 bg-white/40 rounded-xl border border-white/60">
              <div className="w-7 h-7 bg-[#AE7FD2]/10 border border-[#AE7FD2]/20 rounded-lg flex items-center justify-center text-[#AE7FD2] text-xs font-bold shrink-0">
                2
              </div>
              <div>
                <h3 className="text-xs font-bold text-zinc-850 uppercase tracking-wide">View & Save</h3>
                <p className="text-[11px] text-[#5C5047] leading-normal font-medium mt-0.5">Save the digital copy directly to your photo album or share it with friends.</p>
              </div>
            </div>
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
