'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import styles from '../auth.module.css';
import Link from 'next/link';

export default function LoginForm() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();

  useEffect(() => {
    const msg = searchParams.get('message');
    if (msg) setMessage(msg);
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Invalid credentials');
      }

      // Persist session
      login(data.user);

      // Redirect based on role
      const { role } = data.user;
      if (role === 'ADMIN') router.push('/admin');
      else if (role === 'BEAUTICIAN') router.push('/staff');
      else router.push('/');
      
      // Force refresh to update navbar
      router.refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`${styles.authCard} glass`}>
      <h1 className="heading-gradient">Welcome Back</h1>
      <p className={styles.subtitle}>Login to manage your appointments</p>

      {message && <div className={styles.success}>{message}</div>}
      {error && <div className={styles.error}>{error}</div>}

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <label>Email Address</label>
          <input 
            type="email" 
            placeholder="Enter your email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required 
          />
        </div>
        <div className={styles.inputGroup}>
          <label>Password</label>
          <input 
            type="password" 
            placeholder="Enter your password"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            required 
          />
        </div>
        <button type="submit" className={styles.submitBtn} disabled={loading}>
          {loading ? 'Logging in...' : 'Log In'}
        </button>
      </form>

      <p className={styles.footer}>
        Don't have an account? <Link href="/auth/signup">Sign Up</Link>
      </p>
    </div>
  );
}
