import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Mail, Globe, Send, CheckCircle, Loader2 } from 'lucide-react';
import { contactConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.contact-header', { opacity: 0, y: 60, filter: 'blur(10px)' }, {
        opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', toggleActions: 'play none none reverse' },
      });

      gsap.fromTo('.contact-form', { opacity: 0, x: -60, filter: 'blur(6px)' }, {
        opacity: 1, x: 0, filter: 'blur(0px)', duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: '.contact-form', start: 'top 75%', toggleActions: 'play none none reverse' },
      });

      gsap.fromTo('.info-card', { opacity: 0, x: 60, filter: 'blur(6px)' }, {
        opacity: 1, x: 0, filter: 'blur(0px)', duration: 0.8, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: '.info-cards', start: 'top 75%', toggleActions: 'play none none reverse' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    const inquiries = JSON.parse(localStorage.getItem('joudcon_inquiries') || '[]');
    inquiries.push({ ...formData, id: Date.now(), date: new Date().toISOString() });
    localStorage.setItem('joudcon_inquiries', JSON.stringify(inquiries));
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', phone: '', message: '' });
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section id="contact" ref={sectionRef} className="section-container py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#001B44]/20 to-transparent pointer-events-none" />
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full px-6 lg:px-12">
        <div className="contact-header text-center mb-16">
          <span className="text-gold text-sm uppercase tracking-[0.3em] mb-4 block">{contactConfig.sectionLabel}</span>
          <h2 className="text-4xl lg:text-6xl xl:text-7xl font-bold text-white mb-6">{contactConfig.heading} <span className="text-gold">{contactConfig.headingAccent}</span></h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">{contactConfig.description}</p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="contact-form">
            <div className="glass-card rounded-3xl p-8 lg:p-10">
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-6" style={{ boxShadow: '0 0 30px rgba(249,178,51,0.3)' }}>
                    <CheckCircle className="w-10 h-10 text-gold" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">Message Sent!</h3>
                  <p className="text-white/70">Thank you for reaching out. We&apos;ll get back to you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-white/80 text-sm mb-2">{contactConfig.formFields.name}</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required className="input-glass" placeholder="John Doe" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-white/80 text-sm mb-2">{contactConfig.formFields.email}</label>
                      <input type="email" name="email" value={formData.email} onChange={handleChange} required className="input-glass" placeholder="john@example.com" />
                    </div>
                    <div>
                      <label className="block text-white/80 text-sm mb-2">{contactConfig.formFields.phone}</label>
                      <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="input-glass" placeholder="+966 50 123 4567" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-white/80 text-sm mb-2">{contactConfig.formFields.message}</label>
                    <textarea name="message" value={formData.message} onChange={handleChange} required rows={5} className="input-glass resize-none" placeholder="Tell us about your event..." />
                  </div>
                  <button type="submit" disabled={isSubmitting} className="w-full py-4 bg-gold text-navy font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 hover:shadow-xl" style={{ boxShadow: isSubmitting ? 'none' : '0 0 20px rgba(249,178,51,0.3)' }}>
                    {isSubmitting ? (<><Loader2 className="w-5 h-5 animate-spin" />Sending...</>) : (<><Send className="w-5 h-5" />{contactConfig.submitButton}</>)}
                  </button>
                </form>
              )}
            </div>
          </div>

          <div className="info-cards space-y-6">
            <div className="info-card glass-card rounded-2xl p-6 flex items-start gap-4 group hover:border-gold/40 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(249,178,51,0.1)' }}>
                <MapPin className="w-6 h-6 text-gold" />
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">Address</h3>
                <p className="text-white/70 text-sm leading-relaxed">{contactConfig.address}</p>
              </div>
            </div>

            <div className="info-card glass-card rounded-2xl p-6 flex items-start gap-4 group hover:border-gold/40 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(249,178,51,0.1)' }}>
                <Mail className="w-6 h-6 text-gold" />
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">Email</h3>
                <a href={`mailto:${contactConfig.email}`} className="text-white/70 text-sm hover:text-gold transition-colors">{contactConfig.email}</a>
              </div>
            </div>

            <div className="info-card glass-card rounded-2xl p-6 flex items-start gap-4 group hover:border-gold/40 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(249,178,51,0.1)' }}>
                <Globe className="w-6 h-6 text-gold" />
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">Website</h3>
                <a href={`https://${contactConfig.website}`} target="_blank" rel="noopener noreferrer" className="text-white/70 text-sm hover:text-gold transition-colors">{contactConfig.website}</a>
              </div>
            </div>

            <div className="info-card glass-card rounded-2xl p-2 overflow-hidden">
              <div className="relative h-48 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, rgba(74,93,126,0.3) 0%, rgba(0,27,68,0.5) 100%)' }}>
                <div className="text-center">
                  <MapPin className="w-10 h-10 text-gold mx-auto mb-2" />
                  <p className="text-white/60 text-sm">Dammam, Saudi Arabia</p>
                  <p className="text-gold/60 text-xs mt-1">King Faisal Ibn Abd Al Aziz</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
