import React, { useState, useEffect } from 'react';

const Header = ({ setActiveTab }) => {
  // NAYA STATE: Backend se dynamic WhatsApp aur Telegram link store karne ke liye
  const [siteSettings, setSiteSettings] = useState({ whatsapp_number: '9461717755', telegram_link: '#' });

  // Backend API fetch call
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

  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-4 bg-transparent">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setActiveTab('home')}
              className="flex items-center text-gray-300 transition-colors hover:text-white"
            >
              <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
              <span className="text-sm font-medium">Back</span>
            </button>
            <span className="text-gray-600">|</span>
            <button 
              onClick={() => setActiveTab('packages')} 
              className="text-sm font-medium text-gray-300 transition-colors hover:text-white"
            >
              Packages
            </button>
          </div>

          <div className="flex items-center">
             <span className="text-2xl italic font-black tracking-tighter">
                <span className="text-white">RANK</span>
                <span className="text-3xl text-brand-gold">.</span>
             </span>
          </div>

          <div className="flex items-center">
            {/* YAHAN DYNAMIC WHATSAPP NUMBER SET KIYA GAYA HAI */}
            <a 
              href={`https://wa.me/${siteSettings.whatsapp_number}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center px-5 py-2 text-sm font-bold text-white transition-all rounded-full shadow-lg bg-brand-pink hover:bg-pink-600"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              Whatsapp Now
            </a>
          </div>

        </div>
      </div>
    </header>
  );
};

export default Header;