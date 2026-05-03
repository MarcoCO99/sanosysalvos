"use client"; // Usamos esto para que los filtros funcionen en tiempo real

import React, { useState } from 'react';
import Link from 'next/link';

// 1. Mantenemos la misma fuente de datos para total consistencia
const mockMascotas = [
  { 
    id: '1', 
    nombre: 'Max', 
    tipo: 'Perro', 
    estado: 'Perdido', 
    ubicacion: 'Santiago Centro',
    foto: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=800&q=80' 
  },
  { 
    id: '2', 
    nombre: 'Luna', 
    tipo: 'Gato', 
    estado: 'Encontrado', 
    ubicacion: 'Providencia',
    foto: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=800&q=80' 
  },
  { 
    id: '3', 
    nombre: 'Rocky', 
    tipo: 'Perro', 
    estado: 'Perdido', 
    ubicacion: 'Maipú',
    foto: 'https://images.unsplash.com/photo-1537151608804-ea2f1fa73a74?auto=format&fit=crop&w=800&q=80' 
  },
  { 
    id: '4', 
    nombre: 'Milo', 
    tipo: 'Gato', 
    estado: 'Perdido', 
    ubicacion: 'La Florida',
    foto: 'https://images.unsplash.com/photo-1495360010541-f48722b34f7d?auto=format&fit=crop&w=800&q=80' 
  }
];

export default function ExplorarPage() {
  // Estados para filtrar la lista
  const [filtroTipo, setFiltroTipo] = useState('Todos');
  const [filtroEstado, setFiltroEstado] = useState('Todos');

  // Lógica de filtrado
  const mascotasFiltradas = mockMascotas.filter(mascota => {
    const coincideTipo = filtroTipo === 'Todos' || mascota.tipo === filtroTipo;
    const coincideEstado = filtroEstado === 'Todos' || mascota.estado === filtroEstado;
    return coincideTipo && coincideEstado;
  });

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col">
      
      {/* --- NAVEGACIÓN (HEADER) - Igual que el Home --- */}
      <header className="bg-white border-b sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-indigo-600 flex items-center gap-2">
            Sanos y Salvos
          </Link>
          <div className="flex gap-4">
            <Link href="/" className="text-slate-600 font-medium hover:text-indigo-600 px-3 py-2 transition-colors">
              Inicio
            </Link>
            <Link href="/reportar" className="bg-indigo-600 text-white font-medium px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors shadow-sm">
              Reportar Mascota
            </Link>
            <Link href="/perfil" className="text-slate-600 font-medium hover:text-indigo-600 px-3 py-2 transition-colors flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Mi Perfil
            </Link>
          </div>
        </nav>
      </header>

      {/* --- SECCIÓN DE FILTROS --- */}
      <section className="bg-white border-b py-8">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-slate-900 mb-6">Explorar Reportes</h1>
          
          <div className="flex flex-wrap gap-6">
            {/* Filtro por Tipo */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-slate-500 uppercase">¿Qué buscas?</label>
              <div className="flex gap-2">
                {['Todos', 'Perro', 'Gato'].map((tipo) => (
                  <button
                    key={tipo}
                    onClick={() => setFiltroTipo(tipo)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      filtroTipo === tipo 
                        ? 'bg-indigo-600 text-white shadow-md' 
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {tipo}
                  </button>
                ))}
              </div>
            </div>

            {/* Filtro por Estado */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-slate-500 uppercase">Estado</label>
              <div className="flex gap-2">
                {['Todos', 'Perdido', 'Encontrado'].map((estado) => (
                  <button
                    key={estado}
                    onClick={() => setFiltroEstado(estado)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      filtroEstado === estado 
                        ? 'bg-indigo-600 text-white shadow-md' 
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {estado}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- GRILLA DE RESULTADOS --- */}
      <section className="max-w-7xl mx-auto px-4 py-12 w-full flex-grow">
        <div className="flex justify-between items-center mb-8">
          <p className="text-slate-500 font-medium">
            Se encontraron <span className="text-indigo-600 font-bold">{mascotasFiltradas.length}</span> mascotas
          </p>
        </div>

        {/* Si no hay resultados */}
        {mascotasFiltradas.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-slate-200">
            <p className="text-slate-400 text-lg">No se encontraron mascotas con esos filtros.</p>
            <button 
              onClick={() => { setFiltroTipo('Todos'); setFiltroEstado('Todos'); }}
              className="mt-4 text-indigo-600 font-bold hover:underline"
            >
              Limpiar filtros
            </button>
          </div>
        ) : (
          /* Reutilizamos el diseño de las tarjetas del Home para total consistencia */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {mascotasFiltradas.map((mascota) => (
              <Link 
                key={mascota.id} 
                href={`/mascota/${mascota.id}`}
                className="group bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-all duration-200 flex flex-col"
              >
                <div className="relative h-52 w-full bg-slate-200 overflow-hidden">
                  <img 
                    src={mascota.foto} 
                    alt={mascota.nombre}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm ${
                    mascota.estado === 'Perdido' ? 'bg-red-500/90 text-white' : 'bg-emerald-500/90 text-white'
                  }`}>
                    {mascota.estado}
                  </div>
                </div>

                <div className="p-5 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-slate-800">{mascota.nombre}</h3>
                    <span className="text-xs text-slate-400 font-medium px-2 py-1 bg-slate-100 rounded-md">
                      {mascota.tipo}
                    </span>
                  </div>
                  <p className="text-slate-500 text-sm flex items-center mt-1">
                    <span className="mr-1">📍</span> {mascota.ubicacion}
                  </p>
                  <div className="mt-auto pt-4 border-t border-slate-100 flex justify-between items-center text-indigo-600 font-semibold text-sm group-hover:text-indigo-700">
                    Ver detalle
                    <span>→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      <footer className="bg-slate-900 text-slate-400 py-8 text-center text-sm mt-auto">
        <p>© {new Date().getFullYear()} Sanos y Salvos. Todos los derechos reservados.</p>
      </footer>
    </main>
  );
}