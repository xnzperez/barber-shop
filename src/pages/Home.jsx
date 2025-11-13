import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext'; 
import styles from './Home.module.css'; // <--- OJO: Asegúrate de que tu archivo CSS se llame Home.module.css

const Home = () => {
  const { isDarkMode } = useTheme(); 

  return (
    <div className={styles.homeContainer}>
      
      {/* --- SECCIÓN HERO (PRINCIPAL) --- */}
      <section className={styles.heroSection}>
        <div className={styles.heroText}>
          <h1 className={styles.heroTitle}>
            Tu Estilo, <br /> Nuestra Pasión.
          </h1>
          <p className={styles.heroSubtitle}>
            Reserva tu cita fácilmente y disfruta de una experiencia de barbería de primera calidad.
            Expertos en cortes clásicos y modernos.
          </p>
          
          <div className={styles.heroActions}>
            <Link
              to="/book-appointment"
              className={`${styles.button} ${styles.buttonPrimary}`}
            >
              Reservar una Cita Ahora
            </Link>
            
            <Link
              to="/services" 
              className={`${styles.button} ${styles.buttonSecondary}`}
            >
              Ver Nuestros Servicios
            </Link>
          </div>
        </div>

        <div className={styles.heroImageContainer}>
          <img 
            src="https://images.unsplash.com/photo-1503951914875-befbb7470d03?q=80&w=2070&auto=format&fit=crop" 
            alt="Silla de Barbería Profesional" 
            className={styles.heroImage}
            onError={(e) => {
              e.target.onerror = null; 
              e.target.src = "https://placehold.co/600x600/1e1e1e/D4AF37?text=BarberShop";
            }}
          />
        </div>
      </section>

      {/* --- SECCIÓN CARACTERÍSTICAS --- */}
      <section className={styles.whyChooseUsSection}>
        <h2 className={styles.sectionTitle}>¿Por Qué Elegirnos?</h2>
        
        <div className={styles.featuresGrid}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>✂️</div>
            <h3>Expertos Calificados</h3>
            <p>Barberos con experiencia y pasión por el detalle para asegurar el corte perfecto.</p>
          </div>
          
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>📅</div>
            <h3>Reservas Fáciles</h3>
            <p>Agenda tu cita online en cualquier momento y desde cualquier lugar de forma rápida.</p>
          </div>
          
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>✨</div>
            <h3>Ambiente Premium</h3>
            <p>Disfruta de un ambiente relajado y un servicio al cliente excepcional.</p>
          </div>
        </div>
      </section>
      
      <div className={styles.themeInfo}>
        <p>Modo actual: {isDarkMode ? 'Oscuro 🌙' : 'Claro ☀️'}</p>
      </div>
    </div>
  );
};

export default Home;