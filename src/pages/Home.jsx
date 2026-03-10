import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import styles from "./Home.module.css"; // <--- OJO: Asegúrate de que tu archivo CSS se llame Home.module.css

const Home = () => {
  const { isDarkMode } = useTheme();

  return (
    <div className={styles.homeContainer}>
      {/* --- VINTAGE EDITORIAL HERO SECTION --- */}
      <section className={`${styles.heroSection} animate-reveal`}>
        <div className={styles.heroText}>
          <h1 className={`${styles.heroTitle} animate-reveal delay-1`}>
            Tu <em>Estilo</em>,<br />
            Nuestra <em>Pasión.</em>
          </h1>
          <p className={`${styles.heroSubtitle} animate-reveal delay-2`}>
            Reserva tu cita fácilmente y disfruta de una experiencia de barbería
            de primera calidad. Expertos en cortes clásicos y modernos.
          </p>

          <div className={`${styles.heroActions} animate-reveal delay-3`}>
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

        <div className={`${styles.heroImageContainer} animate-reveal delay-2`}>
          <img
            src="https://images.unsplash.com/photo-1599351431202-1e0f0137899a?q=80&w=1988&auto=format&fit=crop"
            alt="Barbería Clásica Premium"
            className={styles.heroImage}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://placehold.co/600x600/1e1e1e/D4AF37?text=BarberShop";
            }}
          />
        </div>
      </section>

      {/* --- SECCIÓN CARACTERÍSTICAS --- */}
      <section
        className={`${styles.whyChooseUsSection} animate-reveal delay-3`}
      >
        <h2 className={`${styles.sectionTitle} animate-reveal delay-4`}>
          ¿Por Qué <em>Elegirnos?</em>
        </h2>

        <div className={styles.featuresGrid}>
          <div className={`${styles.featureCard} animate-reveal delay-2`}>
            <div className={styles.featureIcon}>✂️</div>
            <h3>Expertos Calificados</h3>
            <p>
              Barberos con experiencia y pasión por el detalle para asegurar el
              corte perfecto.
            </p>
          </div>

          <div className={`${styles.featureCard} animate-reveal delay-3`}>
            <div className={styles.featureIcon}>📅</div>
            <h3>Reservas Fáciles</h3>
            <p>
              Agenda tu cita online en cualquier momento y desde cualquier lugar
              de forma rápida.
            </p>
          </div>

          <div className={`${styles.featureCard} animate-reveal delay-4`}>
            <div className={styles.featureIcon}>✨</div>
            <h3>Ambiente Premium</h3>
            <p>
              Disfruta de un ambiente relajado y un servicio al cliente
              excepcional.
            </p>
          </div>
        </div>
      </section>

      <div className={styles.themeInfo}>
        <p>Modo actual: {isDarkMode ? "Oscuro 🌙" : "Claro ☀️"}</p>
      </div>
    </div>
  );
};

export default Home;
