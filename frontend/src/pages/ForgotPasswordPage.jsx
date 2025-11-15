import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';

const ForgotPasswordPage = () => {
  const { api } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!email) {
      setError('Email is required');
      return;
    }

    try {
      setLoading(true);
      const res = await api.post('/auth/forgot-password', { email });
      setMessage(res.data?.message || 'If that email exists, an OTP has been sent.');
      // After OTP is sent, redirect to reset password page
      setTimeout(() => {
        navigate('/reset-password', { state: { email } });
      }, 800);
    } catch (err) {
      console.error(err);
      setError('Failed to  link');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
      <div className="max-w-md w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm p-8">
        <h1 className="text-2xl font-semibold mb-2 text-slate-900 dark:text-slate-50">Forgot password</h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
          Enter your email address and well send you a link to reset your password.
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
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-2 rounded-md bg-sky-600 hover:bg-sky-700 text-white text-sm font-medium disabled:opacity-60"
          >
            {loading ? 'Sending Otp' : 'Send Otp'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="w-full mt-2 py-2 rounded-md border border-slate-300 dark:border-slate-700 text-sm"
          >
            Back to login
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
