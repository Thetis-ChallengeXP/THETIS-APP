// utils/SavedStocksManager.ts
import { Stock } from '../utils/stocksData';

class SavedStocksManager {
  private static instance: SavedStocksManager;
  private savedStocks: Stock[] = [];
  private listeners: (() => void)[] = [];

  static getInstance(): SavedStocksManager {
    if (!SavedStocksManager.instance) {
      SavedStocksManager.instance = new SavedStocksManager();
    }
    return SavedStocksManager.instance;
  }

  getSavedStocks(): Stock[] {
    return [...this.savedStocks];
  }

  saveStock(stock: Stock): void {
    if (!this.isStockSaved(stock.id)) {
      this.savedStocks = [...this.savedStocks, stock];
      this.notifyListeners();
    }
  }

  unsaveStock(stockId: string): void {
    this.savedStocks = this.savedStocks.filter((stock) => stock.id !== stockId);
    this.notifyListeners();
  }

  isStockSaved(stockId: string): boolean {
    return this.savedStocks.some((stock) => stock.id === stockId);
  }

  addListener(listener: () => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private notifyListeners(): void {
    this.listeners.forEach((listener) => listener());
  }
}

export default SavedStocksManager;

import { useState, useEffect } from 'react';

export const useSavedStocks = () => {
  const manager = SavedStocksManager.getInstance();
  const [savedStocks, setSavedStocks] = useState<Stock[]>(manager.getSavedStocks());

  useEffect(() => {
    const unsubscribe = manager.addListener(() => {
      setSavedStocks(manager.getSavedStocks());
    });

    return unsubscribe;
  }, [manager]);

  return {
    savedStocks,
    saveStock: (stock: Stock) => manager.saveStock(stock),
    unsaveStock: (stockId: string) => manager.unsaveStock(stockId),
    isStockSaved: (stockId: string) => manager.isStockSaved(stockId),
  };
};
