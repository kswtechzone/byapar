'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import styles from './Navbar.module.css';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className={`${styles.navbar} glass`}>
      <div className={`${styles.container} container`}>
        <Link href="/" className={styles.logo}>
          BYAPAR
        </Link>
        <div className={styles.links}>
          <Link href="/services" className={styles.link}>Services</Link>
          {user ? (
            <>
              {user.role === 'ADMIN' && <Link href="/admin" className={styles.link}>Admin</Link>}
              {user.role === 'BEAUTICIAN' && <Link href="/staff" className={styles.link}>Schedule</Link>}
              <button onClick={logout} className={styles.link}>Logout</button>
              <span className={styles.userName}>Hi, {user.name.split(' ')[0]}</span>
            </>
          ) : (
            <>
              <Link href="/auth/login" className={styles.link}>Login</Link>
              <Link href="/auth/signup" className={`${styles.btn} ${styles.btnPrimary}`}>
                Join Now
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
