'use client';

import React, { useState, useEffect } from "react";
import Header from "./component/Header";
import CategoryFilters from "./component/CategoryFilters";
import ProductGrid from "./component/ProductGrid";
import ProductModal from "./component/ProductModal";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const loadProducts = async (query = "", category = "All") => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (query) params.append("query", query);
      if (category && category !== "All") params.append("category", category);

      const res = await fetch(`/api/products?${params.toString()}`);
      if (!res.ok) throw new Error("Failed to load products from server");

      const data = await res.json();
      const productList = data.products || [];
      setProducts(productList);

      if (categories.length === 1 && productList.length > 0) {
        const unique = ["All", ...new Set(productList.map((p) => p.category))];
        setCategories(unique);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts(searchQuery, selectedCategory);
  }, [selectedCategory]);

  const handleSearchSubmit = () => {
    loadProducts(searchQuery, selectedCategory);
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    loadProducts("", "All");
  };

  const handleCreateOrUpdate = async (formData) => {
    try {
      if (editingProduct) {
        const res = await fetch(`/api/products/${editingProduct.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const updated = await res.json();
        setProducts((prev) =>
          prev.map((item) => (item.id === editingProduct.id ? { ...item, ...updated } : item))
        );
      } else {
        const res = await fetch("/api/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const created = await res.json();
        setProducts((prev) => [created, ...prev]);
      }
      setIsModalOpen(false);
      setEditingProduct(null);
    } catch (err) {
      alert("Action failed: " + err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete product");

      setProducts((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      alert("Delete failed: " + err.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearchSubmit={handleSearchSubmit}
        onOpenAddModal={() => {
          setEditingProduct(null);
          setIsModalOpen(true);
        }}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 w-full">
        <CategoryFilters
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        <ProductGrid
          products={products}
          loading={loading}
          error={error}
          onRetry={() => loadProducts(searchQuery, selectedCategory)}
          onResetFilters={handleResetFilters}
          onEdit={(item) => {
            setEditingProduct(item);
            setIsModalOpen(true);
          }}
          onDelete={handleDelete}
        />
      </main>

      <ProductModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingProduct(null);
        }}
        onSubmit={handleCreateOrUpdate}
        initialData={editingProduct}
      />
    </div>
  );
}