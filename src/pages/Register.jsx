import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate, Link } from 'react-router-dom';
import styles from './Register.module.css'; // Importamos sus estilos

export default function Register() {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Crear usuario en Auth de Supabase
// DESPUÉS
const { error: authError } = await supabase.auth.signUp({        email: formData.email,
        password: formData.password,
        options: {
          // Guardamos datos extra en la metadata del usuario
          data: {
            full_name: formData.fullName,
            phone: formData.phone
          }
        }
      });

      if (authError) throw authError;

      // Opcional: Aquí podrías insertar en tu tabla 'clients' si la creaste
      // await supabase.from('clients').insert([{ id: authData.user.id, ... }])

      alert('Registro exitoso. ¡Bienvenido!');
      navigate('/'); // Redirigir al Home
      
    } catch (error) {
      alert('Error al registrarse: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.splitContainer}>
      <div className={styles.imageSide}></div>
      
      <div className={styles.formSide}>
        <div className={styles.authCard}>
          <h2 className={styles.title}>Crear Cuenta</h2>
          <p className={styles.subtitle}>Únete a BarberShop Deluxe y agenda tu estilo.</p>
          
          <form onSubmit={handleRegister}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Nombre Completo</label>
              <input 
                name="fullName"
                type="text" 
                placeholder="Juan Pérez" 
                className={styles.input}
                onChange={handleChange}
                required 
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Teléfono</label>
              <input 
                name="phone"
                type="tel" 
                placeholder="300 123 4567" 
                className={styles.input}
                onChange={handleChange}
                required 
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Correo Electrónico</label>
              <input 
                name="email"
                type="email" 
                placeholder="ejemplo@correo.com" 
                className={styles.input}
                onChange={handleChange}
                required 
              />
            </div>
            
            <div className={styles.formGroup}>
              <label className={styles.label}>Contraseña</label>
              <input 
                name="password"
                type="password" 
                placeholder="Mínimo 6 caracteres" 
                className={styles.input}
                onChange={handleChange}
                required 
                minLength={6}
              />
            </div>
            
            <button disabled={loading} className={styles.submitBtn}>
              {loading ? 'Registrando...' : 'Registrarse'}
            </button>
          </form>

          <p className={styles.linkText}>
            ¿Ya tienes cuenta? <Link to="/login" className={styles.link}>Inicia Sesión aquí</Link>
          </p>
        </div>
      </div>
    </div>
  );
}