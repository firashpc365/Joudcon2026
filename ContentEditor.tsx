import { useState, useEffect } from 'react';
import { Save, Check, Highlighter, Info } from 'lucide-react';
import { heroConfig, aboutConfig, servicesConfig, contactConfig, siteConfig } from '../config';

export default function ContentEditor() {
  const [activeSection, setActiveSection] = useState('hero');
  const [content, setContent] = useState<Record<string, any>>({});
  const [savedSections, setSavedSections] = useState<string[]>([]);
  const [showHighlighterHelp, setShowHighlighterHelp] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('joudcon_content');
    if (saved) {
      try { setContent(JSON.parse(saved)); } catch {
        setContent({ hero: heroConfig, about: aboutConfig, services: servicesConfig, contact: contactConfig, site: siteConfig });
      }
    } else {
      setContent({ hero: heroConfig, about: aboutConfig, services: servicesConfig, contact: contactConfig, site: siteConfig });
    }
  }, []);

  const handleSave = (section: string) => {
    localStorage.setItem('joudcon_content', JSON.stringify(content));
    setSavedSections([...savedSections, section]);
    setTimeout(() => setSavedSections((prev) => prev.filter((s) => s !== section)), 2000);
  };

  const updateField = (section: string, field: string, value: any) => {
    setContent((prev) => ({ ...prev, [section]: { ...prev[section], [field]: value } }));
  };

  const applyBrandHighlight = (section: string, field: string) => {
    const textarea = document.getElementById(`${section}-${field}`) as HTMLTextAreaElement;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const currentValue = content[section]?.[field] || '';
    if (start === end) return;
    const before = currentValue.substring(0, start);
    const selected = currentValue.substring(start, end);
    const after = currentValue.substring(end);
    const newValue = `${before}[[brand]]${selected}[[/brand]]${after}`;
    updateField(section, field, newValue);
  };

  const removeBrandHighlight = (section: string, field: string) => {
    const textarea = document.getElementById(`${section}-${field}`) as HTMLTextAreaElement;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const currentValue = content[section]?.[field] || '';
    if (start === end) return;
    const selected = currentValue.substring(start, end);
    const cleaned = selected.replace(/\[\[brand\]\]/g, '').replace(/\[\[\/brand\]\]/g, '');
    const before = currentValue.substring(0, start);
    const after = currentValue.substring(end);
    updateField(section, field, `${before}${cleaned}${after}`);
  };

  const sections = [
    { id: 'hero', title: 'Hero Section' },
    { id: 'about', title: 'About Section' },
    { id: 'services', title: 'Services Section' },
    { id: 'contact', title: 'Contact Section' },
    { id: 'site', title: 'Site Settings' },
  ];

  const HighlighterToolbar = ({ section, field }: { section: string; field: string }) => (
    <div className="flex items-center gap-2 mb-3 p-3 rounded-lg flex-wrap" style={{ background: 'rgba(255,255,255,0.03)' }}>
      <Highlighter className="w-4 h-4 text-gold" />
      <span className="text-white/60 text-xs">Highlighter:</span>
      <button onClick={() => applyBrandHighlight(section, field)} className="px-3 py-1.5 bg-gold/20 text-gold text-xs rounded hover:bg-gold/30 transition-colors flex items-center gap-1.5">
        <span className="w-2.5 h-2.5 bg-gold rounded-sm" />Apply Orange
      </button>
      <button onClick={() => removeBrandHighlight(section, field)} className="px-3 py-1.5 bg-white/10 text-white/70 text-xs rounded hover:bg-white/20 transition-colors">Remove</button>
      <button onClick={() => setShowHighlighterHelp(!showHighlighterHelp)} className="ml-auto p-1 text-white/30 hover:text-gold transition-colors"><Info className="w-3.5 h-3.5" /></button>
    </div>
  );

  const TextField = ({ section, field, label, textarea = false, rows = 2 }: { section: string; field: string; label: string; textarea?: boolean; rows?: number }) => (
    <div>
      <label className="block text-white/80 text-sm mb-2">{label}</label>
      <HighlighterToolbar section={section} field={field} />
      {textarea ? (
        <textarea id={`${section}-${field}`} value={content[section]?.[field] || ''} onChange={(e) => updateField(section, field, e.target.value)} rows={rows} className="input-glass resize-none" />
      ) : (
        <input type="text" id={`${section}-${field}`} value={content[section]?.[field] || ''} onChange={(e) => updateField(section, field, e.target.value)} className="input-glass" />
      )}
    </div>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <div className="lg:col-span-1">
        <div className="glass-card rounded-2xl p-4 sticky top-4">
          <h3 className="text-white font-semibold mb-4 px-4">Sections</h3>
          <ul className="space-y-1">
            {sections.map((section) => (
              <li key={section.id}>
                <button onClick={() => setActiveSection(section.id)} className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 ${activeSection === section.id ? 'bg-gold text-navy' : 'text-white/70 hover:bg-white/5'}`}>{section.title}</button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="lg:col-span-3">
        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white">{sections.find((s) => s.id === activeSection)?.title}</h3>
            <button onClick={() => handleSave(activeSection)} className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${savedSections.includes(activeSection) ? 'bg-green-500 text-white' : 'bg-gold text-navy hover:shadow-lg hover:shadow-gold/30'}`}>
              {savedSections.includes(activeSection) ? (<><Check className="w-5 h-5" />Saved!</>) : (<><Save className="w-5 h-5" />Save Changes</>)}
            </button>
          </div>

          {showHighlighterHelp && (
            <div className="mb-6 p-4 rounded-lg" style={{ background: 'rgba(249,178,51,0.08)', border: '1px solid rgba(249,178,51,0.2)' }}>
              <h4 className="text-gold font-semibold mb-2 text-sm">How to use the Text Highlighter</h4>
              <ol className="text-white/60 text-xs space-y-1 list-decimal list-inside">
                <li>Select the text you want to highlight in any text field</li>
                <li>Click &quot;Apply Orange&quot; to make selected text appear in Brand Orange</li>
                <li>Click &quot;Remove&quot; to remove orange highlight from selected text</li>
                <li>Syntax: <code className="text-gold">[[brand]]text[[/brand]]</code> makes text <span className="text-gold">orange</span></li>
              </ol>
            </div>
          )}

          <div className="space-y-6">
            {activeSection === 'hero' && content.hero && (
              <>
                <TextField section="hero" field="title" label="Title" textarea rows={2} />
                <TextField section="hero" field="subtitleAr" label="Subtitle (Arabic)" textarea rows={2} />
                <TextField section="hero" field="subtitleEn" label="Subtitle (English)" textarea rows={2} />
                <TextField section="hero" field="tagline" label="Tagline" textarea rows={2} />
                <div>
                  <label className="block text-white/80 text-sm mb-2">CTA Button Text</label>
                  <input type="text" value={content.hero.ctaText} onChange={(e) => updateField('hero', 'ctaText', e.target.value)} className="input-glass" />
                </div>
              </>
            )}

            {activeSection === 'about' && content.about && (
              <>
                <div><label className="block text-white/80 text-sm mb-2">Section Label</label><input type="text" value={content.about.sectionLabel} onChange={(e) => updateField('about', 'sectionLabel', e.target.value)} className="input-glass" /></div>
                <div><label className="block text-white/80 text-sm mb-2">Heading</label><input type="text" value={content.about.heading} onChange={(e) => updateField('about', 'heading', e.target.value)} className="input-glass" /></div>
                <div><label className="block text-white/80 text-sm mb-2">Heading Accent</label><input type="text" value={content.about.headingAccent} onChange={(e) => updateField('about', 'headingAccent', e.target.value)} className="input-glass" /></div>
                <div><label className="block text-white/80 text-sm mb-2">Description</label><textarea value={content.about.description} onChange={(e) => updateField('about', 'description', e.target.value)} rows={3} className="input-glass resize-none" /></div>
              </>
            )}

            {activeSection === 'services' && content.services && (
              <>
                <div><label className="block text-white/80 text-sm mb-2">Section Label</label><input type="text" value={content.services.sectionLabel} onChange={(e) => updateField('services', 'sectionLabel', e.target.value)} className="input-glass" /></div>
                <div><label className="block text-white/80 text-sm mb-2">Heading</label><input type="text" value={content.services.heading} onChange={(e) => updateField('services', 'heading', e.target.value)} className="input-glass" /></div>
                <div><label className="block text-white/80 text-sm mb-2">Heading Accent</label><input type="text" value={content.services.headingAccent} onChange={(e) => updateField('services', 'headingAccent', e.target.value)} className="input-glass" /></div>
                <div><label className="block text-white/80 text-sm mb-2">Description</label><textarea value={content.services.description} onChange={(e) => updateField('services', 'description', e.target.value)} rows={3} className="input-glass resize-none" /></div>
              </>
            )}

            {activeSection === 'contact' && content.contact && (
              <>
                <div><label className="block text-white/80 text-sm mb-2">Section Label</label><input type="text" value={content.contact.sectionLabel} onChange={(e) => updateField('contact', 'sectionLabel', e.target.value)} className="input-glass" /></div>
                <div><label className="block text-white/80 text-sm mb-2">Heading</label><input type="text" value={content.contact.heading} onChange={(e) => updateField('contact', 'heading', e.target.value)} className="input-glass" /></div>
                <div><label className="block text-white/80 text-sm mb-2">Heading Accent</label><input type="text" value={content.contact.headingAccent} onChange={(e) => updateField('contact', 'headingAccent', e.target.value)} className="input-glass" /></div>
                <div><label className="block text-white/80 text-sm mb-2">Description</label><textarea value={content.contact.description} onChange={(e) => updateField('contact', 'description', e.target.value)} rows={3} className="input-glass resize-none" /></div>
                <div><label className="block text-white/80 text-sm mb-2">Address</label><textarea value={content.contact.address} onChange={(e) => updateField('contact', 'address', e.target.value)} rows={2} className="input-glass resize-none" /></div>
                <div><label className="block text-white/80 text-sm mb-2">Email</label><input type="email" value={content.contact.email} onChange={(e) => updateField('contact', 'email', e.target.value)} className="input-glass" /></div>
                <div><label className="block text-white/80 text-sm mb-2">Website</label><input type="text" value={content.contact.website} onChange={(e) => updateField('contact', 'website', e.target.value)} className="input-glass" /></div>
              </>
            )}

            {activeSection === 'site' && content.site && (
              <>
                <div><label className="block text-white/80 text-sm mb-2">Site Title</label><input type="text" value={content.site.title} onChange={(e) => updateField('site', 'title', e.target.value)} className="input-glass" /></div>
                <div><label className="block text-white/80 text-sm mb-2">Site Description</label><textarea value={content.site.description} onChange={(e) => updateField('site', 'description', e.target.value)} rows={3} className="input-glass resize-none" /></div>
                <div><label className="block text-white/80 text-sm mb-2">Language Code</label><input type="text" value={content.site.language} onChange={(e) => updateField('site', 'language', e.target.value)} className="input-glass" /></div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
