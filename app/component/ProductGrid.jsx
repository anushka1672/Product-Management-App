'use client';

import React from "react";
import ProductCard from "./ProductCard";

export default function ProductGrid({
  products,
  loading,
  error,
  onRetry,
  onResetFilters,
  onEdit,
  onDelete,
}) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 animate-pulse">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="bg-white rounded-xl h-64 border border-slate-200"></div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl text-center">
        <p className="font-semibold">Error: {error}</p>
        <button onClick={onRetry} className="mt-2 text-xs underline font-bold">
          Retry loading
        </button>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
        <h3 className="text-lg font-bold text-slate-700 mb-1">No products found</h3>
        <p className="text-sm text-slate-500 mb-4">Try clearing filters or search keywords.</p>
        <button
          onClick={onResetFilters}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-xs font-semibold"
        >
          Reset Filters
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}