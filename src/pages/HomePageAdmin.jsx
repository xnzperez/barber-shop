// src/pages/HomePageAdmin.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './HomePageAdmin.module.css'; // Importamos tu CSS

const HomePageAdmin = () => {
  return (
    <div className={styles.pageContainer}>
      <header>
        <h1 className={styles.pageTitle}>Panel de Administración</h1>
        <p className={styles.pageSubtitle}>Gestiona tu barbería desde aquí</p>
        <div className={styles.welcomeMessage}>
          👋 Bienvenido, Administrador
        </div>
      </header>

      <nav className={styles.adminNav}>
        <ul className={styles.navList}>
          {/* Opción 1: Gestionar Servicios */}
          <li className={styles.navItem}>
            <Link to="/admin/services" className={styles.navLink}>
              <span className={styles.navIcon}>✂️</span>
              Gestionar Servicios
            </Link>
          </li>

          {/* Opción 2: Gestionar Citas */}
          <li className={styles.navItem}>
            <Link to="/admin/appointments" className={styles.navLink}>
              <span className={styles.navIcon}>📅</span>
              Ver Calendario de Citas
            </Link>
          </li>

          {/* Opción 3: Gestionar Barberos */}
          <li className={styles.navItem}>
            <Link to="/admin/barbers" className={styles.navLink}>
              <span className={styles.navIcon}>💈</span>
              Gestionar Barberos
            </Link>
          </li>

          {/* Opción 4: Reportes */}
          <li className={styles.navItem}>
            <Link to="/admin/reports" className={styles.navLink}>
              <span className={styles.navIcon}>📊</span>
              Reportes Financieros
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default HomePageAdmin;