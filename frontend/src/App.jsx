import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Packages from './components/Packages';
import Proofs from './components/Proofs';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import BottomNav from './components/BottomNav';

function App() {
  // Yeh state track karegi ki konsa tab active hai. Default 'home' hai.
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="min-h-screen pt-16 pb-40"> 
      {/* Header ko bhi setActiveTab bhej rahe hain taaki wahan se bhi link chal sake */}
      <Header setActiveTab={setActiveTab} />
      
      <main>
        {/* Agar tab 'home' hai, toh yeh dikhega */}
        {activeTab === 'home' && (
          <div className="animate-fade-in">
            <Hero setActiveTab={setActiveTab} />
            <Proofs />
            <FAQ />
          </div>
        )}

        {/* Agar tab 'packages' hai, toh sirf Packages dikhenge */}
        {activeTab === 'packages' && (
          <div className="pt-6 animate-fade-in">
            <Packages />
          </div>
        )}
      </main>
      
      <Footer />
      
      {/* BottomNav ko state bhej rahe hain taaki wo active icon ka color change kar sake */}
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  )
}

export default App;