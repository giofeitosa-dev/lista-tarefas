import { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './components/Login';
import Register from './components/Register';
import TodoList from './components/TodoList';
import AdminPanel from './components/AdminPanel';

function AppContent() {
  const { isAuthenticated, role, logout } = useAuth();
  const [showRegister, setShowRegister] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);

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
        <div style={{ display: 'flex', gap: 8 }}>
          {isAdmin && !showAdmin && (
            <button onClick={() => setShowAdmin(true)} className="btn btn-blue">
              👥 Usuários
            </button>
          )}
          <button onClick={logout} className="btn btn-gray">
            Sair
          </button>
        </div>
      </div>

      {showAdmin ? (
        <AdminPanel onClose={() => setShowAdmin(false)} />
      ) : (
        <TodoList />
      )}
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