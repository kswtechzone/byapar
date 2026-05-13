import { services } from '@/data/mockData';
import styles from './services.module.css';
import Link from 'next/link';

export default function ServicesPage() {
  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <div className="container">
          <h1 className="heading-gradient">Our Services</h1>
          <p className={styles.subtitle}>Handpicked premium beauty treatments just for you.</p>
        </div>
      </header>

      <section className={styles.servicesGrid}>
        <div className="container">
          <div className={styles.grid}>
            {services.map((service) => (
              <div key={service.id} className={`${styles.serviceCard} glass`}>
                <div className={styles.imageWrapper}>
                  <img src={service.image} alt={service.name} className={styles.image} />
                  <span className={styles.category}>{service.category}</span>
                </div>
                <div className={styles.content}>
                  <h3>{service.name}</h3>
                  <p>{service.description}</p>
                  <div className={styles.footer}>
                    <div className={styles.info}>
                      <span className={styles.price}>${service.price}</span>
                      <span className={styles.duration}>{service.duration}</span>
                    </div>
                    <Link href={`/book/${service.id}`} className={styles.bookBtn}>
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
