import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../components/Layout.jsx';
import { useAuth } from '../contexts/AuthContext.jsx';

const categories = ['Grains', 'Dairy', 'Vegetables', 'Fruits', 'Meat', 'Beverages'];
const units = ['kg', 'liters', 'pieces', 'boxes', 'grams'];

const ProductFormPage = ({ mode }) => {
  const { id } = useParams();
  const { api } = useAuth();
  const navigate = useNavigate();

  const isEdit = mode === 'edit';

  const [form, setForm] = useState({
    name: '',
    category: '',
    price: '',
    stock: '',
    unit: '',
    supplier: '',
    description: '',
  });
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isEdit || !id) return;

    const fetchProduct = async () => {
      try {
        const res = await api.get('/products');
        const all = res.data.data || [];
        const existing = all.find((p) => p._id === id);
        if (!existing) {
          setError('Product not found');
          return;
        }
        setForm({
          name: existing.name || '',
          category: existing.category || '',
          price: existing.price ?? '',
          stock: existing.stock ?? '',
          unit: existing.unit || '',
          supplier: existing.supplier || '',
          description: existing.description || '',
        });
      } catch (err) {
        console.error(err);
        setError('Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [api, id, isEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.name || !form.category || !form.price || !form.stock || !form.unit) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      setSaving(true);
      const payload = {
        ...form,
        price: Number(form.price),
        stock: Number(form.stock),
      };

      if (isEdit) {
        await api.put(`/products/${id}`, payload);
      } else {
        await api.post('/products', payload);
      }

      navigate('/products');
    } catch (err) {
      console.error(err);
      setError('Failed to save product');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Layout>
      <h2 className="text-xl font-semibold mb-4 text-slate-900 dark:text-slate-50">
        {isEdit ? 'Edit Product' : 'Add Product'}
      </h2>

      {loading && <div className="text-sm text-slate-500">Loading...</div>}
      {error && <div className="mb-3 text-sm text-red-600">{error}</div>}

      {!loading && (
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl">
          <div>
            <label className="block text-sm font-medium mb-1">Name *</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-md border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Category *</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-md border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm"
            >
              <option value="">Select category</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Price (₹) *</label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-md border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Stock *</label>
            <input
              type="number"
              name="stock"
              value={form.stock}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-md border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Unit *</label>
            <select
              name="unit"
              value={form.unit}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-md border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm"
            >
              <option value="">Select unit</option>
              {units.map((u) => (
                <option key={u} value={u}>
                  {u}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Supplier</label>
            <input
              name="supplier"
              value={form.supplier}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-md border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 rounded-md border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm"
            />
          </div>

          <div className="md:col-span-2 flex gap-2 mt-2">
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2 rounded-md bg-sky-600 text-white text-sm font-medium disabled:opacity-60"
            >
              {saving ? 'Saving...' : isEdit ? 'Update Product' : 'Create Product'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/products')}
              className="px-4 py-2 rounded-md border border-slate-300 dark:border-slate-700 text-sm"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </Layout>
  );
};

export default ProductFormPage;
