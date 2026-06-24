import { Linkedin, Instagram, Twitter } from 'lucide-react';
import { footerConfig } from '../config';

const socialIcons: Record<string, React.ElementType> = {
  linkedin: Linkedin,
  instagram: Instagram,
  twitter: Twitter,
};

export default function Footer() {
  const scrollToSection = (href: string) => {
    const lenis = (window as any).lenis;
    if (lenis) {
      lenis.scrollTo(href, { duration: 2.5 });
    } else {
      const element = document.querySelector(href);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative border-t border-white/5" style={{ background: 'linear-gradient(180deg, #0A1128 0%, #001B44 100%)' }}>
      <div className="w-full px-6 lg:px-12 py-16 lg:py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <img src={footerConfig.logoImage} alt={footerConfig.logo} className="h-12 w-auto" />
                <span className="text-2xl font-bold text-white">{footerConfig.logo}</span>
              </div>
              <p className="text-white/60 mb-4 max-w-md">{footerConfig.description}</p>
              <p className="text-gold italic text-sm">{footerConfig.tagline}</p>
              <div className="flex gap-4 mt-6">
                {footerConfig.socialLinks.map((link) => {
                  const IconComponent = socialIcons[link.platform] || Linkedin;
                  return (
                    <a key={link.platform} href={link.href} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full flex items-center justify-center text-white/60 hover:text-navy transition-all duration-300" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }} aria-label={link.label}>
                      <IconComponent className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-6 text-sm uppercase tracking-wider">Quick Links</h3>
              <ul className="space-y-3">
                {footerConfig.quickLinks.map((link) => (
                  <li key={link}>
                    <a href={`#${link.toLowerCase()}`} onClick={(e) => { e.preventDefault(); scrollToSection(`#${link.toLowerCase()}`); }} className="text-white/60 hover:text-gold transition-colors duration-300 text-sm flex items-center gap-2 group">
                      <span className="w-0 h-px bg-gold group-hover:w-3 transition-all duration-300" />{link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-6 text-sm uppercase tracking-wider">Services</h3>
              <ul className="space-y-3">
                {footerConfig.services.map((service) => (
                  <li key={service}><span className="text-white/60 text-sm">{service}</span></li>
                ))}
              </ul>
            </div>
          </div>

          <div className="w-full h-px mb-8" style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.1), transparent)' }} />

          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/40 text-sm">{footerConfig.copyright}</p>
            <div className="flex gap-6">
              <a href="#" className="text-white/40 hover:text-gold text-sm transition-colors">Privacy Policy</a>
              <a href="#" className="text-white/40 hover:text-gold text-sm transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative bottom glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(249,178,51,0.3), transparent)' }} />
    </footer>
  );
}
