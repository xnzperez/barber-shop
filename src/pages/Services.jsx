import React from "react";
import { Link } from "react-router-dom";
import useSWR from "swr";
import { supabase } from "../supabaseClient";
import styles from "./Services.module.css"; // Importamos los estilos

// Fetcher for SWR
const fetchServices = async () => {
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .order("price", { ascending: true }); // Ordenar por precio

  if (error) throw error;
  return data || [];
};

const Services = () => {
  // Verel best practice: client-swr-dedup
  const {
    data: services,
    error,
    isLoading,
  } = useSWR("services", fetchServices, {
    revalidateOnFocus: false, // Prevents aggressive re-fetching on tab switch
    dedupingInterval: 60000, // Cache for 60 seconds
  });

  if (error) {
    return (
      <div style={{ textAlign: "center", padding: "4rem", color: "#fff" }}>
        <h2>Hubo un error al cargar los servicios.</h2>
        <p>{error.message}</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div style={{ textAlign: "center", padding: "4rem", color: "#fff" }}>
        <h2>Cargando menú de servicios...</h2>
      </div>
    );
  }

  // Ensure services is an array before mapping
  const serviceList = services || [];

  return (
    <div className={`${styles.container} animate-reveal`}>
      <div className={`${styles.header} animate-reveal delay-1`}>
        <h1 className={styles.title}>Nuestros Servicios</h1>
        <p className={styles.subtitle}>
          Ofrecemos una atención personalizada y de la más alta calidad para
          asegurar que cada cliente consiga el estilo perfecto.
        </p>
      </div>

      <div className={styles.grid}>
        {serviceList.map((service, index) => {
          // Calculate a cyclic delay (delay-1 to delay-5)
          const delayClass = `delay-${(index % 5) + 1}`;

          return (
            <div
              key={service.id}
              className={`${styles.card} animate-reveal ${delayClass}`}
            >
              <div className={styles.cardHeader}>
                <h3 className={styles.serviceName}>{service.name}</h3>
                <span className={styles.duration}>
                  ⏱ {service.duration_minutes} min
                </span>
              </div>

              <p className={styles.description}>
                {service.description ||
                  "Disfruta de un servicio de alta calidad realizado por nuestros expertos."}
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
          );
        })}
      </div>
    </div>
  );
};

export default Services;
