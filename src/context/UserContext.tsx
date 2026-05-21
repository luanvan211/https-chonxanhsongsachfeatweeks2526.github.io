import { createContext, useContext, useState, type ReactNode, useEffect } from 'react';

interface UserContextType {
  isLoggedIn: boolean;
  refills: number;
  plasticSaved: number;
  points: number;
  tier: string;
  addRefill: () => void;
  login: (token: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [refills, setRefills] = useState(0);
  const [points, setPoints] = useState(0);

  // 1 refill = 1 plastic bottle saved
  const plasticSaved = refills;

  const getTier = (pts: number) => {
    if (pts > 500) return 'Aqua Legend';
    if (pts > 200) return 'Aqua Hero';
    if (pts > 50) return 'Aqua Fan';
    return 'Aqua Rookie';
  };

  const addRefill = () => {
    setRefills(prev => prev + 1);
    setPoints(prev => prev + 10);
  };

  const login = (token: string) => {
    // In a real app, verify token
    if (token) {
      setIsLoggedIn(true);
      // Mock data loading
      setRefills(12);
      setPoints(120);
    }
  };

  // Check for token in URL on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    if (token) {
      login(token);
    }
  }, []);

  return (
    <UserContext.Provider value={{
      isLoggedIn,
      refills,
      plasticSaved,
      points,
      tier: getTier(points),
      addRefill,
      login
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
