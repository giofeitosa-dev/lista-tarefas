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
      <div className="todo-container" style={{ maxWidth: 400, textAlign: 'center' }}>
        <h2 className="todo-title">✅ Conta criada!</h2>
        <p style={{ color: '#555' }}>Agora você já pode entrar.</p>
        <button onClick={onSwitchToLogin} className="btn btn-blue">
          Ir para o login
        </button>
      </div>
    );
  }

  return (
    <div className="todo-container" style={{ maxWidth: 400 }}>
      <h2 className="todo-title">📝 Criar conta</h2>
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
          Cadastrar
        </button>
      </div>
      <p style={{ textAlign: 'center', color: '#555' }}>
        Já tem conta?{' '}
        <button
          onClick={onSwitchToLogin}
          className="btn btn-gray"
          style={{ padding: '4px 10px', fontSize: '0.85rem' }}
        >
          Entrar
        </button>
      </p>
    </div>
  );
}