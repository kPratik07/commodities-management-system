import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout.jsx';
import { useAuth } from '../contexts/AuthContext.jsx';

const DashboardPage = () => {
  const { api } = useAuth();
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await api.get('/dashboard/summary');
        setSummary(res.data.data);
      } catch (err) {
        console.error(err);
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };
    fetchSummary();
  }, [api]);

  return (
    <Layout>
      <h2 className="text-xl font-semibold mb-4 text-slate-900 dark:text-slate-50">Dashboard</h2>
      {loading && <div className="text-sm text-slate-500">Loading...</div>}
      {error && !summary && <div className="text-sm text-red-600">{error}</div>}
      {summary && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
            <div className="text-xs text-slate-500 mb-1">Total Products</div>
            <div className="text-2xl font-semibold">{summary.totalProducts}</div>
          </div>
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
            <div className="text-xs text-slate-500 mb-1">Total Stock Units</div>
            <div className="text-2xl font-semibold">{summary.totalStock}</div>
          </div>
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
            <div className="text-xs text-slate-500 mb-1">Total Inventory Value</div>
            <div className="text-2xl font-semibold">
              ₹{summary.totalValue.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
            </div>
          </div>
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
            <div className="text-xs text-slate-500 mb-1">Low Stock Items (≤ 10)</div>
            <div className="text-2xl font-semibold">{summary.lowStockCount}</div>
          </div>
        </div>
      )}
      {summary &&
        summary.totalProducts === 0 &&
        summary.totalStock === 0 &&
        summary.totalValue === 0 &&
        summary.lowStockCount === 0 && (
          <div className="mt-4 text-sm text-slate-500">No data to show yet. Add products to see dashboard insights.</div>
        )}
    </Layout>
  );
};

export default DashboardPage;
