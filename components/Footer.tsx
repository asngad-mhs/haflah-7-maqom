import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 py-12 border-t border-slate-800 text-center">
      <div className="container mx-auto px-6">
        <h3 className="text-2xl font-serif text-islamic-gold mb-4">Haflah 7 Maqam</h3>
        <p className="text-slate-500 mb-8 max-w-md mx-auto">
          Melestarikan seni tilawah Al-Quran dengan keindahan ragam nagham untuk generasi penerus.
        </p>
        <div className="flex justify-center space-x-6 text-slate-400 text-sm">
          <a href="#" className="hover:text-white transition-colors">Tentang Kami</a>
          <a href="#" className="hover:text-white transition-colors">Hubungi Panitia</a>
          <a href="#" className="hover:text-white transition-colors">Donasi</a>
        </div>
        <div className="mt-8 text-xs text-slate-600">
          &copy; {new Date().getFullYear()} Haflah Qori Community. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;