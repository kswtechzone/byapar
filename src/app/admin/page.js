import { services, beauticians } from '@/data/mockData';
import styles from './admin.module.css';

export default function AdminDashboard() {
  const stats = [
    { label: 'Total Bookings', value: '124', icon: '📅' },
    { label: 'Revenue', value: '$5,240', icon: '💰' },
    { label: 'Active Staff', value: beauticians.length, icon: '👥' },
    { label: 'Services', value: services.length, icon: '✨' },
  ];

  return (
    <main className={styles.main}>
      <div className="container">
        <header className={styles.header}>
          <h1 className="heading-gradient">Admin Dashboard</h1>
          <p>Manage your salon operations and staff.</p>
        </header>

        <section className={styles.statsGrid}>
          {stats.map((stat, i) => (
            <div key={i} className={`${styles.statCard} glass`}>
              <span className={styles.statIcon}>{stat.icon}</span>
              <div className={styles.statInfo}>
                <h3>{stat.value}</h3>
                <p>{stat.label}</p>
              </div>
            </div>
          ))}
        </section>

        <section className={styles.managementSection}>
          <div className={styles.tabs}>
            <button className={styles.tabActive}>Services</button>
            <button className={styles.tab}>Beauticians</button>
            <button className={styles.tab}>Bookings</button>
          </div>

          <div className={`${styles.tableWrapper} glass`}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Service Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Duration</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {services.map(s => (
                  <tr key={s.id}>
                    <td><strong>{s.name}</strong></td>
                    <td>{s.category}</td>
                    <td>${s.price}</td>
                    <td>{s.duration}</td>
                    <td>
                      <button className={styles.editBtn}>Edit</button>
                      <button className={styles.deleteBtn}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
