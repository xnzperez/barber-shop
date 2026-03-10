import React, { useState, useEffect, Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { supabase } from "./supabaseClient";
import { ThemeProvider } from "./contexts/ThemeContext";

// Estilos Globales (Variables y Reset)
import "./App.css";

// Componentes
import Navbar from "./components/Navbar";

// Dynamic Imports para Code Splitting (bundle-dynamic-imports)
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Services = lazy(() => import("./pages/Services"));
const Register = lazy(() => import("./pages/Register"));
const Booking = lazy(() => import("./pages/Booking"));
const MyAppointments = lazy(() => import("./pages/MyAppointments"));

export default function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Verificar sesión activa al iniciar
    supabase.auth
      .getSession()
      .then(({ data: { session }, error }) => {
        if (error) console.error("Error Supabase:", error);
        setSession(session);
      })
      .catch((err) => {
        console.error("Error de conexión al verificar sesión:", err);
      })
      .finally(() => {
        setLoading(false);
      });

    // 2. Escuchar cambios en la autenticación (Login/Logout)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div style={{ color: "#fff", textAlign: "center", marginTop: "20%" }}>
        Cargando aplicación...
      </div>
    );
  }

  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="app-container">
          {/* Pasamos la sesión al Navbar para mostrar "Cerrar Sesión" o "Login" */}
          <Navbar session={session} />

          <Suspense
            fallback={
              <div
                style={{
                  color: "#fff",
                  textAlign: "center",
                  marginTop: "20vh",
                  opacity: 0.5,
                }}
              >
                Cargando sección...
              </div>
            }
          >
            <Routes>
              {/* Ruta Principal (Home) */}
              <Route path="/" element={<Home session={session} />} />

              {/* Ruta de Servicios */}
              <Route path="/services" element={<Services />} />

              {/* Rutas de Autenticación */}
              {/* Si ya está logueado, redirigir al Home, si no, mostrar Login */}
              <Route
                path="/login"
                element={!session ? <Login /> : <Navigate to="/" />}
              />

              <Route
                path="/register"
                element={!session ? <Register /> : <Navigate to="/" />}
              />

              {/* Booking */}
              <Route
                path="/book-appointment"
                element={
                  session ? (
                    <Booking session={session} />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />

              <Route
                path="/my-appointments"
                element={
                  session ? (
                    <MyAppointments session={session} />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />

              {/* Ruta para manejar errores 404 (Opcional: redirigir al home) */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </Suspense>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}
