import React, { useState, useEffect } from 'react';

const Footer = () => {
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

  return (
    <footer className="px-4 py-8 mx-auto text-center border-t max-w-7xl sm:px-6 lg:px-8 border-gray-800/60 bg-transparent">
      
      {/* Disclaimer (Fantasy Apps ke liye zaroori) */}
      <div className="max-w-3xl mx-auto mb-6">
        <p className="text-[10px] sm:text-xs text-gray-500 leading-relaxed">
          Disclaimer: This game involves an element of financial risk and may be addictive. Please play responsibly and at your own risk. 18+ only. Our platform provides analytics-based predictions.
        </p>
      </div>

      {/* Contact Links (Circular Buttons) */}
      <div className="flex justify-center gap-6 mb-6">
        {/* WhatsApp Icon (DYNAMIC) */}
        <a href={`https://wa.me/${siteSettings.whatsapp_number}`} target="_blank" rel="noreferrer" className="flex flex-col items-center group">
          <div className="p-3 mb-2 transition-colors border rounded-full border-gray-700/50 bg-slate-800/50 group-hover:bg-[#25D366]/20 group-hover:border-[#25D366]/50">
            <svg className="w-5 h-5 text-gray-400 group-hover:text-[#25D366]" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.347-.272.273-1.04 1.02-1.04 2.486s1.065 2.88 1.213 3.078c.149.198 2.095 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
          </div>
          <span className="text-[10px] text-gray-500 group-hover:text-gray-300">WhatsApp</span>
        </a>

        {/* Telegram Icon (DYNAMIC) */}
        <a href={siteSettings.telegram_link} target="_blank" rel="noreferrer" className="flex flex-col items-center group">
          <div className="p-3 mb-2 transition-colors border rounded-full border-gray-700/50 bg-slate-800/50 group-hover:bg-[#0088cc]/20 group-hover:border-[#0088cc]/50">
            <svg className="w-5 h-5 text-gray-400 group-hover:text-[#0088cc]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.46.93-4.12 2.73-.39.26-.74.39-1.06.38-.35-.01-1.02-.2-1.52-.36-.61-.2-1.09-.31-1.06-.66.02-.18.27-.36.75-.55 2.94-1.28 4.9-2.12 5.88-2.53 2.79-1.16 3.37-1.36 3.75-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .24z"/></svg>
          </div>
          <span className="text-[10px] text-gray-500 group-hover:text-gray-300">Telegram</span>
        </a>
      </div>

      {/* Copyright */}
      <div className="text-[10px] sm:text-xs text-gray-600 mb-8"> {/* Thoda bottom margin diya taaki BottomNav ke peeche na chhupe */}
        © 2026 Rank Formula. All rights reserved.
      </div>
      
    </footer>
  );
};

export default Footer;