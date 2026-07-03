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
  <div className="todo-container" style={{ maxWidth: 700 }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
      <span style={{ color: '#555', fontSize: '0.9rem' }}>
        Logado como <strong>{isAdmin ? 'Admin' : 'Usuário'}</strong>
      </span>
      <button onClick={logout} className="btn btn-gray">
        Sair
      </button>
    </div>
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