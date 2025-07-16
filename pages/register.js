import { useState } from 'react';
import axios from '../utils/api';
import { useRouter } from 'next/router';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  async function handleRegister(e) {
    e.preventDefault();
    try {
      const res = await axios.post('/auth/register', { email, password });
      localStorage.setItem('token', res.data.token);
      router.push('/movies');
    } catch (err) {
      alert('Ошибка регистрации');
    }
  }

  return (
    <div className="auth-container">
      <h1>Регистрация в DAYDREAM</h1>
      <form onSubmit={handleRegister}>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input type="password" placeholder="Пароль" value={password} onChange={e => setPassword(e.target.value)} required />
        <button type="submit">Зарегистрироваться</button>
      </form>
      <p>Есть аккаунт? <a href="/login">Войти</a></p>
    </div>
  );
}
