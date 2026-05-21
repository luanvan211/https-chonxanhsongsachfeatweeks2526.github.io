export type Role = 'user' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  tokens: number;
  bottlesRegistered: string[]; // IDs of registered bottles
}

export interface Bottle {
  id: string;
  ownerId: string;
  type: string;
  color: string;
  size: string;
  registeredAt: string;
}

export interface CoffeeShop {
  id: string;
  name: string;
  lat: number;
  lng: number;
  address: string;
}

export interface Voucher {
  id: string;
  code: string;
  description: string;
  expiresAt: string;
  claimed: boolean;
}

export interface Message {
  id: string;
  from: string;
  content: string;
  timestamp: string;
  read: boolean;
}
