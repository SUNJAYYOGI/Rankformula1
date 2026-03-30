import React, { useState, useEffect } from 'react';

const Proofs = () => {
  const [videoProofs, setVideoProofs] = useState([]);
  const [recentWinners, setRecentWinners] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [activeVideoId, setActiveVideoId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [proofsRes, winnersRes] = await Promise.all([
          fetch('https://rank-backend-test.onrender.com/api/proofs'),
          fetch('https://rank-backend-test.onrender.com/api/recent-winners')
        ]);
        
        const proofsData = await proofsRes.json();
        const winnersData = await winnersRes.json();
        
        setVideoProofs(proofsData);
        setRecentWinners(winnersData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching proofs and winners:", error);
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const extractYoutubeId = (url) => {
    if (!url) return null;
    const regExp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?|shorts)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
    const match = url.match(regExp);
    return match ? match[1] : null;
  };

  const getYoutubeThumbnail = (url) => {
    const videoId = extractYoutubeId(url);
    if (videoId) {
      return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`; 
    }
    return 'https://placehold.co/400x600/1e293b/FFFFFF?text=Invalid+Link'; 
  };

  if (isLoading) {
    return (
      <div className="py-20 text-center">
        <div className="text-brand-gold font-bold animate-pulse text-lg">Loading Winners & Proofs...</div>
      </div>
    );
  }

  return (
    <section className="py-12 px-4 max-w-full overflow-hidden relative">
      
      {/* --- CSS FOR INFINITE SCROLLING (SPEED INCREASED) --- */}
      <style>
        {`
          @keyframes scroll-left {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          @keyframes scroll-right {
            0% { transform: translateX(-50%); }
            100% { transform: translateX(0); }
          }
          /* Pehle 30s tha, ab 15s kar diya hai 2x speed ke liye */
          .animate-scroll-left {
            animation: scroll-left 15s linear infinite;
          }
          .animate-scroll-right {
            animation: scroll-right 15s linear infinite;
          }
          /* Pause animation on hover */
          .scroll-container:hover .animate-scroll-left,
          .scroll-container:hover .animate-scroll-right {
            animation-play-state: paused;
          }
        `}
      </style>

      {/* --- SECTION 1: Winning Proofs (Videos) --- */}
      <div id="proofs-section" className="text-center mb-10 scroll-mt-24 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-2">Winning <span className="text-brand-pink italic">Proofs</span></h2>
        <p className="text-gray-400">Real screenshots from our winners</p>
      </div>

      {videoProofs.length > 0 ? (
        // Container for Left Scrolling
        <div className="scroll-container w-full overflow-hidden relative mb-16">
          <div className="flex gap-6 w-max animate-scroll-left px-3">
            {[1, 2].map((setIndex) => (
              <React.Fragment key={`video-set-${setIndex}`}>
                {videoProofs.map((video) => {
                  const videoId = extractYoutubeId(video.youtube_url);
                  return (
                    <div 
                      key={`video-${setIndex}-${video.id}`} 
                      onClick={() => videoId && setActiveVideoId(videoId)}
                      className="w-[260px] sm:w-[280px] flex-shrink-0 relative rounded-2xl overflow-hidden shadow-[0_5px_15px_rgba(0,0,0,0.5)] border border-gray-700/60 group cursor-pointer"
                    >
                      <img 
                        src={getYoutubeThumbnail(video.youtube_url)} 
                        alt={video.title} 
                        className="w-full h-[400px] sm:h-[450px] object-cover opacity-85 group-hover:opacity-100 transition-transform duration-500 group-hover:scale-105" 
                      />
                      
                      <div className="absolute top-3 left-3 bg-green-500 text-white text-xs uppercase font-bold px-3 py-1.5 rounded-full shadow-lg z-10">
                        {video.winning_amount}
                      </div>

                      <div className="absolute inset-0 flex items-center justify-center">
                         <div className="bg-brand-pink/90 rounded-full p-4 shadow-[0_0_20px_rgba(236,72,153,0.8)] group-hover:scale-110 transition-transform">
                            <svg className="w-8 h-8 text-white pl-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                         </div>
                      </div>

                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-5 pt-12">
                        <h4 className="text-white font-bold text-sm sm:text-base leading-tight truncate">{video.title}</h4>
                      </div>
                    </div>
                  );
                })}
              </React.Fragment>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-gray-500 text-sm w-full text-center mb-16">No proofs uploaded yet.</div>
      )}


      {/* --- SECTION 2: Our Recent Winners --- */}
      <div id="winners-section" className="text-center mt-12 mb-10 scroll-mt-24 max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-white">Our Recent <span className="text-brand-gold italic">Winners</span></h2>
      </div>

      {recentWinners.length > 0 ? (
        // Container for Right Scrolling (Opposite Direction)
        <div className="scroll-container w-full overflow-hidden relative pb-10">
          <div className="flex gap-6 w-max animate-scroll-right px-3">
            {[1, 2].map((setIndex) => (
              <React.Fragment key={`winner-set-${setIndex}`}>
                {recentWinners.map((winner) => (
                  <div 
                    key={`winner-${setIndex}-${winner.id}`} 
                    className="w-[200px] sm:w-[240px] flex-shrink-0 bg-slate-800/80 backdrop-blur-md rounded-[24px] p-6 flex flex-col items-center border border-slate-700/60 shadow-xl hover:border-brand-gold/40 transition-colors group cursor-pointer"
                  >
                    <div className="bg-gradient-to-r from-brand-gold to-yellow-600 text-black text-[11px] sm:text-xs font-black px-3 py-1 rounded-md mb-4 shadow-md">
                       RANK #{winner.rank}
                    </div>
                    
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-slate-700 border-[3px] border-brand-pink flex items-center justify-center text-3xl font-black text-white mb-4 overflow-hidden shadow-inner uppercase relative">
                       {winner.profile_pic_url ? (
                         <img 
                           src={winner.profile_pic_url} 
                           alt={winner.name} 
                           className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                         />
                       ) : (
                         <span>{winner.name.charAt(0)}</span>
                       )}
                       <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                    </div>

                    <h5 className="text-white font-bold text-base sm:text-lg mb-1 text-center w-full truncate">{winner.name}</h5>
                    <div className="text-green-400 font-black text-xl sm:text-2xl leading-tight drop-shadow-md mb-1">{winner.amount_won}</div>
                    <div className="text-gray-400 text-xs sm:text-sm mt-1 uppercase tracking-widest text-center w-full truncate">{winner.match_name}</div>
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-gray-500 text-sm w-full text-center">No recent winners uploaded yet.</div>
      )}

      {/* --- VIDEO PLAYER MODAL (POP-UP) --- */}
      {activeVideoId && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-sm sm:max-w-3xl bg-black rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] border border-gray-700">
            
            <button 
              onClick={() => setActiveVideoId(null)}
              className="absolute top-2 right-2 sm:top-4 sm:right-4 z-50 bg-slate-800/80 text-white rounded-full p-2 hover:bg-brand-pink transition-colors backdrop-blur-md shadow-lg"
            >
              <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>

            <div className="relative pt-[177.78%] sm:pt-[56.25%] w-full bg-black">
              <iframe 
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube.com/embed/${activeVideoId}?autoplay=1&rel=0`}
                title="Winning Proof Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
            
          </div>
        </div>
      )}

    </section>
  );
};

export default Proofs;