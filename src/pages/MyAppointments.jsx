import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { Link } from 'react-router-dom';
import styles from './MyAppointments.module.css';

export default function MyAppointments({ session }) {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session) {
      fetchAppointments();
    }
  }, [session]);

  const fetchAppointments = async () => {
    try {
      // Buscamos citas donde el client_name coincida con el email del usuario
      // (Ya que así lo guardamos en Booking.jsx temporalmente)
      const { data, error } = await supabase
        .from('appointments')
        .select(`
          *,
          services ( name, price ),
          barbers ( name )
        `)
        .eq('client_name', session.user.email) // FILTRO CLAVE
        .order('appointment_time', { ascending: true });

      if (error) throw error;
      setAppointments(data || []);
    } catch (error) {
      console.error('Error cargando citas:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
  };

  if (loading) return <div style={{color:'white', textAlign:'center', marginTop:'50px'}}>Cargando tus citas...</div>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Mis Citas</h1>
          <p className={styles.subtitle}>Gestiona tus próximas visitas.</p>
        </div>
        <Link to="/book-appointment" className={styles.newBtn} style={{fontSize: '0.9rem'}}>
          + Nueva Cita
        </Link>
      </div>

      {appointments.length === 0 ? (
        <div className={styles.emptyState}>
          <h2>No tienes citas programadas</h2>
          <p style={{color:'#aaa', margin:'1rem 0'}}>¿Listo para un cambio de look?</p>
          <Link to="/book-appointment" className={styles.newBtn}>
            Reservar Ahora
          </Link>
        </div>
      ) : (
        <div className={styles.grid}>
          {appointments.map((cita) => (
            <div key={cita.id} className={styles.card}>
              {/* Badge de estado (Simulado por ahora) */}
              <span className={styles.statusBadge}>
                Confirmada
              </span>

              <div className={styles.dateBox}>
                <span className={styles.dateIcon}>📅</span>
                <div>
                  <div className={styles.dateText}>
                    {formatDate(cita.appointment_time)}
                  </div>
                  <div className={styles.timeText}>
                    {formatTime(cita.appointment_time)}
                  </div>
                </div>
              </div>

              <div className={styles.details}>
                <div className={styles.detailRow}>
                  <span className={styles.label}>Servicio:</span>
                  <span className={styles.value}>{cita.services?.name}</span>
                </div>
                <div className={styles.detailRow}>
                  <span className={styles.label}>Barbero:</span>
                  <span className={styles.value}>{cita.barbers?.name}</span>
                </div>
                <div className={styles.detailRow}>
                  <span className={styles.label}>Precio:</span>
                  <span className={styles.value}>${cita.services?.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}