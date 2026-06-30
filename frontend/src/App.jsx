import { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './components/Login';
import Register from './components/Register';
import TodoList from './components/TodoList';

function AppContent() {
  const { isAuthenticated, role, logout } = useAuth();
  const [showRegister, setShowRegister] = useState(false);

  if (!isAuthenticated) {
    return showRegister ? (
      <Register onSwitchToLogin={() => setShowRegister(false)} />
    ) : (
      <Login onSwitchToRegister={() => setShowRegister(true)} />
    );
  }

  const isAdmin = role === 'ROLE_ADMIN';

  return (
    <div>
      <header style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span>Logado como {isAdmin ? 'Admin' : 'Usuário'}</span>
        <button onClick={logout}>Sair</button>
      </header>
      <TodoList isAdmin={isAdmin} />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}