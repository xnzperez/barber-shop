import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { useTheme } from '../contexts/ThemeContext';
import styles from './Navbar.module.css'; // Importamos su módulo CSS

export default function Navbar({ session }) {
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useTheme();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <nav className={styles.nav}>
      {/* El Logo ahora puede ser un Link al inicio */}
      <Link to="/" className={styles.logo}>
        BarberShop Deluxe
      </Link>
      
      <div className={styles.navLinks}>
        <Link to="/" className={styles.link}>Inicio</Link>
        
        {/* Enlaces condicionales */}
        {!session ? (
          <>
            <Link to="/login" className={styles.link}>Login</Link>
            <Link to="/register" className={styles.link}>Registro</Link>

          </>
        ) : (
          <>
            <Link to="/my-appointments" className={styles.link}>Mis Citas</Link>
            <button onClick={handleLogout} className={styles.logoutBtn}>
              Cerrar Sesión
            </button>
          </>
        )}
        
        {/* Botón de Tema */}
        <button 
          onClick={toggleTheme} 
          className={styles.themeBtn}
          title="Cambiar Tema"
        >
          {isDarkMode ? '☀️' : '🌙'}
        </button>
      </div>
    </nav>
  );
}