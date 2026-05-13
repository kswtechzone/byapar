import styles from './staff.module.css';

export default function StaffDashboard() {
  const bookings = [
    { id: 101, customer: 'John Doe', service: 'Hair Styling', time: '09:00 AM', status: 'Pending' },
    { id: 102, customer: 'Jane Smith', service: 'Luxury Facial', time: '11:00 AM', status: 'In Progress' },
    { id: 103, customer: 'Mike Ross', service: 'Manicure', time: '02:00 PM', status: 'Completed' },
  ];

  return (
    <main className={styles.main}>
      <div className="container">
        <header className={styles.header}>
          <h1 className="heading-gradient">Staff Panel</h1>
          <p>Welcome back! Here is your schedule for today.</p>
        </header>

        <section className={styles.scheduleSection}>
          <div className={styles.grid}>
            {bookings.map(booking => (
              <div key={booking.id} className={`${styles.bookingCard} glass`}>
                <div className={styles.bHeader}>
                  <span className={styles.time}>{booking.time}</span>
                  <span className={`${styles.status} ${styles[booking.status.replace(' ', '').toLowerCase()]}`}>
                    {booking.status}
                  </span>
                </div>
                <div className={styles.bBody}>
                  <h3>{booking.service}</h3>
                  <p>Customer: <strong>{booking.customer}</strong></p>
                </div>
                <div className={styles.bFooter}>
                  {booking.status !== 'Completed' && (
                    <button className={styles.completeBtn}>Mark Completed</button>
                  )}
                  <button className={styles.detailBtn}>View Details</button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
