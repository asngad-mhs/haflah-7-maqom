import React, { useState, useEffect } from 'react';

const NAV_LINKS = [
  { id: 'home', label: 'BERANDA', href: '#home' },
  { id: 'maqams', label: 'PENGENALAN MAQAM', href: '#maqams' },
  { id: 'schedule', label: 'JADWAL', href: '#schedule' },
  { id: 'ai-guide', label: 'TANYA AI', href: '#ai-guide' },
];

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      // Handle navbar background transparency
      setIsScrolled(window.scrollY > 50);

      // Handle active section detection (Scroll Spy)
      // We add an offset (e.g., 200px) to make the active state switch a bit earlier as the user scrolls down
      const scrollPosition = window.scrollY + 200;

      for (const link of NAV_LINKS) {
        const element = document.getElementById(link.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(link.id);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (event: React.MouseEvent<HTMLAnchorElement>, href: string, id: string) => {
    event.preventDefault(); // Prevent the default hash link behavior
    const targetId = href.substring(1); // Remove the '#'
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
    
    setActiveSection(id);
    setIsMenuOpen(false);
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-islamic-dark/95 backdrop-blur-md shadow-lg py-4' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a href="#home" onClick={(e) => handleNavClick(e, '#home', 'home')} className="flex items-center space-x-2 group">
          <span className="text-3xl font-serif text-islamic-gold group-hover:rotate-12 transition-transform duration-300">۞</span>
          <span className="text-xl md:text-2xl font-bold font-serif text-white tracking-wide">
            Haflah <span className="text-islamic-gold">7 Maqam</span>
          </span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 text-sm font-semibold tracking-wider">
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href, link.id)}
              className={`relative py-2 transition-colors duration-300 ${
                activeSection === link.id ? 'text-islamic-gold' : 'text-slate-300 hover:text-white'
              }`}
            >
              {link.label}
              <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-islamic-gold transform transition-transform duration-300 origin-left ${
                activeSection === link.id ? 'scale-x-100' : 'scale-x-0'
              }`}></span>
            </a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white text-2xl focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <div className={`md:hidden bg-islamic-dark/95 backdrop-blur-xl absolute w-full border-t border-slate-800 shadow-xl transition-all duration-300 overflow-hidden ${
        isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="flex flex-col p-6 space-y-4">
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href, link.id)}
              className={`text-lg font-serif ${
                activeSection === link.id ? 'text-islamic-gold pl-4 border-l-2 border-islamic-gold' : 'text-slate-300 pl-4 border-l-2 border-transparent hover:text-white'
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;