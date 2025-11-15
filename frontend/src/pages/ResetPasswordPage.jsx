import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';

const ResetPasswordPage = () => {
  const { api } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (location.state?.email) {
      setEmail(location.state.email);
    }
  }, [location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!email || !otp || !password || !confirm) {
      setError('Email, OTP and both password fields are required');
      return;
    }

    if (password !== confirm) {
      setError('Passwords do not match');
      return;
    }

    try {
      setLoading(true);
      const res = await api.post('/auth/reset-password-otp', { email, otp, password });
      setMessage(res.data?.message || 'Password reset successfully.');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
      <div className="max-w-md w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm p-8">
        <h1 className="text-2xl font-semibold mb-2 text-slate-900 dark:text-slate-50">Reset password with OTP</h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
          Enter the email address, the 4-digit OTP you received, and your new password.
        </p>
        {error && (
          <div className="mb-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">
            {error}
          </div>
        )}
        {message && (
          <div className="mb-3 text-sm text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-md px-3 py-2">
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
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
            <label className="block text-sm font-medium mb-1">4-digit OTP</label>
            <input
              type="text"
              maxLength={4}
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ''))}
              className="w-full px-3 py-2 rounded-md border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm tracking-[0.4em] text-center"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">New password</label>
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
            <label className="block text-sm font-medium mb-1">Confirm password</label>
            <div className="relative">
              <input
                type={showConfirm ? 'text' : 'password'}
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="w-full pr-10 px-3 py-2 rounded-md border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm"
              />
              <button
                type="button"
                onClick={() => setShowConfirm((prev) => !prev)}
                className="absolute inset-y-0 right-0 px-3 flex items-center text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300"
                aria-label={showConfirm ? 'Hide password' : 'Show password'}
              >
                <span className="text-sm">{showConfirm ? '🙈' : '👁️'}</span>
              </button>
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-2 rounded-md bg-sky-600 hover:bg-sky-700 text-white text-sm font-medium disabled:opacity-60"
          >
            {loading ? 'Updating password...' : 'Update password'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
