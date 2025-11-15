import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';

const SignupPage = () => {
  const { api, login } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState('STORE_KEEPER');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!name || !email || !password) {
      setError('Name, email and password are required');
      return;
    }

    try {
      setLoading(true);
      const res = await api.post('/auth/register', { name, email, password, role });
      // auto-login using returned credentials
      await login(email, password);
      navigate('/dashboard', { replace: true });
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
      <div className="max-w-md w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm p-8">
        <h1 className="text-2xl font-semibold mb-2 text-slate-900 dark:text-slate-50">Get started with Commodities</h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
          Create your account to manage inventory as a Manager or Store Keeper.
        </p>
        {error && (
          <div className="mb-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Full name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 rounded-md border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 rounded-md border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pr-10 px-3 py-2 rounded-md border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-0 px-3 flex items-center text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                <span className="text-sm">{showPassword ? '🙈' : '👁️'}</span>
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-3 py-2 rounded-md border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm"
            >
              <option value="MANAGER">Manager</option>
              <option value="STORE_KEEPER">Store Keeper</option>
            </select>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-2 rounded-md bg-sky-600 hover:bg-sky-700 text-white text-sm font-medium disabled:opacity-60"
          >
            {loading ? 'Creating account...' : 'Sign up'}
          </button>
          <div className="mt-4 text-xs text-slate-600 dark:text-slate-400 text-center">
            Already have an account?{' '}
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="text-sky-600 hover:text-sky-800 font-medium"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
