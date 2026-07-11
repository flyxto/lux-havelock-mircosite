import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bonjour to Glowing Skin',
  description: 'Bonjour to Glowing Skin',
};

// Hardcoded user-calibrated layout coordinates
const FLOWER_CONFIG = {
  flower1: { size: 250, rotation: 20, x: -141, y: 105 },
  flower2: { size: 322, rotation: 185, x: -133, y: -175 },
  flower3: { size: 264, rotation: 45, x: -96, y: -144 },
  flower4: { size: 260, rotation: 320, x: -180, y: 14 },
};

export default function RootPage() {
  return (
    <main className="min-h-screen bg-[#EEE8E0] text-[#2C2520] flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans select-none">
      
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

      {/* Centered Giant Calligraphy Heading */}
      <div className="text-center relative z-10 flex flex-col items-center max-w-lg px-4 select-none">
        <img src="/images/Lux-Logo-flat.png" alt="LUX Logo" className="w-24 sm:w-28 h-auto object-contain brightness-0 mb-2 sm:mb-3" />
        <h1 className="font-script text-7xl sm:text-9xl text-[#9A69BD] leading-tight tracking-wide">
          Bonjour to
        </h1>
        <h1 className="font-script text-7xl sm:text-9xl text-[#9A69BD] leading-none tracking-wide -mt-3 sm:-mt-5">
          Glowing Skin
        </h1>
      </div>

    </main>
  );
}
