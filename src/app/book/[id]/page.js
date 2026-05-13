'use client';

import { useState, use } from 'react';
import { services, beauticians } from '@/data/mockData';
import styles from './booking.module.css';
import Link from 'next/link';

export default function BookingPage({ params }) {
  const resolvedParams = use(params);
  const serviceId = parseInt(resolvedParams.id);
  const service = services.find(s => s.id === serviceId);

  const [step, setStep] = useState(1);
  const [selectedBeautician, setSelectedBeautician] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  if (!service) {
    return (
      <main className={styles.main}>
        <div className="container">
          <h1>Service not found</h1>
          <Link href="/services">Back to services</Link>
        </div>
      </main>
    );
  }

  const handleNext = () => setStep(prev => prev + 1);
  const handleBack = () => setStep(prev => prev - 1);

  const times = ['09:00 AM', '10:00 AM', '11:00 AM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'];

  return (
    <main className={styles.main}>
      <div className="container">
        <div className={styles.bookingContainer}>
          <div className={styles.progress}>
            <div className={`${styles.step} ${step >= 1 ? styles.active : ''}`}>1. Professional</div>
            <div className={`${styles.step} ${step >= 2 ? styles.active : ''}`}>2. Schedule</div>
            <div className={`${styles.step} ${step >= 3 ? styles.active : ''}`}>3. Confirm</div>
          </div>

          <div className={`${styles.content} glass`}>
            {step === 1 && (
              <div className={styles.stepContent}>
                <h2>Select your Beautician</h2>
                <div className={styles.beauticianGrid}>
                  {beauticians.filter(b => b.specialty === service.category || b.specialty === 'General').map(b => (
                    <div 
                      key={b.id} 
                      className={`${styles.beauticianCard} ${selectedBeautician?.id === b.id ? styles.selected : ''}`}
                      onClick={() => setSelectedBeautician(b)}
                    >
                      <img src={b.image} alt={b.name} />
                      <div className={styles.bInfo}>
                        <h4>{b.name}</h4>
                        <span>{b.role}</span>
                        <div className={styles.rating}>⭐ {b.rating}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className={styles.actions}>
                  <Link href="/services" className={styles.backBtn}>Cancel</Link>
                  <button 
                    disabled={!selectedBeautician} 
                    onClick={handleNext}
                    className={styles.nextBtn}
                  >
                    Next Step
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className={styles.stepContent}>
                <h2>Choose Date & Time</h2>
                <div className={styles.dateTimeGrid}>
                  <div className={styles.datePicker}>
                    <label>Select Date</label>
                    <input 
                      type="date" 
                      value={selectedDate} 
                      onChange={(e) => setSelectedDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  <div className={styles.timePicker}>
                    <label>Select Time</label>
                    <div className={styles.timeGrid}>
                      {times.map(t => (
                        <button 
                          key={t} 
                          className={`${styles.timeBtn} ${selectedTime === t ? styles.selected : ''}`}
                          onClick={() => setSelectedTime(t)}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className={styles.actions}>
                  <button onClick={handleBack} className={styles.backBtn}>Back</button>
                  <button 
                    disabled={!selectedDate || !selectedTime} 
                    onClick={handleNext}
                    className={styles.nextBtn}
                  >
                    Next Step
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className={styles.stepContent}>
                <h2>Confirm Appointment</h2>
                <div className={styles.summary}>
                  <div className={styles.summaryItem}>
                    <span>Service:</span>
                    <strong>{service.name}</strong>
                  </div>
                  <div className={styles.summaryItem}>
                    <span>Professional:</span>
                    <strong>{selectedBeautician.name}</strong>
                  </div>
                  <div className={styles.summaryItem}>
                    <span>Date:</span>
                    <strong>{selectedDate}</strong>
                  </div>
                  <div className={styles.summaryItem}>
                    <span>Time:</span>
                    <strong>{selectedTime}</strong>
                  </div>
                  <div className={styles.summaryItem}>
                    <span>Total:</span>
                    <strong className={styles.total}>${service.price}</strong>
                  </div>
                </div>
                <div className={styles.actions}>
                  <button onClick={handleBack} className={styles.backBtn}>Back</button>
                  <button 
                    onClick={() => alert('Booking Successful!')}
                    className={styles.nextBtn}
                  >
                    Confirm & Book
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
