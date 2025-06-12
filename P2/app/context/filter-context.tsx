"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface FilterContextType {
  filter: string;
  setFilter: (filter: string) => void;
  printType: string;
  setPrintType: (printType: string) => void;
  orderBy: string;
  setOrderBy: (orderBy: string) => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider = ({ children }: { children: ReactNode }) => {
  const [filter, setFilter] = useState('none');
  const [printType, setPrintType] = useState('all');
  const [orderBy, setOrderBy] = useState('relevance');

  return (
    <FilterContext.Provider value={{ filter, setFilter, printType, setPrintType, orderBy, setOrderBy }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilters = () => {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error('useFilters must be used within a FilterProvider');
  }
  return context;
};
