import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroContent}>
            <h1 className="heading-gradient">Byapar</h1>
            <p className={styles.tagline}>Elevate Your Beauty Experience</p>
            <p className={styles.description}>
              Seamless booking for premium salon services. Experience luxury, redefined.
            </p>
            <div className={styles.actions}>
              <button className={`${styles.btn} ${styles.btnPrimary}`}>
                Book Appointment
              </button>
              <button className={`${styles.btn} ${styles.btnSecondary}`}>
                Explore Services
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.features}>
        <div className="container">
          <div className={styles.grid}>
            <div className={`${styles.card} glass`}>
              <h3>Expert Beauticians</h3>
              <p>Work with the best in the industry, handpicked for you.</p>
            </div>
            <div className={`${styles.card} glass`}>
              <h3>Easy Scheduling</h3>
              <p>Book your favorite slot in seconds, anytime, anywhere.</p>
            </div>
            <div className={`${styles.card} glass`}>
              <h3>Premium Care</h3>
              <p>Top-tier services using only the finest products.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
