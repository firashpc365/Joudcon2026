import { useState, useEffect } from 'react';
import { Plus, Trash2, Users } from 'lucide-react';
import { clientsConfig } from '../config';

interface Client {
  id: string;
  name: string;
  logo: string;
}

export default function ClientManager() {
  const [clients, setClients] = useState<Client[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newClientName, setNewClientName] = useState('');
  const [newClientLogo, setNewClientLogo] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('joudcon_clients');
    if (stored) {
      try { setClients(JSON.parse(stored)); } catch {
        initDefaultClients();
      }
    } else {
      initDefaultClients();
    }
  }, []);

  const initDefaultClients = () => {
    const initialClients = clientsConfig.clients.map((client, index) => ({
      id: `client-${index}`,
      name: client.name,
      logo: client.logo,
    }));
    setClients(initialClients);
    localStorage.setItem('joudcon_clients', JSON.stringify(initialClients));
  };

  const persistClients = (newClients: Client[]) => {
    setClients(newClients);
    localStorage.setItem('joudcon_clients', JSON.stringify(newClients));
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  const handleAdd = () => {
    if (!newClientName.trim()) return;
    const newClient: Client = { id: `client-${Date.now()}`, name: newClientName.trim(), logo: newClientLogo.trim() };
    persistClients([...clients, newClient]);
    setNewClientName('');
    setNewClientLogo('');
    setIsAdding(false);
  };

  const handleDelete = (id: string) => {
    persistClients(clients.filter((client) => client.id !== id));
  };

  return (
    <div>
      {saveSuccess && (
        <div className="mb-4 p-3 bg-green-500/20 border border-green-500/50 rounded-lg text-green-300 text-sm">Changes saved successfully!</div>
      )}
      {!isAdding && (
        <button onClick={() => setIsAdding(true)} className="mb-6 flex items-center gap-2 px-4 py-2 bg-gold text-navy font-semibold rounded-lg hover:shadow-lg hover:shadow-gold/30 transition-all">
          <Plus className="w-5 h-5" />Add New Client
        </button>
      )}

      {isAdding && (
        <div className="glass-card rounded-2xl p-6 mb-8">
          <h3 className="text-lg font-bold text-white mb-4">Add New Client</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-white/80 text-sm mb-2">Client Name</label>
              <input type="text" value={newClientName} onChange={(e) => setNewClientName(e.target.value)} placeholder="Enter client name" className="input-glass" />
            </div>
            <div>
              <label className="block text-white/80 text-sm mb-2">Logo Path (optional)</label>
              <input type="text" value={newClientLogo} onChange={(e) => setNewClientLogo(e.target.value)} placeholder="/images/client-logo.png" className="input-glass" />
              <p className="text-white/40 text-xs mt-1">Leave empty to use initials as logo</p>
            </div>
            <div className="flex gap-4">
              <button onClick={handleAdd} className="flex items-center gap-2 px-6 py-2.5 bg-gold text-navy font-semibold rounded-lg hover:shadow-lg transition-all">Add Client</button>
              <button onClick={() => { setIsAdding(false); setNewClientName(''); setNewClientLogo(''); }} className="flex items-center gap-2 px-6 py-2.5 border border-white/20 text-white rounded-lg hover:bg-white/5 transition-all">Cancel</button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {clients.map((client) => (
          <div key={client.id} className="glass-card rounded-2xl p-5 text-center group hover:border-gold/30 transition-all duration-300 relative">
            <button onClick={() => handleDelete(client.id)} className="absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center text-white/30 hover:text-red-400 hover:bg-red-500/20 transition-all opacity-0 group-hover:opacity-100">
              <Trash2 className="w-3.5 h-3.5" />
            </button>
            <div className="w-16 h-16 mx-auto mb-3 rounded-full flex items-center justify-center" style={{ background: 'rgba(249,178,51,0.1)', border: '1px solid rgba(249,178,51,0.15)' }}>
              {client.logo ? (
                <img src={client.logo} alt={client.name} className="w-10 h-10 object-contain" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
              ) : (
                <span className="text-xl font-bold text-gold">{client.name.charAt(0)}</span>
              )}
            </div>
            <h4 className="text-white font-medium text-sm group-hover:text-gold transition-colors">{client.name}</h4>
          </div>
        ))}
      </div>

      {clients.length === 0 && (
        <div className="text-center py-16">
          <Users className="w-16 h-16 text-white/20 mx-auto mb-4" />
          <p className="text-white/60">No clients added yet</p>
          <p className="text-white/40 text-sm mt-2">Click &quot;Add New Client&quot; to get started</p>
        </div>
      )}

      <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
        <p className="text-white/60 text-sm">Total Clients: <span className="text-gold font-semibold">{clients.length}</span></p>
        <p className="text-white/40 text-xs">These clients appear in the infinite marquee on your website</p>
      </div>
    </div>
  );
}
