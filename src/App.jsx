import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { supabase } from './supabaseClient';
import { ThemeProvider } from './contexts/ThemeContext';
import Booking from './pages/Booking'; // <--- 1. IMPORTAR
import MyAppointments from './pages/MyAppointments'; // <--- 1. IMPORTAR

// Estilos Globales (Variables y Reset)
import './App.css';

// Componentes
import Navbar from './components/Navbar';

// Páginas
import Home from './pages/Home';
import Login from './pages/Login';
import Services from './pages/Services';
import Register from './pages/Register'; // Asumiendo que tienes este archivo del paso anterior

export default function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Verificar sesión activa al iniciar
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // 2. Escuchar cambios en la autenticación (Login/Logout)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return <div style={{ color: '#fff', textAlign: 'center', marginTop: '20%' }}>Cargando aplicación...</div>;
  }

  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="app-container">
          {/* Pasamos la sesión al Navbar para mostrar "Cerrar Sesión" o "Login" */}
          <Navbar session={session} />
          
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
              element={session ? <Booking session={session} /> : <Navigate to="/login" />} 
            />

            <Route 
              path="/my-appointments" 
              element={session ? <MyAppointments session={session} /> : <Navigate to="/login" />} 
            />

            {/* Ruta para manejar errores 404 (Opcional: redirigir al home) */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}