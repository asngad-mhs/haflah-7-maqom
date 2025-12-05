import React from 'react';
import { SCHEDULE } from '../constants';

const Schedule: React.FC = () => {
  return (
    <section id="schedule" className="py-24 bg-gradient-to-b from-slate-900 to-islamic-dark scroll-mt-20">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          
          <div className="lg:w-1/2">
            <h2 className="text-4xl font-serif font-bold text-white mb-6">
              Rangkaian Acara <br />
              <span className="text-islamic-gold">Haflah Akbar</span>
            </h2>
            <p className="text-slate-300 mb-8 leading-relaxed">
              Saksikan penampilan para Qori terbaik nasional dan internasional yang akan melantunkan ayat-ayat suci Al-Quran dengan variasi 7 Maqam yang memukau. Jangan lewatkan momen penuh keberkahan ini.
            </p>
            <div className="p-6 bg-islamic-gold/10 border border-islamic-gold/30 rounded-xl mb-6">
              <h4 className="text-islamic-gold font-bold mb-2">Lokasi Acara</h4>
              <p className="text-white">Masjid Agung Al-Hidayah, Kota Pusat</p>
              <p className="text-slate-400 text-sm mt-1">Sabtu, 14 Muharram 1446 H</p>
            </div>
          </div>

          <div className="lg:w-1/2 w-full">
            <div className="space-y-4">
              {SCHEDULE.map((item) => (
                <div key={item.id} className="bg-slate-800 p-6 rounded-xl flex flex-col sm:flex-row sm:items-center gap-4 hover:translate-x-2 transition-transform duration-300 border-l-4 border-islamic-gold shadow-lg">
                  <div className="min-w-[120px]">
                    <span className="text-islamic-gold font-bold text-lg">{item.time}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-bold text-xl mb-1">{item.title}</h3>
                    <p className="text-slate-400 text-sm">Qori: {item.reciter}</p>
                  </div>
                  <div className="text-right">
                    <span className="inline-block px-3 py-1 bg-slate-700 text-slate-200 text-xs rounded-full">
                      {item.maqamFocus}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Schedule;