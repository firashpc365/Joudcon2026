import { useState, useEffect } from 'react';
import {
  Briefcase,
  FileText,
  Users,
  MessageSquare,
  LogOut,
  Menu,
  X,
  BarChart3,
  TrendingUp,
  Eye,
} from 'lucide-react';
import { adminConfig } from '../config';
import PortfolioManager from './PortfolioManager';
import ContentEditor from './ContentEditor';
import ClientManager from './ClientManager';
import Inquiries from './Inquiries';

interface DashboardProps {
  onLogout: () => void;
}

type TabType = 'dashboard' | 'portfolio' | 'content' | 'clients' | 'inquiries';

const tabs: { id: TabType; label: string; icon: React.ElementType }[] = [
  { id: 'dashboard', label: 'Overview', icon: BarChart3 },
  { id: 'portfolio', label: adminConfig.sections.portfolio, icon: Briefcase },
  { id: 'content', label: adminConfig.sections.content, icon: FileText },
  { id: 'clients', label: adminConfig.sections.clients, icon: Users },
  { id: 'inquiries', label: adminConfig.sections.inquiries, icon: MessageSquare },
];

export default function Dashboard({ onLogout }: DashboardProps) {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [stats, setStats] = useState({ portfolio: 0, inquiries: 0, clients: 0, views: 0 });

  useEffect(() => {
    const portfolio = JSON.parse(localStorage.getItem('joudcon_portfolio') || '[]');
    const inquiries = JSON.parse(localStorage.getItem('joudcon_inquiries') || '[]');
    const clients = JSON.parse(localStorage.getItem('joudcon_clients') || '[]');
    const views = parseInt(localStorage.getItem('joudcon_views') || '0');
    setStats({ portfolio: portfolio.length, inquiries: inquiries.length, clients: clients.length, views });
  }, [activeTab]);

  const renderOverview = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Portfolio Projects', value: stats.portfolio, icon: Briefcase, color: 'from-gold/20 to-gold/5' },
          { label: 'Total Inquiries', value: stats.inquiries, icon: MessageSquare, color: 'from-blue-500/20 to-blue-500/5' },
          { label: 'Client Logos', value: stats.clients, icon: Users, color: 'from-green-500/20 to-green-500/5' },
          { label: 'Page Views', value: stats.views, icon: Eye, color: 'from-purple-500/20 to-purple-500/5' },
        ].map((stat, i) => (
          <div key={i} className="glass-card rounded-2xl p-6 hover:border-gold/30 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-gold" />
              </div>
              <TrendingUp className="w-5 h-5 text-white/20" />
            </div>
            <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
            <p className="text-white/60 text-sm">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="glass-card rounded-2xl p-8">
        <h3 className="text-xl font-bold text-white mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Add Project', tab: 'portfolio' as TabType, desc: 'Create new portfolio item' },
            { label: 'Edit Content', tab: 'content' as TabType, desc: 'Update website text' },
            { label: 'Add Client', tab: 'clients' as TabType, desc: 'Upload client logo' },
            { label: 'View Messages', tab: 'inquiries' as TabType, desc: 'Check contact form' },
          ].map((action, i) => (
            <button key={i} onClick={() => setActiveTab(action.tab)} className="p-4 rounded-xl text-left transition-all duration-300 hover:border-gold/40 group" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
              <p className="text-white font-medium group-hover:text-gold transition-colors">{action.label}</p>
              <p className="text-white/40 text-xs mt-1">{action.desc}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="glass-card rounded-2xl p-8">
        <h3 className="text-xl font-bold text-white mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {JSON.parse(localStorage.getItem('joudcon_inquiries') || '[]').slice(0, 5).map((inquiry: any, i: number) => (
            <div key={i} className="flex items-center gap-4 p-3 rounded-lg" style={{ background: 'rgba(255,255,255,0.02)' }}>
              <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                <MessageSquare className="w-4 h-4 text-gold" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm truncate">{inquiry.name}</p>
                <p className="text-white/40 text-xs truncate">{inquiry.email}</p>
              </div>
              <span className="text-white/30 text-xs">{new Date(inquiry.date).toLocaleDateString()}</span>
            </div>
          )) || <p className="text-white/40 text-sm">No recent activity</p>}
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return renderOverview();
      case 'portfolio': return <PortfolioManager />;
      case 'content': return <ContentEditor />;
      case 'clients': return <ClientManager />;
      case 'inquiries': return <Inquiries />;
      default: return renderOverview();
    }
  };

  return (
    <div className="min-h-screen flex">
      <aside className="hidden lg:flex flex-col w-64 border-r border-white/5 fixed h-full" style={{ background: 'rgba(10, 17, 40, 0.95)' }}>
        <div className="p-6 border-b border-white/5">
          <div className="flex items-center gap-3">
            <img src="/images/JOUD logo and color-01 (1).png" alt="Joudcon" className="h-10 w-auto" />
            <span className="text-lg font-bold text-white">Admin</span>
          </div>
        </div>
        <nav className="flex-1 p-4">
          <ul className="space-y-1">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <li key={tab.id}>
                  <button onClick={() => setActiveTab(tab.id)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${activeTab === tab.id ? 'bg-gold text-navy' : 'text-white/70 hover:bg-white/5 hover:text-white'}`}>
                    <IconComponent className="w-5 h-5" />
                    <span>{tab.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="p-4 border-t border-white/5">
          <button onClick={onLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-white/70 hover:bg-red-500/20 hover:text-red-400 transition-all duration-300">
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 glass-dark">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <img src="/images/JOUD logo and color-01 (1).png" alt="Joudcon" className="h-8 w-auto" />
            <span className="text-lg font-bold text-white">Admin</span>
          </div>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-white">
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        {isMobileMenuOpen && (
          <div className="border-t border-white/5 p-4">
            <ul className="space-y-1">
              {tabs.map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <li key={tab.id}>
                    <button onClick={() => { setActiveTab(tab.id); setIsMobileMenuOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${activeTab === tab.id ? 'bg-gold text-navy' : 'text-white/70 hover:bg-white/5'}`}>
                      <IconComponent className="w-5 h-5" />
                      <span>{tab.label}</span>
                    </button>
                  </li>
                );
              })}
              <li>
                <button onClick={onLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-white/70 hover:bg-red-500/20 hover:text-red-400">
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>

      <main className="flex-1 lg:ml-64 pt-16 lg:pt-0">
        <div className="p-6 lg:p-10">
          <div className="mb-8">
            <h1 className="text-2xl lg:text-3xl font-bold text-white">{tabs.find((t) => t.id === activeTab)?.label}</h1>
            <p className="text-white/60 mt-1">Manage your {tabs.find((t) => t.id === activeTab)?.label.toLowerCase()}</p>
          </div>
          {renderContent()}
        </div>
      </main>
    </div>
  );
}
