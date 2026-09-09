'use client';

import React, { useState, useEffect } from "react";

export default function ProductModal({ isOpen, onClose, onSubmit, initialData }) {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    price: "",
    stock: "",
    thumbnail: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        category: initialData.category || "",
        price: initialData.price || "",
        stock: initialData.stock || "",
        thumbnail: initialData.thumbnail || "",
      });
    } else {
      setFormData({ title: "", category: "", price: "", stock: "", thumbnail: "" });
    }
    setErrors({});
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Product name is required";
    if (!formData.category.trim()) newErrors.category = "Category is required";
    if (!formData.price || Number(formData.price) <= 0) newErrors.price = "Price must be greater than 0";
    if (formData.stock === "" || Number(formData.stock) < 0) newErrors.stock = "Stock cannot be negative";
    if (!formData.thumbnail.trim()) newErrors.thumbnail = "Image URL is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onSubmit({
      ...formData,
      price: Number(formData.price),
      stock: Number(formData.stock),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-xl">
        <div className="flex justify-between items-center mb-4 pb-2 border-b border-slate-100">
          <h2 className="text-lg font-bold text-slate-800">
            {initialData ? "Edit Product" : "Add New Product"}
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 text-xl font-bold">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Product Name</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.title && <p className="text-xs text-red-500 mt-0.5">{errors.title}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Category</label>
            <input
              type="text"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500 capitalize"
            />
            {errors.category && <p className="text-xs text-red-500 mt-0.5">{errors.category}</p>}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Price ($)</label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {errors.price && <p className="text-xs text-red-500 mt-0.5">{errors.price}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Stock</label>
              <input
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {errors.stock && <p className="text-xs text-red-500 mt-0.5">{errors.stock}</p>}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Image URL</label>
            <input
              type="text"
              value={formData.thumbnail}
              onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.thumbnail && <p className="text-xs text-red-500 mt-0.5">{errors.thumbnail}</p>}
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-slate-600 text-sm font-medium hover:bg-slate-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 rounded-lg"
            >
              {initialData ? "Save Changes" : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}