import { useState } from 'react';
import api from '../services/api';

export default function Register({ onSwitchToLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    try {
      await api.post('/api/auth/register', { username, password });
      setSuccess(true);
    } catch (err) {
      setError('Não foi possível criar a conta. Tente outro usuário.');
    }
  }

  if (success) {
    return (
      <div>
        <p>Conta criada! Agora você já pode entrar.</p>
        <button onClick={onSwitchToLogin}>Ir para o login</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Criar conta</h2>
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
      <button type="submit">Cadastrar</button>
      <p>
        Já tem conta?{' '}
        <button type="button" onClick={onSwitchToLogin}>
          Entrar
        </button>
      </p>
    </form>
  );
}