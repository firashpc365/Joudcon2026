import { useState } from 'react';
import { Lock, User, Eye, EyeOff } from 'lucide-react';
import { adminConfig } from '../config';

interface LoginProps {
  onLogin: () => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Simple auth check (in production, this would be a real API call)
    if (username === 'admin' && password === 'joudcon2025') {
      localStorage.setItem('joudcon_admin_auth', 'true');
      onLogin();
    } else {
      setError('Invalid username or password');
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <img
            src="/images/JOUD logo and color-01 (1).png"
            alt="Joudcon"
            className="h-20 w-auto mx-auto mb-4"
          />
          <h1 className="text-2xl font-bold text-white mb-2">
            {adminConfig.title}
          </h1>
          <p className="text-white/60">{adminConfig.loginTitle}</p>
        </div>

        {/* Login Form */}
        <div className="glass-card rounded-2xl p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-white/80 text-sm mb-2">
                {adminConfig.usernamePlaceholder}
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="w-full pl-12 pr-4 py-3 glass rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-gold/50"
                  placeholder="Enter username"
                />
              </div>
            </div>

            <div>
              <label className="block text-white/80 text-sm mb-2">
                {adminConfig.passwordPlaceholder}
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-12 pr-12 py-3 glass rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-gold/50"
                  placeholder="Enter password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-gold text-navy font-bold rounded-lg hover:shadow-lg hover:shadow-gold/30 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-navy border-t-transparent rounded-full animate-spin" />
              ) : (
                adminConfig.loginButton
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-white/10 text-center">
            <p className="text-white/40 text-sm">
              Default: admin / joudcon2025
            </p>
          </div>
        </div>

        {/* Back to Site */}
        <div className="text-center mt-8">
          <a
            href="/"
            className="text-white/60 hover:text-gold text-sm transition-colors"
          >
            ← Back to Website
          </a>
        </div>
      </div>
    </div>
  );
}
