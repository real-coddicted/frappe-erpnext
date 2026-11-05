import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { apiGet } from '../api/client';
import { Mail, Lock, AlertCircle } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [branding, setBranding] = useState({ company_name: 'ESS Portal', company_logo: null });
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBranding = async () => {
      try {
        const data = await apiGet('/method/hr_ess_api.api.company.get_company_branding');
        if (data && data.message) {
          setBranding(data.message);
        }
      } catch (err) {
        console.error('Failed to load branding', err);
      }
    };
    fetchBranding();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      await login(email.trim(), password);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-bg-shapes">
        <div className="login-shape-1"></div>
        <div className="login-shape-2"></div>
      </div>
      
      <div className="login-grid">
        <div className="login-form-wrapper">
          <div className="login-card">
            <div className="login-header">
              <div className="login-logo-container">
                {branding.company_logo ? (
                  <img src={branding.company_logo} alt={branding.company_name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                ) : (
                  <span style={{ fontWeight: 700, color: '#4f46e5', fontSize: '1.25rem' }}>HR</span>
                )}
              </div>
              <h2>{branding.company_name}</h2>
              <p>Employee Self-Service Portal</p>
            </div>
            
            <form onSubmit={handleSubmit} className="login-form">
              {error && (
                <div className="error-message">
                  <AlertCircle size={18} className="error-icon" />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    <span>Authentication failed</span>
                    <span style={{ fontWeight: 400, opacity: 0.9 }}>{error}</span>
                  </div>
                </div>
              )}
              
              <div className="form-group">
                <label htmlFor="email">Work Email</label>
                <div className="input-with-icon">
                  <Mail />
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoFocus
                    placeholder="name@example.com"
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className="input-with-icon">
                  <Lock />
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                  />
                </div>
              </div>
              
              <button type="submit" disabled={isSubmitting} className="btn-primary">
                {isSubmitting ? 'Authenticating...' : 'Sign In'}
              </button>
            </form>
          </div>
          
          <div className="login-footer-links">
            <div className="login-footer-nav">
              <a href="#">Help Center</a>
              <span>•</span>
              <a href="#">IT Support</a>
              <span>•</span>
              <a href="#">Security</a>
            </div>
            <div className="login-status">
              <span className="status-dot"></span>
              <span>All systems normal</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
