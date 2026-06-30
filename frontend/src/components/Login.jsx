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
    <form onSubmit={handleSubmit}>
      <h2>Entrar</h2>
      <input
        type="text"
        placeholder="Usuário"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit">Entrar</button>
      <p>
        Não tem conta?{' '}
        <button type="button" onClick={onSwitchToRegister}>
          Cadastre-se
        </button>
      </p>
    </form>
  );
}