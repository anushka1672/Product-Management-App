'use client';

import React from "react";

export default function Header({
  searchQuery,
  setSearchQuery,
  onOpenAddModal,
  onSearchSubmit
}) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearchSubmit();
    }
  };

  return (
    <header className="bg-slate-900 text-white sticky top-0 z-40 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        <span className="text-xl sm:text-2xl font-black tracking-wider text-indigo-400">
          Dukaan<span className="text-white">Se</span>
        </span>

        <div className="flex items-center gap-3 flex-1 justify-end max-w-xl">
          <div className="relative w-full max-w-xs sm:max-w-md">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search by product name..."
              className="w-full pl-3 pr-8 py-1.5 text-sm bg-slate-800 text-white rounded-lg border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-slate-400"
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery("");
                }}
                className="absolute right-2.5 top-2 text-xs text-slate-400 hover:text-white"
              >
                ✕
              </button>
            )}
          </div>

          <button
            onClick={onSearchSubmit}
            className="hidden sm:inline-flex bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-3.5 py-1.5 rounded-lg transition-colors"
          >
            Search
          </button>

          <button
            onClick={onOpenAddModal}
            className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium px-3.5 py-1.5 rounded-lg transition-colors flex items-center gap-1 shrink-0"
          >
            <span className="text-lg leading-none">+</span>
            <span className="hidden sm:inline">Add Product</span>
          </button>
        </div>
      </div>
    </header>
  );
}