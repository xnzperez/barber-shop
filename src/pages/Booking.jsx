import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';
import styles from './Booking.module.css';

export default function Booking({ session }) {
  const navigate = useNavigate();
  
  // Estados
  const [services, setServices] = useState([]);
  const [barbers, setBarbers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // Formulario
  const [form, setForm] = useState({
    service: '',
    barber: '',
    date: ''
  });

  // 1. Cargar datos al abrir la página
  useEffect(() => {
    if (!session) {
      // Si no hay sesión, mandar al login
      navigate('/login');
      return;
    }
    fetchData();
  }, [session, navigate]);

  const fetchData = async () => {
    try {
      const { data: s } = await supabase.from('services').select('*');
      const { data: b } = await supabase.from('barbers').select('*');
      setServices(s || []);
      setBarbers(b || []);
    } catch (error) {
      console.error('Error cargando datos', error);
    } finally {
      setLoading(false);
    }
  };

  // 2. Manejar el envío
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const { error } = await supabase.from('appointments').insert([
        {
          service_id: form.service,
          barber_id: form.barber,
          appointment_time: form.date,
          client_name: session.user.email, // Usamos email temporalmente
          client_phone: session.user.user_metadata?.phone || 'Sin teléfono' // Intentamos sacar el teléfono del registro
        }
      ]);

      if (error) throw error;
      
      setSuccess(true); // Mostrar pantalla de éxito

    } catch (error) {
      alert('Error al reservar: ' + error.message);
    } finally {
      setSubmitting(false);
    }
  };

  // Renderizado de Carga
  if (loading) return <div style={{color:'white', textAlign:'center', padding:'50px'}}>Cargando agenda...</div>;

  // Renderizado de Éxito
  if (success) {
    return (
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.successMessage}>
            <span className={styles.successIcon}>✅</span>
            <h2 className={styles.title}>¡Reserva Confirmada!</h2>
            <p className={styles.subtitle}>Te esperamos en BarberShop Deluxe.</p>
            <button onClick={() => navigate('/')} className={styles.submitBtn}>
              Volver al Inicio
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Renderizado del Formulario
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Agendar Cita</h1>
        <p className={styles.subtitle}>Selecciona tu estilo y el experto de tu preferencia.</p>

        <form onSubmit={handleSubmit}>
          {/* Servicio */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Servicio</label>
            <select 
              className={styles.select}
              value={form.service}
              onChange={e => setForm({...form, service: e.target.value})}
              required
            >
              <option value="">Seleccionar servicio...</option>
              {services.map(s => (
                <option key={s.id} value={s.id}>{s.name} - ${s.price}</option>
              ))}
            </select>
          </div>

          {/* Barbero */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Barbero</label>
            <select 
              className={styles.select}
              value={form.barber}
              onChange={e => setForm({...form, barber: e.target.value})}
              required
            >
              <option value="">Seleccionar barbero...</option>
              {barbers.map(b => (
                <option key={b.id} value={b.id}>{b.name}</option>
              ))}
            </select>
          </div>

          {/* Fecha */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Fecha y Hora</label>
            <input 
              type="datetime-local" 
              className={styles.input}
              value={form.date}
              onChange={e => setForm({...form, date: e.target.value})}
              required
            />
          </div>

          <button disabled={submitting} className={styles.submitBtn}>
            {submitting ? 'Confirmando...' : 'Confirmar Reserva'}
          </button>
        </form>
      </div>
    </div>
  );
}