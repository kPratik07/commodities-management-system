import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout.jsx';
import { useAuth } from '../contexts/AuthContext.jsx';
import { Link } from 'react-router-dom';

const ProductsPage = () => {
  const { api } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get('/products');
        setProducts(res.data.data || []);
      } catch (err) {
        console.error(err);
        setError('Failed to load products');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [api]);

  return (
    <Layout>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-50">Products</h2>
        <Link
          to="/products/new"
          className="text-xs px-3 py-2 rounded-md bg-sky-600 text-white hover:bg-sky-700"
        >
          + Add Product
        </Link>
      </div>

      {loading && <div className="text-sm text-slate-500">Loading...</div>}
      {error && <div className="text-sm text-red-600 mb-2">{error}</div>}

      {!loading && products.length === 0 && (
        <div className="text-sm text-slate-500">No products found.</div>
      )}

      {products.length > 0 && (
        <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50 dark:bg-slate-900">
              <tr>
                <th className="px-3 py-2 text-left font-medium text-slate-600 dark:text-slate-300">Name</th>
                <th className="px-3 py-2 text-left font-medium text-slate-600 dark:text-slate-300">Category</th>
                <th className="px-3 py-2 text-right font-medium text-slate-600 dark:text-slate-300">Price</th>
                <th className="px-3 py-2 text-right font-medium text-slate-600 dark:text-slate-300">Stock</th>
                <th className="px-3 py-2 text-left font-medium text-slate-600 dark:text-slate-300">Unit</th>
                <th className="px-3 py-2 text-left font-medium text-slate-600 dark:text-slate-300">Status</th>
                <th className="px-3 py-2 text-right font-medium text-slate-600 dark:text-slate-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => {
                const outOfStock = p.stock === 0;
                const lowStock = p.stock > 0 && p.stock <= 10;
                return (
                  <tr key={p._id} className="border-t border-slate-100 dark:border-slate-800">
                    <td className="px-3 py-2">{p.name}</td>
                    <td className="px-3 py-2 text-xs text-slate-500">{p.category}</td>
                    <td className="px-3 py-2 text-right">₹{p.price}</td>
                    <td className="px-3 py-2 text-right">{p.stock}</td>
                    <td className="px-3 py-2 text-xs text-slate-500">{p.unit}</td>
                    <td className="px-3 py-2">
                      {outOfStock ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-200">
                          Out of stock
                        </span>
                      ) : lowStock ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-200">
                          Low stock
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-200">
                          In stock
                        </span>
                      )}
                    </td>
                    <td className="px-3 py-2 text-right">
                      <Link
                        to={`/products/${p._id}/edit`
                        }
                        className="text-xs text-sky-600 hover:text-sky-800"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </Layout>
  );
};

export default ProductsPage;
