import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import styles from './Services.module.css'; // Importamos los estilos

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('price', { ascending: true }); // Ordenar por precio

      if (error) throw error;
      setServices(data || []);
    } catch (error) {
      console.error('Error cargando servicios:', error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem', color: '#fff' }}>
        <h2>Cargando menú de servicios...</h2>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Nuestros Servicios</h1>
        <p className={styles.subtitle}>
          Experiencias diseñadas para caballeros que valoran la excelencia.
        </p>
      </div>

      <div className={styles.grid}>
        {services.map((service) => (
          <div key={service.id} className={styles.card}>
            <div className={styles.cardHeader}>
              <h3 className={styles.serviceName}>{service.name}</h3>
              <span className={styles.duration}>⏱ {service.duration_minutes} min</span>
            </div>
            
            <p className={styles.description}>
              {service.description || "Disfruta de un servicio de alta calidad realizado por nuestros expertos."}
            </p>

            <div className={styles.footer}>
              <span className={styles.price}>
                ${service.price.toLocaleString()}
              </span>
              <Link to="/" className={styles.bookBtn}>
                Reservar
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;