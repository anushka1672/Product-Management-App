'use client';

import React from "react";

export default function ProductCard({ product, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
      <div>
        <div className="w-full h-44 bg-slate-100 rounded-lg overflow-hidden mb-3 flex items-center justify-center relative">
          <img
            src={product.thumbnail || product.images?.[0] || "https://via.placeholder.com/150"}
            alt={product.title}
            className="w-full h-full object-cover"
          />
        </div>
        
        <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded capitalize">
          {product.category}
        </span>
        
        <h3 className="font-bold text-slate-800 mt-2 text-base line-clamp-1">
          {product.title}
        </h3>

        <div className="flex justify-between items-center mt-3">
          <span className="text-lg font-black text-slate-900">${product.price}</span>
          <span className="text-xs font-medium text-slate-600 bg-slate-100 px-2 py-1 rounded">
            Stock: {product.stock}
          </span>
        </div>
      </div>

      <div className="flex gap-2 mt-4 pt-3 border-t border-slate-100">
        <button
          onClick={() => onEdit(product)}
          className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium py-1.5 rounded-lg text-xs transition-colors"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(product.id)}
          className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 font-medium py-1.5 rounded-lg text-xs transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  );
}