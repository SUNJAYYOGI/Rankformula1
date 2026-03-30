import React, { useState, useEffect } from 'react';

const BottomNav = ({ activeTab, setActiveTab }) => {
  // DYNAMIC STATE: Backend se WhatsApp aur Telegram ke links aayenge
  const [siteSettings, setSiteSettings] = useState({ whatsapp_number: '9461717755', telegram_link: '#' });

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/site-settings')
      .then(res => res.json())
      .then(data => {
        if (data && !data.detail) {
          setSiteSettings(data);
        }
      })
      .catch(err => console.error("Error fetching site settings:", err));
  }, []);

  // Tab switch karna aur smooth scroll karna
  const handleScrollToSection = (sectionId) => {
    setActiveTab('home');
    
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <>
      {/* Floating Action Buttons (WhatsApp & Telegram - DYNAMIC) */}
      <div className="fixed z-50 flex flex-col gap-3 right-4 bottom-36">
        <a href={siteSettings.telegram_link} target="_blank" rel="noreferrer" className="bg-[#0088cc] p-3 rounded-full shadow-lg hover:scale-110 transition-transform">
          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.46.93-4.12 2.73-.39.26-.74.39-1.06.38-.35-.01-1.02-.2-1.52-.36-.61-.2-1.09-.31-1.06-.66.02-.18.27-.36.75-.55 2.94-1.28 4.9-2.12 5.88-2.53 2.79-1.16 3.37-1.36 3.75-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .24z"/></svg>
        </a>
        <a href={`https://wa.me/${siteSettings.whatsapp_number}`} target="_blank" rel="noreferrer" className="bg-[#25D366] p-3 rounded-full shadow-lg hover:scale-110 transition-transform">
          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.347-.272.273-1.04 1.02-1.04 2.486s1.065 2.88 1.213 3.078c.149.198 2.095 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
        </a>
      </div>

      {/* PRICE UPDATE HI YAHAN 999 KI JAGAH 1999 */}
      <div className="fixed z-40 w-[90%] max-w-sm -translate-x-1/2 bottom-28 left-1/2 md:hidden">
         <button 
            onClick={() => {
              setActiveTab('packages');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center justify-center w-full text-lg font-bold text-white transition-transform rounded-2xl py-3.5 shadow-[0_5px_20px_rgba(147,51,234,0.4)] bg-gradient-to-r from-purple-600 to-indigo-600 animate-pulse active:scale-95 border-none outline-none cursor-pointer"
          >
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
            Book Slot Now - Starting ₹1999
         </button>
      </div>

      <div className="fixed z-50 w-[95%] max-w-md -translate-x-1/2 bottom-6 left-1/2">
        <nav className="overflow-hidden border shadow-2xl bg-[#0a0e17]/85 backdrop-blur-xl border-gray-700/50 rounded-full">
          <div className="flex items-center justify-around h-20 px-2">
            
            <button 
              onClick={() => {
                setActiveTab('home');
                window.scrollTo({ top: 0, behavior: 'smooth' }); 
              }} 
              className={`flex flex-col items-center justify-center w-full transform transition-all active:scale-95 border-none outline-none bg-transparent cursor-pointer ${activeTab === 'home' ? 'text-brand-pink scale-110' : 'text-gray-400 hover:text-white'}`}
            >
              <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
              <span className="text-[10px] font-semibold tracking-wide">Home</span>
            </button>

            <a 
              href={siteSettings.telegram_link} 
              target="_blank" 
              rel="noreferrer"
              className="flex flex-col items-center justify-center w-full text-gray-400 transition-colors transform hover:text-white active:scale-95"
            >
              <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
              <span className="text-[10px] font-medium tracking-wide">Telegram</span>
            </a>

            <button 
              onClick={() => handleScrollToSection('proofs-section')}
              className="flex flex-col items-center justify-center w-full text-gray-400 transition-colors transform hover:text-white active:scale-95 border-none outline-none bg-transparent cursor-pointer"
            >
              <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              <span className="text-[10px] font-medium tracking-wide">Proofs</span>
            </button>

            <button 
              onClick={() => handleScrollToSection('winners-section')}
              className="flex flex-col items-center justify-center w-full text-gray-400 transition-colors transform hover:text-white active:scale-95 border-none outline-none bg-transparent cursor-pointer"
            >
              <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
              <span className="text-[10px] font-medium tracking-wide">Winners</span>
            </button>

            <button 
              onClick={() => {
                setActiveTab('packages');
                window.scrollTo({ top: 0, behavior: 'smooth' }); 
              }} 
              className={`flex flex-col items-center justify-center w-full transform transition-all active:scale-95 border-none outline-none bg-transparent cursor-pointer ${activeTab === 'packages' ? 'text-brand-pink scale-110' : 'text-gray-400 hover:text-white'}`}
            >
              <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>
              <span className="text-[10px] font-medium tracking-wide">Packages</span>
            </button>

          </div>
        </nav>
      </div>
    </>
  );
};

export default BottomNav;