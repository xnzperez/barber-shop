import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate, Link } from 'react-router-dom';
import styles from './Login.module.css'; // Importamos su módulo CSS

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      alert(error.message);
    } else {
      navigate('/');
    }
    setLoading(false);
  };

  return (
    <div className={styles.splitContainer}>
      {/* Lado Izquierdo: Imagen */}
      <div className={styles.imageSide}></div>
      
      {/* Lado Derecho: Formulario */}
      <div className={styles.formSide}>
        <div className={styles.authCard}>
          <h2 className={styles.title}>Bienvenido</h2>
          <p className={styles.subtitle}>Inicia sesión para gestionar tus citas.</p>
          
          <form onSubmit={handleLogin}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Correo Electrónico</label>
              <input 
                type="email" 
                placeholder="ejemplo@correo.com" 
                className={styles.input}
                value={email}
                onChange={e => setEmail(e.target.value)} 
                required 
              />
            </div>
            
            <div className={styles.formGroup}>
              <label className={styles.label}>Contraseña</label>
              <input 
                type="password" 
                placeholder="••••••••" 
                className={styles.input}
                value={password}
                onChange={e => setPassword(e.target.value)} 
                required 
              />
            </div>
            
            <button disabled={loading} className={styles.submitBtn}>
              {loading ? 'Cargando...' : 'Iniciar Sesión'}
            </button>
          </form>

          <p className={styles.linkText}>
            ¿No tienes cuenta? <Link to="/register" className={styles.link}>Regístrate aquí</Link>
          </p>
        </div>
      </div>
    </div>
  );
}