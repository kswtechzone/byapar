import { Suspense } from 'react';
import LoginForm from './LoginForm';
import styles from '../auth.module.css';

export default function LoginPage() {
  return (
    <main className={styles.main}>
      <Suspense fallback={<div className={`${styles.authCard} glass`}>Loading...</div>}>
        <LoginForm />
      </Suspense>
    </main>
  );
}
