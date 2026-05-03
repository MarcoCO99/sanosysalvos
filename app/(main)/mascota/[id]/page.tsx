import React from 'react';
import Link from 'next/link';

// 1. Agregamos URLs de fotos de prueba a nuestra base de datos falsa
const mockMascotas = [
  { 
    id: '1', 
    nombre: 'Firulais', 
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
    nombre: 'Vaca', 
    tipo: 'Gato', 
    estado: 'Perdido', 
    ubicacion: 'La Florida',
    foto: 'https://images.unsplash.com/photo-1495360010541-f48722b34f7d?auto=format&fit=crop&w=800&q=80' 
  }
];

export default async function MascotaDetallePage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const resolvedParams = await params;
  const mascotaId = resolvedParams.id;

  const mascota = mockMascotas.find(m => m.id === mascotaId);

  if (!mascota) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Mascota no encontrada</h2>
        <p className="text-slate-500 mb-6">No pudimos encontrar los datos de este caso.</p>
        <Link href="/" className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
          Volver al inicio
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* 2. Rediseñamos el contenedor principal para que la imagen quede arriba */}
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md overflow-hidden border border-slate-100">
        
        {/* Sección de la Imagen */}
        <div className="w-full h-80 sm:h-96 relative bg-slate-200">
          {/* Usamos object-cover para que la imagen llene el espacio sin deformarse */}
          <img 
            src={mascota.foto} 
            alt={`Fotografía de ${mascota.nombre}`} 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Sección de los Detalles */}
        <div className="p-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-4xl font-bold text-slate-900 mb-2">{mascota.nombre}</h1>
              <p className="text-slate-500 font-medium">ID del caso: #{mascota.id}</p>
            </div>
            <span className={`px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wide shadow-sm ${
              mascota.estado === 'Perdido' ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'
            }`}>
              {mascota.estado}
            </span>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 bg-slate-50 p-6 rounded-xl border border-slate-100">
            <div>
              <p className="text-sm text-slate-500 uppercase font-semibold mb-1">Especie</p>
              <p className="text-lg text-slate-800">{mascota.tipo}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500 uppercase font-semibold mb-1">Última Ubicación</p>
              <p className="text-lg text-slate-800">{mascota.ubicacion}</p>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100 flex justify-between items-center">
            <Link href="/" className="inline-flex items-center text-indigo-600 font-medium hover:text-indigo-800 transition-colors">
              <span className="mr-2">←</span> Volver a la búsqueda
            </Link>
            
            {/* Botón de acción simulado */}
            <button className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors shadow-sm">
              Contactar al dueño
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}