import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react'; 

const Packages = () => {
  const [packagesData, setPackagesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  
  // Input States
  const [phoneInput, setPhoneInput] = useState('');
  const [utrInput, setUtrInput] = useState(''); 
  
  const [paymentInfo, setPaymentInfo] = useState({ upi_id: '', payee_name: '' });
  
  // NAYA STATE: Global Site Settings (WhatsApp number ke liye)
  const [siteSettings, setSiteSettings] = useState({ whatsapp_number: '9461717755', telegram_link: '' });

  const packageColors = [
    "from-blue-700 to-indigo-900",
    "from-purple-700 to-fuchsia-900",
    "from-emerald-600 to-teal-900"
  ];
  
  const defaultFeatures = [
    ["100% Rank #1 Guarantee", "6 Grand League Master Teams", "Captain/VC Perfect Combo", "Private Whatsapp Support", "Money Back Guarantee if not won"],
    ["Top 2 Rank Assured", "4 Grand League Teams", "Captain/VC Suggestions", "Telegram Premium Access"],
    ["Top 3 Rank Target", "2 Grand League Teams", "Basic Telegram Updates"]
  ];

  useEffect(() => {
    // Teeno APIs ek sath fetch kar rahe hain
    Promise.all([
      fetch('https://rank-backend-test.onrender.com/api/packages').then(res => res.json()),
      fetch('https://rank-backend-test.onrender.com/api/payment-settings').then(res => res.json()),
      fetch('https://rank-backend-test.onrender.com/api/site-settings').then(res => res.json()) // NAYI API
    ])
    .then(([packagesData, paymentData, settingsData]) => {
      setPackagesData(packagesData);
      setPaymentInfo(paymentData);
      
      // Agar setting aayi hai toh set karo, warna default use karo
      if(settingsData && !settingsData.detail) {
        setSiteSettings(settingsData);
      }
      
      setIsLoading(false);
    })
    .catch(err => {
      console.error("Error fetching data:", err);
      setIsLoading(false);
    });
  }, []);

  const openModal = (pkg) => {
    setSelectedPackage(pkg);
    setPhoneInput(''); 
    setUtrInput(''); 
    setIsModalOpen(true);
  };

  const handleConfirmPayment = async () => {
    // 1. Validation 
    if (utrInput.length < 12) {
      alert("Please enter a valid 12-digit UTR or Reference Number.");
      return;
    }
    if (phoneInput.length < 10) {
      alert("Please enter a valid 10-digit WhatsApp number.");
      return;
    }

    // 2. Backend mein UTR aur Number save karo
    try {
      await fetch('https://rank-backend-test.onrender.com/api/save-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone_number: phoneInput,
          package_id: selectedPackage.id,
          utr_number: utrInput 
        })
      });
      console.log("Lead & UTR successfully saved!");
    } catch (error) {
      console.error("Error saving lead:", error);
    }
    
    // 3. WhatsApp par redirect (DYNAMIC NUMBER USE KIYA HAI)
    const message = `Hello, I have made the payment of Rs ${selectedPackage.price} for ${selectedPackage.name}.\n\nUTR No: *${utrInput}*\nMy Number: ${phoneInput}\n\nPlease verify and add me to the VIP group.`;
    
    // Yahan hardcoded number ki jagah backend wala number laga diya
    const whatsappUrl = `https://wa.me/${siteSettings.whatsapp_number}?text=${encodeURIComponent(message)}`;
    
    window.location.href = whatsappUrl; 
  };

  return (
    <section id="packages" className="py-12 px-4 max-w-7xl mx-auto sm:px-6 lg:px-8">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-white mb-2">All Rank <span className="text-brand-pink italic">Packages</span></h2>
        <p className="text-gray-400">Choose the perfect winning package. Limited slots available.</p>
      </div>

      {isLoading ? (
         <div className="text-center text-brand-gold font-bold animate-pulse">Loading Premium Packages...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {packagesData.map((pkg, index) => {
            const colorClass = packageColors[index % packageColors.length];
            const featuresList = defaultFeatures[index % defaultFeatures.length];

            return (
              <div key={pkg.id} className="relative rounded-3xl overflow-hidden border border-gray-700/50 bg-[#0f172a] flex flex-col shadow-xl">
                
                <div className={`bg-gradient-to-r ${colorClass} p-6 text-center relative`}>
                  <div className="absolute top-3 right-3 bg-red-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full animate-pulse shadow-md">
                    ONLY {pkg.slots_left} LEFT
                  </div>
                  <h3 className="text-xl font-bold text-white mt-2">{pkg.name}</h3>
                </div>

                <div className="p-6 flex-grow">
                  <div className="flex items-center justify-center space-x-3 mb-6 bg-slate-800/50 rounded-2xl py-3 border border-slate-700/50">
                    <span className="text-3xl font-black text-white">₹{pkg.price}</span>
                    <span className="text-sm font-medium text-gray-500 line-through">₹{pkg.original_price}</span>
                  </div>

                  <ul className="space-y-3.5 mb-8">
                    {featuresList.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <svg className="w-5 h-5 text-[#25D366] mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm font-medium text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-5 bg-slate-900/50 mt-auto border-t border-gray-800">
                  <button 
                    onClick={() => openModal(pkg)}
                    className="w-full py-3.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold rounded-2xl transition-transform active:scale-95 shadow-[0_5px_15px_rgba(245,158,11,0.3)] flex justify-center items-center cursor-pointer relative z-50"
                  >
                    Book Your Rank
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* --- PAYMENT MODAL POPUP --- */}
      {isModalOpen && selectedPackage && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          
          <div className="bg-[#0f172a] border border-gray-700 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl relative flex flex-col max-h-[95vh]">
            
            <div className="bg-slate-800 p-4 flex justify-between items-center border-b border-gray-700 sticky top-0 z-10">
              <h3 className="text-white font-bold">Complete Booking</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white bg-slate-700 p-1.5 rounded-full">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>

            <div className="p-5 overflow-y-auto custom-scrollbar">
              <div className="bg-slate-800/60 border border-brand-pink/30 rounded-2xl p-4 mb-6 text-center">
                <p className="text-xs text-gray-400 font-semibold mb-1 uppercase">Selected Package</p>
                <h4 className="text-brand-pink font-bold text-lg">{selectedPackage.name}</h4>
                <div className="text-2xl font-black text-white mt-1">₹{selectedPackage.price}</div>
              </div>

              {/* QR Code Section */}
              <div className="text-center mb-6">
                <p className="text-sm text-gray-300 font-medium mb-3">Scan QR to Pay Securely</p>
                <div className="bg-white p-3 rounded-2xl inline-block mx-auto mb-3 border-4 border-slate-700">
                  <QRCodeSVG 
                    value={`upi://pay?pa=${paymentInfo.upi_id}&pn=${paymentInfo.payee_name}&am=${selectedPackage.price}`} 
                    size={160}
                    bgColor="#ffffff"
                    fgColor="#000000"
                  />
                </div>
                
                <div className="flex items-center justify-center space-x-2 bg-slate-800 py-2 px-4 rounded-xl border border-slate-700 mx-auto max-w-[250px]">
                  <span className="text-sm font-mono text-brand-gold truncate">
                    {paymentInfo.upi_id || "Loading..."}
                  </span>
                  <button 
                    className="text-gray-400 hover:text-white transition-colors" 
                    onClick={() => {
                      if(paymentInfo.upi_id) {
                        navigator.clipboard.writeText(paymentInfo.upi_id);
                        alert('UPI ID Copied to Clipboard!');
                      }
                    }}
                    title="Copy UPI ID"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                  </button>
                </div>
              </div>

              {/* UTR Input Box */}
              <div className="mb-4">
                <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase">12-Digit UTR / Ref Number</label>
                <div className="flex items-center bg-slate-800 border border-slate-600 rounded-xl overflow-hidden focus-within:border-brand-pink transition-colors">
                  <input 
                    type="text" 
                    placeholder="e.g. 312345678901" 
                    className="w-full bg-transparent p-3 text-white focus:outline-none"
                    value={utrInput}
                    onChange={(e) => setUtrInput(e.target.value.replace(/\D/g, '').slice(0, 12))}
                  />
                </div>
              </div>

              {/* Phone Input Box */}
              <div className="mb-2">
                <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase">Your WhatsApp Number</label>
                <div className="flex items-center bg-slate-800 border border-slate-600 rounded-xl overflow-hidden focus-within:border-brand-pink transition-colors">
                  <div className="px-3 text-gray-400 font-semibold border-r border-slate-600">+91</div>
                  <input 
                    type="tel" 
                    placeholder="Enter 10 digit number" 
                    className="w-full bg-transparent p-3 text-white focus:outline-none"
                    value={phoneInput}
                    onChange={(e) => setPhoneInput(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  />
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-800 border-t border-gray-700 sticky bottom-0 z-10">
              <button 
                onClick={handleConfirmPayment}
                className="w-full py-3.5 bg-[#25D366] hover:bg-[#20b858] text-white font-bold rounded-xl transition-all flex justify-center items-center shadow-lg active:scale-95"
              >
                Submit Payment Details
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};

export default Packages;