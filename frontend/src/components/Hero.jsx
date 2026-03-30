import React, { useState, useEffect } from 'react';
import govtImg from '../assets/govt.png';
import isoImg from '../assets/iso.png';
import moneyBackImg from '../assets/moneyback.jpg';

// Tailwind ke colors purge na ho jayein, isliye pura class naam likhna padta hai
const themeGradients = {
  blue: "from-blue-600 to-blue-900",
  yellow: "from-yellow-400 to-yellow-600 text-black", // CSK style
  red: "from-red-600 to-red-900",
  emerald: "from-emerald-500 to-emerald-800",
  purple: "from-purple-600 to-purple-900",
  orange: "from-orange-500 to-orange-800",
  pink: "from-pink-500 to-pink-800",
  green: "from-green-500 to-green-800",
};

const Hero = ({ setActiveTab }) => {
  const [matchData, setMatchData] = useState(null);
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [isLoading, setIsLoading] = useState(true);
  
  // DYNAMIC STATE: Backend se aane wali saari settings yahan aayengi
  const [siteSettings, setSiteSettings] = useState({ 
    telegram_link: '#', 
    whatsapp_number: '9461717755', // Future proofing just in case
    daily_booking_count: 84 // Default, backend se overwrite hoga
  });

  // 1. Backend se Match Data & Settings Fetch karna
  useEffect(() => {
    Promise.all([
      fetch('https://rank-backend-test.onrender.com/api/active-match').then(res => res.json()),
      fetch('https://rank-backend-test.onrender.com/api/site-settings').then(res => res.json())
    ])
    .then(([match, settings]) => {
      setMatchData(match);
      if(settings && !settings.detail) setSiteSettings(settings);
      setIsLoading(false);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    });
  }, []);

  // 2. Asli Countdown Timer Logic
  useEffect(() => {
    if (!matchData || !matchData.match_time) return;

    const targetTime = new Date(matchData.match_time).getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetTime - now;

      if (difference > 0) {
        const hours = Math.floor((difference / (1000 * 60 * 60)));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        
        setTimeLeft({ hours, minutes, seconds });
      } else {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [matchData]);

  // Format date for UI (Locked to IST - Indian Standard Time)
  const formatMatchDate = (dateString) => {
    if (!dateString) return "";
    
    const date = new Date(dateString);
    
    // Explicitly Asia/Kolkata (IST) set kar diya
    const options = { 
      timeZone: 'Asia/Kolkata', 
      day: '2-digit', 
      month: 'short', 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    };
    
    // Output example: "01 Apr, 07:30 pm"
    return date.toLocaleString('en-IN', options).toUpperCase(); 
  };

  return (
    <section className="relative px-4 pt-10 pb-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div className="relative z-10 flex flex-col items-center">
        
        {/* --- TOP HERO SECTION (Headline & Stats) --- */}
        <div className="w-full max-w-4xl mx-auto mb-12 text-center mt-2 sm:mt-6">
          <h1 className="text-4xl sm:text-5xl md:text-[56px] font-black text-white leading-[1.15] tracking-tight mb-10">
            Book Your <span className="text-brand-gold">First Rank</span> Now<br className="hidden sm:block" /> & Win Guaranteed
          </h1>

          <div className="grid grid-cols-3 gap-3 sm:gap-6 max-w-3xl mx-auto">
            <div className="bg-[#13192b]/80 backdrop-blur-md border border-gray-800/60 rounded-2xl p-4 sm:p-6 flex flex-col items-center justify-center transition-transform hover:-translate-y-1 shadow-lg">
              <div className="text-2xl sm:text-4xl font-black text-white mb-1 tracking-tight">50K+</div>
              <div className="text-[10px] sm:text-xs text-gray-400 font-medium tracking-wide uppercase">Happy Users</div>
            </div>
            <div className="bg-[#13192b]/80 backdrop-blur-md border border-gray-800/60 rounded-2xl p-4 sm:p-6 flex flex-col items-center justify-center transition-transform hover:-translate-y-1 shadow-lg">
              <div className="text-2xl sm:text-4xl font-black text-white mb-1 tracking-tight">92%</div>
              <div className="text-[10px] sm:text-xs text-gray-400 font-medium tracking-wide uppercase">Success Rate</div>
            </div>
            <div className="bg-[#13192b]/80 backdrop-blur-md border border-gray-800/60 rounded-2xl p-4 sm:p-6 flex flex-col items-center justify-center transition-transform hover:-translate-y-1 shadow-lg">
              <div className="text-2xl sm:text-4xl font-black text-white mb-1 tracking-tight">₹5Cr+</div>
              <div className="text-[10px] sm:text-xs text-gray-400 font-medium tracking-wide uppercase">Total Winnings</div>
            </div>
          </div>
        </div>

        {/* Live Now Badge */}
        <div className="relative z-20 inline-flex items-center px-5 py-2 -mb-4 text-xs font-black text-green-400 border border-green-500/50 rounded-full animate-pulse shadow-[0_0_20px_rgba(34,197,94,0.4)] bg-[#0f172a] tracking-widest">
          <span className="inline-block w-2.5 h-2.5 mr-2 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.8)]"></span>
          LIVE NOW
        </div>

        {/* --- MAIN MATCH CARD (COMPACT & WIDE) --- */}
        <div 
          className="w-full max-w-4xl p-6 sm:p-8 border shadow-[0_15px_50px_rgba(0,0,0,0.8)] rounded-[32px] border-slate-700/60 flex flex-col justify-between overflow-hidden relative"
          style={{
            backgroundImage: matchData?.bg_image_url ? `linear-gradient(rgba(15, 23, 42, 0.4), rgba(15, 23, 42, 0.85)), url(${matchData.bg_image_url})` : 'none',
            backgroundColor: matchData?.bg_image_url ? 'transparent' : 'rgba(15, 23, 42, 0.95)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {isLoading ? (
            <div className="text-center text-brand-pink animate-pulse font-bold text-xl z-10 py-20 relative">Loading Match Details...</div>
          ) : matchData ? (
            <div className="relative z-10 w-full mx-auto">
              
              {/* Card Title */}
              <div className="text-center mb-6 mt-2">
                <h4 className="text-xs sm:text-sm font-black text-white tracking-[0.2em] uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                  {matchData.title}
                </h4>
              </div>

              {/* Teams & VS Section */}
              <div className="flex items-center justify-between px-2 mb-6 relative">
                
                {/* Team 1 */}
                <div className="flex flex-col items-center w-1/3">
                  <div className={`flex items-center justify-center w-20 h-20 sm:w-28 sm:h-28 mb-3 text-2xl sm:text-4xl font-black rounded-full shadow-[0_0_20px_rgba(0,0,0,0.6)] bg-gradient-to-br ${themeGradients[matchData.team_1_color] || themeGradients.blue} text-white border-4 border-white/20`}>
                    {matchData.team_1_name}
                  </div>
                  <div className="text-center text-xs sm:text-sm font-bold text-white px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-sm border border-white/10 leading-tight">
                    {matchData.team_1_full_name}
                  </div>
                </div>

                {/* VS Badge */}
                <div className="flex flex-col items-center justify-center z-10 w-1/3">
                  <div className="bg-[#1e293b]/80 backdrop-blur-md text-white font-black text-xl sm:text-3xl italic px-4 py-2 sm:px-6 sm:py-3 rounded-2xl shadow-[0_0_15px_rgba(0,0,0,0.5)] border border-slate-600">
                    VS
                  </div>
                </div>

                {/* Team 2 */}
                <div className="flex flex-col items-center w-1/3">
                  <div className={`flex items-center justify-center w-20 h-20 sm:w-28 sm:h-28 mb-3 text-2xl sm:text-4xl font-black rounded-full shadow-[0_0_20px_rgba(0,0,0,0.6)] bg-gradient-to-br ${themeGradients[matchData.team_2_color] || themeGradients.red} text-white border-4 border-white/20`}>
                    {matchData.team_2_name}
                  </div>
                  <div className="text-center text-xs sm:text-sm font-bold text-white px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-sm border border-white/10 leading-tight">
                    {matchData.team_2_full_name}
                  </div>
                </div>

              </div>

              {/* Location & Date Box */}
              <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-6 mb-6">
                <div className="bg-black/50 backdrop-blur-sm border border-white/10 rounded-full px-4 py-1.5 flex items-center shadow-inner">
                  <svg className="w-4 h-4 mr-1.5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  <span className="text-xs sm:text-sm font-bold text-gray-200">{formatMatchDate(matchData.match_time)}</span>
                </div>
                <div className="bg-black/50 backdrop-blur-sm border border-white/10 rounded-full px-4 py-1.5 flex items-center shadow-inner">
                  <svg className="w-4 h-4 mr-1.5 text-brand-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                  <span className="text-xs sm:text-sm font-bold text-gray-200 truncate max-w-[200px] sm:max-w-none">{matchData.location}</span>
                </div>
              </div>

              {/* Compact Countdown Timer */}
              <div className="bg-black/60 border border-white/10 backdrop-blur-md rounded-2xl py-3 px-6 mx-auto max-w-sm flex justify-center items-center gap-6 shadow-[0_5px_15px_rgba(0,0,0,0.5)]">
                <div className="flex flex-col items-center">
                  <span className="text-3xl sm:text-4xl font-black tabular-nums text-white leading-none tracking-tight">{String(timeLeft.hours).padStart(2, '0')}</span>
                  <span className="text-[10px] text-gray-400 mt-1 font-bold">HRS</span>
                </div>
                <span className="text-2xl font-black text-gray-600 -mt-3">:</span>
                <div className="flex flex-col items-center">
                  <span className="text-3xl sm:text-4xl font-black tabular-nums text-white leading-none tracking-tight">{String(timeLeft.minutes).padStart(2, '0')}</span>
                  <span className="text-[10px] text-gray-400 mt-1 font-bold">MIN</span>
                </div>
                <span className="text-2xl font-black text-gray-600 -mt-3">:</span>
                <div className="flex flex-col items-center">
                  <span className="text-3xl sm:text-4xl font-black tabular-nums text-brand-pink leading-none tracking-tight">{String(timeLeft.seconds).padStart(2, '0')}</span>
                  <span className="text-[10px] text-gray-400 mt-1 font-bold">SEC</span>
                </div>
              </div>

            </div>
          ) : (
            <div className="text-center text-gray-400 font-bold text-xl z-10 relative bg-black/50 py-10 rounded-2xl">No active matches available right now.</div>
          )}
        </div>

        {/* --- DYNAMIC BOOKING ALERT --- */}
        <div className="mt-8 px-6 py-2.5 bg-green-500/10 text-green-400 border border-green-500/20 rounded-full text-sm font-bold flex items-center shadow-lg">
          <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
          {siteSettings.daily_booking_count} people booked today
        </div>

        {/* Trust Badges Row */}
        <div className="grid w-full max-w-2xl grid-cols-3 gap-4 sm:gap-6 mt-8">
          <div className="flex flex-col items-center justify-center text-center group">
             <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#13192b]/80 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-2 p-2.5 border border-slate-700/50 shadow-lg">
                <img src={govtImg} alt="Govt Verified" className="w-full h-full object-contain filter drop-shadow-md" />
             </div>
             <span className="text-xs font-bold text-gray-300">Govt Verified</span>
          </div>
          <div className="flex flex-col items-center justify-center text-center group">
             <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#13192b]/80 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-2 p-2.5 border border-slate-700/50 shadow-lg">
                <img src={isoImg} alt="ISO 9001" className="w-full h-full object-contain filter drop-shadow-md" />
             </div>
             <span className="text-xs font-bold text-gray-300">ISO 9001</span>
          </div>
          <div className="flex flex-col items-center justify-center text-center group">
             <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#13192b]/80 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-2 p-2.5 border border-slate-700/50 shadow-lg">
                <img src={moneyBackImg} alt="Money Back Guarantee" className="w-full h-full object-contain filter drop-shadow-md" />
             </div>
             <span className="text-xs font-bold text-gray-300">Money Back</span>
          </div>
        </div>

        {/* --- DYNAMIC MATCH POSTER --- */}
        {matchData?.poster_image_url && (
          <div className="w-full max-w-2xl mx-auto mt-12 rounded-3xl overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.5)] border border-slate-700/60">
            <img 
              src={matchData.poster_image_url} 
              alt="Today's Match Poster" 
              className="w-full h-auto object-cover"
            />
          </div>
        )}

        {/* --- PREMIUM ACTION BUTTONS (DYNAMIC TELEGRAM) --- */}
        <div className="w-full max-w-2xl flex flex-col sm:flex-row gap-4 mt-10">
          {/* Naya Button with React onClick logic */}
          <button 
            onClick={() => {
              if(setActiveTab) setActiveTab('packages');
              window.scrollTo({ top: 0, behavior: 'smooth' }); 
            }}
            className="w-full sm:w-1/2 py-4 bg-gradient-to-r from-brand-pink to-purple-600 hover:from-brand-pink/90 hover:to-purple-600/90 text-white text-lg font-black text-center rounded-2xl shadow-[0_5px_20px_rgba(236,72,153,0.3)] transition-transform active:scale-95 flex flex-col items-center justify-center cursor-pointer border-none outline-none"
          >
            <span>Book Your Rank Now</span>
            <span className="text-[10px] font-bold uppercase mt-0.5 text-pink-200 tracking-wider">Only 3 slots left today!</span>
          </button>

          <a 
            href={siteSettings.telegram_link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full sm:w-1/2 py-4 bg-[#2AABEE] hover:bg-[#2298d6] text-white text-lg font-black text-center rounded-2xl shadow-[0_5px_20px_rgba(42,171,238,0.3)] flex items-center justify-center space-x-2 transition-transform active:scale-95"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.19-.08-.05-.19-.02-.27 0-.12.03-1.96 1.25-5.54 3.69-.52.36-1 .53-1.42.52-.47-.01-1.37-.26-2.03-.48-.81-.27-1.45-.41-1.39-.86.03-.24.36-.48.98-.74 3.84-1.68 6.4-2.78 7.68-3.32 3.63-1.52 4.38-1.78 4.88-1.79.11 0 .35.03.48.14.11.09.14.22.15.34-.01.07-.01.16-.02.26z"/></svg>
            <span>Join Free Telegram</span>
          </a>
        </div>

      </div>
    </section>
  );
};

export default Hero;