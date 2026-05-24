import { createContext, useContext, useState } from 'react';
import { mockUser } from '../data/mockUser';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [checklistDone, setChecklistDone] = useState(false);

  function login() {
    setUser(mockUser);
  }

  function logout() {
    setUser(null);
    setChecklistDone(false);
  }

  function completeChecklist() {
    setChecklistDone(true);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, checklistDone, completeChecklist }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
