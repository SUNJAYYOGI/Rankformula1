import React, { useState, useEffect } from 'react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
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
  

  const faqs = [
    { 
      q: "Is this 100% genuine?", 
      a: "Yes, we have a 92% success rate and provide a Money Back Guarantee on our Rank #1 package." 
    },
    { 
      q: "How will I receive the team?", 
      a: "After payment, you will be instantly redirected to our VIP WhatsApp/Telegram group. Teams are sent 15 mins before the toss." 
    },
    { 
      q: "What if I don't win?", 
      a: "If you purchase the Rank #1 package and don't win, you are eligible for a 100% refund or free access for the entire season." 
    },
    { 
      q: "How does the payment process work?", 
      a: "Simply click 'Book Your Rank', scan the secure UPI QR code, and click confirm to instantly join the private channel." 
    }
  ];

  const toggleFAQ = (index) => {
    // Agar same item click kiya toh close kar do, nahi toh naya open karo
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-12 px-4 max-w-7xl mx-auto sm:px-6 lg:px-8">
      
      {/* --- FAQ Accordion --- */}
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Frequently Asked <span className="text-brand-pink italic">Questions</span></h2>
        </div>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-700/50 bg-slate-800/40 rounded-2xl overflow-hidden transition-all duration-300 shadow-md">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center p-5 text-left text-white font-semibold focus:outline-none"
              >
                <span className="text-sm sm:text-base pr-4">{faq.q}</span>
                {/* Arrow Icon jo rotate hoga */}
                <svg 
                  className={`w-5 h-5 text-brand-pink transform transition-transform duration-300 flex-shrink-0 ${openIndex === index ? 'rotate-180' : ''}`} 
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              
              {/* Conditional Rendering for Answer */}
              {openIndex === index && (
                <div className="p-5 pt-0 text-gray-400 text-sm leading-relaxed border-t border-gray-700/30 mt-2">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* --- Telegram Banner --- */}
      <div className="mt-16 max-w-3xl mx-auto bg-gradient-to-br from-[#0088cc]/20 to-[#004466]/40 border border-[#0088cc]/30 rounded-3xl p-8 text-center relative overflow-hidden shadow-[0_10px_30px_rgba(0,136,204,0.15)] mb-10">
         {/* Background blur circle for premium feel */}
         <div className="absolute top-0 right-0 w-32 h-32 bg-[#0088cc]/20 rounded-full blur-3xl pointer-events-none"></div>

         <div className="bg-[#0088cc] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-[#0088cc]/40">
            <svg className="w-8 h-8 text-white pl-1" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.46.93-4.12 2.73-.39.26-.74.39-1.06.38-.35-.01-1.02-.2-1.52-.36-.61-.2-1.09-.31-1.06-.66.02-.18.27-.36.75-.55 2.94-1.28 4.9-2.12 5.88-2.53 2.79-1.16 3.37-1.36 3.75-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .24z"/></svg>
         </div>
         <h3 className="text-2xl font-bold text-white mb-3">Want Free Demo Tips?</h3>
         <p className="text-gray-300 text-sm mb-6 max-w-md mx-auto">Join our VIP Telegram channel with 50,000+ members to receive daily free match updates and exclusive previews.</p>
         
         <a href={siteSettings.telegram_link} target="_blank" rel="noreferrer" className="inline-block bg-[#0088cc] hover:bg-[#0077b3] text-white font-bold py-3 px-8 rounded-full transition-all transform active:scale-95 shadow-[0_4px_15px_rgba(0,136,204,0.4)]">
            Join Telegram Now
         </a>
      </div>

    </section>
  );
};

export default FAQ;