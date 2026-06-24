import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X, Save } from 'lucide-react';
import { portfolioConfig, type PortfolioItem } from '../config';

interface PortfolioFormData {
  title: string;
  client: string;
  date: string;
  description: string;
  category: string;
  images: string[];
}

const initialFormData: PortfolioFormData = {
  title: '', client: '', date: '', description: '', category: '', images: [''],
};

const categories = ['Corporate Event', 'Award Ceremony', 'Cultural Event', 'Educational Event', 'Exhibition', 'Conference'];

export default function PortfolioManager() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<PortfolioFormData>(initialFormData);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('joudcon_portfolio');
    if (stored) {
      try { setItems(JSON.parse(stored)); } catch { setItems(portfolioConfig.items); }
    } else {
      setItems(portfolioConfig.items);
    }
  }, []);

  const persistItems = (newItems: PortfolioItem[]) => {
    setItems(newItems);
    localStorage.setItem('joudcon_portfolio', JSON.stringify(newItems));
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      const updated = items.map((item) => item.id === editingId ? { ...item, ...formData } : item);
      persistItems(updated);
    } else {
      const newItem: PortfolioItem = { ...formData, id: `portfolio-${Date.now()}` };
      persistItems([...items, newItem]);
    }
    setIsEditing(false);
    setEditingId(null);
    setFormData(initialFormData);
  };

  const handleEdit = (item: PortfolioItem) => {
    setFormData({
      title: item.title, client: item.client, date: item.date,
      description: item.description, category: item.category, images: item.images,
    });
    setEditingId(item.id);
    setIsEditing(true);
  };

  const handleDelete = (id: string) => {
    persistItems(items.filter((item) => item.id !== id));
    setShowDeleteConfirm(null);
  };

  return (
    <div>
      {saveSuccess && (
        <div className="mb-4 p-3 bg-green-500/20 border border-green-500/50 rounded-lg text-green-300 text-sm">Changes saved successfully!</div>
      )}
      {!isEditing && (
        <button onClick={() => setIsEditing(true)} className="mb-6 flex items-center gap-2 px-4 py-2 bg-gold text-navy font-semibold rounded-lg hover:shadow-lg hover:shadow-gold/30 transition-all">
          <Plus className="w-5 h-5" />Add New Project
        </button>
      )}

      {isEditing && (
        <div className="glass-card rounded-2xl p-6 mb-8">
          <h3 className="text-xl font-bold text-white mb-6">{editingId ? 'Edit Project' : 'Add New Project'}</h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white/80 text-sm mb-2">Project Title</label>
                <input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required className="input-glass" placeholder="Enter project title" />
              </div>
              <div>
                <label className="block text-white/80 text-sm mb-2">Client Name</label>
                <input type="text" value={formData.client} onChange={(e) => setFormData({ ...formData, client: e.target.value })} required className="input-glass" placeholder="Enter client name" />
              </div>
              <div>
                <label className="block text-white/80 text-sm mb-2">Date</label>
                <input type="text" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} required className="input-glass" placeholder="e.g., January 2025" />
              </div>
              <div>
                <label className="block text-white/80 text-sm mb-2">Category</label>
                <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} required className="input-glass">
                  <option value="">Select category</option>
                  {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-white/80 text-sm mb-2">Description</label>
              <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} required rows={4} className="input-glass resize-none" placeholder="Enter project description" />
            </div>
            <div>
              <label className="block text-white/80 text-sm mb-2">Image/Video Path</label>
              <input type="text" value={formData.images[0] || ''} onChange={(e) => setFormData({ ...formData, images: [e.target.value] })} className="input-glass" placeholder="/images/your-image.jpg" />
              <p className="text-white/40 text-xs mt-1">Enter the path to your media file in the public folder</p>
            </div>
            <div className="flex gap-4">
              <button type="submit" className="flex items-center gap-2 px-6 py-3 bg-gold text-navy font-semibold rounded-lg hover:shadow-lg hover:shadow-gold/30 transition-all">
                <Save className="w-5 h-5" />{editingId ? 'Update' : 'Save'}
              </button>
              <button type="button" onClick={() => { setIsEditing(false); setEditingId(null); setFormData(initialFormData); }} className="flex items-center gap-2 px-6 py-3 border border-white/20 text-white rounded-lg hover:bg-white/5 transition-all">
                <X className="w-5 h-5" />Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map((item) => (
          <div key={item.id} className="glass-card rounded-2xl overflow-hidden group hover:border-gold/30 transition-all duration-300">
            <div className="relative h-48">
              <img src={item.images[0]} alt={item.title} className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).src = '/images/JOUD logo and color-01 (1).png'; }} />
              <div className="absolute inset-0 bg-gradient-to-t from-[#001B44] to-transparent" />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-gold/90 text-navy text-xs font-semibold rounded-full">{item.category}</span>
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 text-gold text-sm mb-2"><span>{item.client}</span><span>•</span><span>{item.date}</span></div>
              <h4 className="text-lg font-bold text-white mb-2">{item.title}</h4>
              <p className="text-white/60 text-sm line-clamp-2 mb-4">{item.description}</p>
              <div className="flex gap-3">
                <button onClick={() => handleEdit(item)} className="flex items-center gap-2 px-4 py-2 bg-white/5 text-white rounded-lg hover:bg-white/10 transition-all text-sm"><Edit2 className="w-4 h-4" />Edit</button>
                <button onClick={() => setShowDeleteConfirm(item.id)} className="flex items-center gap-2 px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-all text-sm"><Trash2 className="w-4 h-4" />Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowDeleteConfirm(null)} />
          <div className="relative glass-card rounded-2xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-white mb-4">Confirm Delete</h3>
            <p className="text-white/70 mb-6">Are you sure you want to delete this project? This action cannot be undone.</p>
            <div className="flex gap-4">
              <button onClick={() => handleDelete(showDeleteConfirm)} className="flex-1 py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-all">Delete</button>
              <button onClick={() => setShowDeleteConfirm(null)} className="flex-1 py-3 border border-white/20 text-white rounded-lg hover:bg-white/5 transition-all">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
