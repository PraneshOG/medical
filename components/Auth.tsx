
import React, { useState, FormEvent } from 'react';

interface AuthProps {
  mode: 'login' | 'register';
  onSuccess: (token: string, email: string) => void;
  onSwitchMode: () => void;
  apiBaseUrl: string;
}

const Auth: React.FC<AuthProps> = ({ mode, onSuccess, onSwitchMode, apiBaseUrl }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!email.trim() || !password.trim()) {
        setError('Email and password are required.');
        setIsLoading(false);
        return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
        setError('Please enter a valid email address.');
        setIsLoading(false);
        return;
    }

    if (mode === 'register') {
      if (password !== confirmPassword) {
        setError('Passwords do not match.');
        setIsLoading(false);
        return;
      }
      if (password.length < 6) {
        setError('Password must be at least 6 characters long.');
        setIsLoading(false);
        return;
      }
    }

    const endpoint = mode === 'login' ? `${apiBaseUrl}/auth/login` : `${apiBaseUrl}/auth/register`;
    const payload = { email, password };

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || `Error: ${response.status}`);
      } else {
        // Assuming backend returns { token: "...", user: { email: "..." } } or { token: "...", email: "..." }
        const userEmail = data.user?.email || data.email; 
        if (data.token && userEmail) {
          onSuccess(data.token, userEmail);
        } else {
          setError('Login failed. Invalid response from server.');
        }
      }
    } catch (err) {
      console.error('Auth API call failed:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-form-container card">
      <h2>{mode === 'login' ? 'Login' : 'Register'}</h2>
      <form onSubmit={handleSubmit}>
        {error && <p className="error">{error}</p>}
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            aria-required="true"
            aria-describedby={error && email.trim() === '' ? "email-error" : undefined}
          />
          {error && email.trim() === '' && <span id="email-error" className="sr-only">Email is required.</span>}
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            aria-required="true"
            minLength={mode === 'register' ? 6 : undefined}
            aria-describedby={error && password.trim() === '' ? "password-error" : undefined}
          />
           {error && password.trim() === '' && <span id="password-error" className="sr-only">Password is required.</span>}
        </div>
        {mode === 'register' && (
          <div>
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              aria-required="true"
              minLength={6}
            />
          </div>
        )}
        <button type="submit" disabled={isLoading}>
          {isLoading ? (mode === 'login' ? 'Logging in...' : 'Registering...') : (mode === 'login' ? 'Login' : 'Register')}
        </button>
      </form>
      <div className="switch-auth-mode">
        <button onClick={onSwitchMode} disabled={isLoading}>
          {mode === 'login' ? 'Need an account? Register' : 'Already have an account? Login'}
        </button>
      </div>
    </div>
  );
};

export default Auth;
