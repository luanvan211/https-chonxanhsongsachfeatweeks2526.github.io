import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User, Bottle, CoffeeShop, Voucher, Message } from '../types';

interface DataContextType {
  users: User[];
  bottles: Bottle[];
  shops: CoffeeShop[];
  vouchers: Voucher[];
  messages: Message[];
  addUser: (user: User) => void;
  updateUser: (id: string, updates: Partial<User>) => void;
  deleteUser: (id: string) => void;
  registerBottle: (bottle: Bottle) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const MOCK_SHOPS: CoffeeShop[] = [
  { id: '1', name: 'Eco Coffee', lat: 51.505, lng: -0.09, address: '123 Green St' },
  { id: '2', name: 'Sustainable Brew', lat: 51.51, lng: -0.1, address: '456 Earth Ave' },
  { id: '3', name: 'Pure Beans', lat: 51.49, lng: -0.08, address: '789 Nature Rd' },
];

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [bottles, setBottles] = useState<Bottle[]>([]);
  const [shops] = useState<CoffeeShop[]>(MOCK_SHOPS);
  const [vouchers] = useState<Voucher[]>([]);
  const [messages] = useState<Message[]>([]);

  useEffect(() => {
    const savedUsers = localStorage.getItem('chonxanh_users_db');
    const savedBottles = localStorage.getItem('chonxanh_bottles_db');

    if (savedUsers) setUsers(JSON.parse(savedUsers));
    if (savedBottles) setBottles(JSON.parse(savedBottles));
  }, []);

  useEffect(() => {
    localStorage.setItem('chonxanh_users_db', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('chonxanh_bottles_db', JSON.stringify(bottles));
  }, [bottles]);

  const addUser = (user: User) => setUsers(prev => [...prev, user]);

  const updateUser = (id: string, updates: Partial<User>) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, ...updates } : u));
  };

  const deleteUser = (id: string) => {
    setUsers(prev => prev.filter(u => u.id !== id));
  };

  const registerBottle = (bottle: Bottle) => {
    setBottles(prev => [...prev, bottle]);
    setUsers(prev => prev.map(u =>
      u.id === bottle.ownerId
        ? { ...u, bottlesRegistered: [...u.bottlesRegistered, bottle.id] }
        : u
    ));
  };

  return (
    <DataContext.Provider value={{
      users, bottles, shops, vouchers, messages,
      addUser, updateUser, deleteUser, registerBottle
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
