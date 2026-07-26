import React, { createContext, useCallback, useContext, useEffect, useState, ReactNode } from 'react';

export interface HistoryContextType {
  history: string[];
  addToHistory: (username: string) => void;
  removeFromHistory: (username: string) => void;
  clearHistory: () => void;
}

const HistoryContext = createContext<HistoryContextType | undefined>(undefined);

const HISTORY_STORAGE_KEY = 'hublens_search_history';
export const HISTORY_LIMIT = 8;

const loadHistory = (): string[] => {
  try {
    const raw = window.localStorage.getItem(HISTORY_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((entry) => typeof entry === 'string') : [];
  } catch {
    return [];
  }
};

interface Props {
  children: ReactNode;
}

export const HistoryProvider = ({ children }: Props) => {
  const [history, setHistory] = useState<string[]>(loadHistory);

  useEffect(() => {
    try {
      window.localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(history));
    } catch {
      // localStorage may be unavailable (e.g. private browsing); history just
      // won't persist across sessions in that case.
    }
  }, [history]);

  const addToHistory = useCallback((username: string) => {
    setHistory((h) => {
      const withoutExisting = h.filter((entry) => entry.toLowerCase() !== username.toLowerCase());
      return [username, ...withoutExisting].slice(0, HISTORY_LIMIT);
    });
  }, []);

  const removeFromHistory = useCallback((username: string) => {
    setHistory((h) => h.filter((entry) => entry.toLowerCase() !== username.toLowerCase()));
  }, []);

  const clearHistory = useCallback(() => setHistory([]), []);

  return (
    <HistoryContext.Provider value={{ history, addToHistory, removeFromHistory, clearHistory }}>
      {children}
    </HistoryContext.Provider>
  );
};

export const useSearchHistory = (): HistoryContextType => {
  const ctx = useContext(HistoryContext);
  if (!ctx) throw new Error('useSearchHistory must be used within a HistoryProvider');
  return ctx;
};
