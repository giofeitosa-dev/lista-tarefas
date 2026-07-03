import { useState } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function Login({ onSwitchToRegister }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    try {
      const response = await api.post('/api/auth/login', { username, password });
      login(response.data.token, response.data.role);
    } catch (err) {
      setError('Usuário ou senha incorretos.');
    }
  }

  return (
    <div className="todo-container" style={{ maxWidth: 400 }}>
      <h2 className="todo-title">🔐 Login</h2>
      <div className="add-form" style={{ flexDirection: 'column' }}>
        <input
          type="text"
          placeholder="Usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="input"
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input"
        />
        {error && <p style={{ color: '#dc2626', margin: 0 }}>{error}</p>}
        <button onClick={handleSubmit} className="btn btn-blue">
          Entrar
        </button>
      </div>
      <p style={{ textAlign: 'center', color: '#555' }}>
        Não tem conta?{' '}
        <button
          onClick={onSwitchToRegister}
          className="btn btn-gray"
          style={{ padding: '4px 10px', fontSize: '0.85rem' }}
        >
          Cadastre-se
        </button>
      </p>
    </div>
  );
}