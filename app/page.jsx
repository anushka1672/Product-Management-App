'use client';

import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import CategoryFilters from "@/components/CategoryFilters";
import ProductGrid from "@/components/ProductGrid";
import ProductModal from "@/components/ProductModal";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Load products: Check localStorage first, otherwise fetch from API
  const loadProducts = async (query = "", category = "All") => {
    setLoading(true);
    setError(null);

    try {
      const localData = localStorage.getItem("dukaan_products");
      
      // If we already have stored data and no active search query, use local storage
      if (localData && !query) {
        let parsedProducts = JSON.parse(localData);
        
        if (category && category !== "All") {
          parsedProducts = parsedProducts.filter(
            (p) => p.category.toLowerCase() === category.toLowerCase()
          );
        }
        
        setProducts(parsedProducts);
        updateCategories(JSON.parse(localData));
        setLoading(false);
        return;
      }

      // Fetch from API if no local data exists or user is searching
      const params = new URLSearchParams();
      if (query) params.append("query", query);
      if (category && category !== "All") params.append("category", category);

      const res = await fetch(`/api/products?${params.toString()}`);
      if (!res.ok) throw new Error("Failed to load products from server");

      const data = await res.json();
      const productList = data.products || [];

      setProducts(productList);

      // Save initial API batch to localStorage if empty
      if (!localData && !query && category === "All") {
        localStorage.setItem("dukaan_products", JSON.stringify(productList));
      }

      updateCategories(productList);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateCategories = (items) => {
    const unique = ["All", ...new Set(items.map((p) => p.category))];
    setCategories(unique);
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

  // Add / Edit with localStorage synchronization
  const handleCreateOrUpdate = async (formData) => {
    try {
      let updatedList = [];

      if (editingProduct) {
        const res = await fetch(`/api/products/${editingProduct.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const updated = await res.json();

        updatedList = products.map((item) =>
          item.id === editingProduct.id ? { ...item, ...updated } : item
        );
      } else {
        const res = await fetch("/api/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const created = await res.json();

        // Assign a unique local ID if API returns duplicate ID
        const newProduct = { ...created, id: Date.now() };
        updatedList = [newProduct, ...products];
      }

      setProducts(updatedList);
      localStorage.setItem("dukaan_products", JSON.stringify(updatedList));
      updateCategories(updatedList);

      setIsModalOpen(false);
      setEditingProduct(null);
    } catch (err) {
      alert("Action failed: " + err.message);
    }
  };

  // Delete with localStorage synchronization
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      await fetch(`/api/products/${id}`, { method: "DELETE" });

      const updatedList = products.filter((item) => item.id !== id);
      setProducts(updatedList);
      localStorage.setItem("dukaan_products", JSON.stringify(updatedList));
      updateCategories(updatedList);
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