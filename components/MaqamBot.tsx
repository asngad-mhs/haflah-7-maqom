import React, { useState, useRef, useEffect } from 'react';
import { askMaqamExpert } from '../services/geminiService';
import { ChatMessage } from '../types';

const MaqamBot: React.FC = () => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Assalamualaikum. Saya adalah asisten AI ahli Maqam. Ada yang ingin Anda tanyakan tentang Bayati, Hijaz, atau maqam lainnya?' }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    const userText = query;
    setQuery('');
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setIsLoading(true);

    const answer = await askMaqamExpert(userText);
    
    setMessages(prev => [...prev, { role: 'model', text: answer }]);
    setIsLoading(false);
  };

  return (
    <section id="ai-guide" className="py-24 bg-islamic-dark relative border-t border-slate-800 scroll-mt-20">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-3">
            Tanya Ustaz <span className="text-islamic-gold">AI</span>
          </h2>
          <p className="text-slate-400">
            Ingin tahu maqam apa yang cocok untuk ayat sedih? Atau sejarah maqam Rast? Tanyakan di sini.
          </p>
        </div>

        <div className="bg-slate-900 rounded-2xl shadow-2xl overflow-hidden border border-slate-700">
          {/* Chat Window */}
          <div className="h-[400px] overflow-y-auto p-6 space-y-4">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div 
                  className={`max-w-[80%] p-4 rounded-xl text-sm md:text-base leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-islamic-gold text-islamic-dark font-medium rounded-tr-none' 
                      : 'bg-slate-800 text-slate-200 rounded-tl-none border border-slate-700'
                  }`}
                >
                  {msg.text.split('\n').map((line, i) => (
                    <p key={i} className="mb-1 last:mb-0">{line}</p>
                  ))}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-slate-800 text-slate-400 p-4 rounded-xl rounded-tl-none border border-slate-700 flex items-center space-x-2">
                  <div className="w-2 h-2 bg-islamic-gold rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-islamic-gold rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-islamic-gold rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleAsk} className="p-4 bg-slate-800 border-t border-slate-700 flex gap-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Contoh: Jelaskan karakter maqam Nahawand..."
              className="flex-1 bg-slate-900 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-islamic-gold border border-slate-700 placeholder-slate-500"
              disabled={isLoading}
            />
            <button 
              type="submit" 
              disabled={isLoading || !query.trim()}
              className="bg-islamic-gold text-islamic-dark font-bold px-6 py-3 rounded-lg hover:bg-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Kirim
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default MaqamBot;