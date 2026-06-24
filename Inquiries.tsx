import { useState, useEffect } from 'react';
import { Download, Trash2, MessageSquare, Search, Filter, Mail, Phone, Calendar } from 'lucide-react';

interface Inquiry {
  id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  date: string;
}

export default function Inquiries() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'recent' | 'old'>('all');

  useEffect(() => {
    const stored = localStorage.getItem('joudcon_inquiries');
    if (stored) {
      try { setInquiries(JSON.parse(stored)); } catch { setInquiries([]); }
    }
  }, []);

  const persistInquiries = (newInquiries: Inquiry[]) => {
    setInquiries(newInquiries);
    localStorage.setItem('joudcon_inquiries', JSON.stringify(newInquiries));
  };

  const handleDelete = (id: number) => {
    persistInquiries(inquiries.filter((inquiry) => inquiry.id !== id));
  };

  const exportToCSV = () => {
    const headers = ['ID', 'Name', 'Email', 'Phone', 'Message', 'Date'];
    const rows = filteredInquiries.map((inquiry) => [
      inquiry.id, inquiry.name, inquiry.email, inquiry.phone || '',
      `"${(inquiry.message || '').replace(/"/g, '""')}"`,
      new Date(inquiry.date).toLocaleString(),
    ]);
    const csvContent = [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `joudcon-inquiries-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  const filteredInquiries = inquiries
    .filter((inquiry) => {
      const searchLower = searchTerm.toLowerCase();
      return (
        (inquiry.name || '').toLowerCase().includes(searchLower) ||
        (inquiry.email || '').toLowerCase().includes(searchLower) ||
        (inquiry.message || '').toLowerCase().includes(searchLower)
      );
    })
    .filter((inquiry) => {
      if (filter === 'all') return true;
      const inquiryDate = new Date(inquiry.date);
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      return filter === 'recent' ? inquiryDate >= thirtyDaysAgo : inquiryDate < thirtyDaysAgo;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const recentCount = inquiries.filter((i) => {
    const d = new Date(i.date);
    const thirty = new Date();
    thirty.setDate(thirty.getDate() - 30);
    return d >= thirty;
  }).length;

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4 flex-1">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search inquiries..." className="w-full pl-10 pr-4 py-2.5 glass rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-gold/50 text-sm" />
          </div>
          <select value={filter} onChange={(e) => setFilter(e.target.value as any)} className="px-4 py-2.5 glass rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-gold/50 text-sm cursor-pointer">
            <option value="all">All Time</option>
            <option value="recent">Last 30 Days</option>
            <option value="old">Older</option>
          </select>
        </div>
        <button onClick={exportToCSV} disabled={filteredInquiries.length === 0} className="flex items-center gap-2 px-4 py-2.5 bg-gold text-navy font-semibold rounded-lg hover:shadow-lg hover:shadow-gold/30 transition-all disabled:opacity-50 text-sm">
          <Download className="w-4 h-4" />Export CSV
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Total', value: inquiries.length, icon: MessageSquare },
          { label: 'Filtered', value: filteredInquiries.length, icon: Filter },
          { label: 'This Month', value: recentCount, icon: Calendar },
        ].map((stat, i) => (
          <div key={i} className="glass-card rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'rgba(249,178,51,0.1)' }}>
                <stat.icon className="w-5 h-5 text-gold" />
              </div>
              <div>
                <p className="text-white/60 text-xs">{stat.label}</p>
                <p className="text-xl font-bold text-white">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredInquiries.length > 0 ? (
        <div className="space-y-3">
          {filteredInquiries.map((inquiry) => (
            <div key={inquiry.id} className="glass-card rounded-2xl p-5 hover:border-gold/20 transition-all duration-300">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <h4 className="text-lg font-bold text-white">{inquiry.name}</h4>
                    <span className="text-white/30 text-xs">{new Date(inquiry.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-3 mb-3 flex-wrap">
                    <a href={`mailto:${inquiry.email}`} className="text-gold text-xs hover:underline flex items-center gap-1"><Mail className="w-3 h-3" />{inquiry.email}</a>
                    {inquiry.phone && (
                      <a href={`tel:${inquiry.phone}`} className="text-white/50 text-xs hover:text-gold transition-colors flex items-center gap-1"><Phone className="w-3 h-3" />{inquiry.phone}</a>
                    )}
                  </div>
                  <p className="text-white/70 text-sm leading-relaxed">{inquiry.message}</p>
                </div>
                <button onClick={() => handleDelete(inquiry.id)} className="p-2.5 rounded-lg text-white/30 hover:text-red-400 hover:bg-red-500/20 transition-all self-start flex-shrink-0">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <MessageSquare className="w-16 h-16 text-white/20 mx-auto mb-4" />
          <p className="text-white/60 text-lg">{searchTerm || filter !== 'all' ? 'No inquiries match your filters' : 'No inquiries yet'}</p>
          <p className="text-white/40 text-sm mt-2">{searchTerm || filter !== 'all' ? 'Try adjusting your search or filters' : 'Inquiries will appear here when visitors submit the contact form'}</p>
        </div>
      )}
    </div>
  );
}
