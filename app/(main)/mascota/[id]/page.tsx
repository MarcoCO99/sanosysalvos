"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Loader2, ArrowLeft, MessageCircle, Calendar, Info, Award } from 'lucide-react';
import { petService, PetResponseDTO } from '@/services/petService';

export default function MascotaDetallePage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const [mascota, setMascota] = useState<PetResponseDTO | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cargarDetalleMascota = async () => {
      try {
      setLoading(true);
      // 1. Resolvemos la promesa de los parámetros de Next.js
      const resolvedParams = await params;
      const id = resolvedParams.id; // 👈 Mantenemos el ID como string (UUID)

      if (!id) {
        setError('El identificador de la mascota no es válido.');
        setLoading(false);
        return;
      }

        const datosMascota = await petService.getPetById(id);
        setMascota(datosMascota);
        setError(null);
      } catch (err) {
        console.error('Error al cargar detalle de mascota:', err);
        setError('No se pudo encontrar el reporte solicitado o el servidor no responde.');
      } finally {
        setLoading(false);
      }
    };

    cargarDetalleMascota();
  }, [params]);

  // 3. VISTA DE CARGA
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 gap-3">
        <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" />
        <p className="text-slate-500 font-medium">Cargando expediente de la mascota...</p>
      </div>
    );
  }

  // 4. VISTA DE ERROR O NO ENCONTRADO
  if (error || !mascota) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-4">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 max-w-md text-center">
          <div className="text-red-500 text-4xl mb-3">⚠️</div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Reporte no disponible</h2>
          <p className="text-slate-500 mb-6">{error || 'El caso que buscas ya no existe o fue retirado.'}</p>
          <Link href="/" className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm inline-block w-full font-medium">
            Volver al Inicio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md overflow-hidden border border-slate-100">
        
        {/* Sección de la Imagen Real */}
        <div className="w-full h-80 sm:h-[450px] relative bg-slate-200">
          <img 
            src={mascota.foto || 'https://images.unsplash.com/photo-1543536448-d209d2d13a1c?auto=format&fit=crop&w=800&q=80'} 
            alt={`Fotografía de ${mascota.nombre}`} 
            className="w-full h-full object-cover"
          />
          {/* Tag de Estado Flotante en base a Enums reales */}
          <div className={`absolute top-4 right-4 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-md backdrop-blur-sm text-white ${
            mascota.estado === 'PERDIDO' 
              ? 'bg-red-500/90' 
              : mascota.estado === 'AVISTADO' 
                ? 'bg-amber-500/90' 
                : 'bg-emerald-500/90'
          }`}>
            {mascota.estado.toLowerCase()}
          </div>
        </div>

        {/* Sección de los Detalles Reales desde PostgreSQL */}
        <div className="p-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-6">
            <div>
              <h1 className="text-4xl font-extrabold text-slate-900 mb-2 capitalize">{mascota.nombre}</h1>
              <p className="text-slate-400 font-medium text-sm">Folio de búsqueda: <span className="text-slate-600 font-semibold">#{mascota.id}</span></p>
            </div>
            <div className="flex gap-2">
              <span className="text-xs font-bold text-slate-500 px-3 py-1.5 bg-slate-100 rounded-lg uppercase tracking-wider">
                {mascota.especie.toLowerCase()}
              </span>
            </div>
          </div>
          
          {/* Ficha técnica ampliada del Backend */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 bg-slate-50 p-5 rounded-xl border border-slate-100">
            <div>
              <p className="text-xs text-slate-400 uppercase font-bold tracking-wider mb-1 flex items-center gap-1">
                <Award size={14} className="text-indigo-500" /> Color / Patrón
              </p>
              <p className="text-base text-slate-700 font-medium capitalize">{mascota.color || 'No especificado'}</p>
            </div>
            <div>
              <p className="text-xs text-slate-400 uppercase font-bold tracking-wider mb-1 flex items-center gap-1">
                <Info size={14} className="text-indigo-500" /> Edad aproximada
              </p>
              <p className="text-base text-slate-700 font-medium">{mascota.edad ? `${mascota.edad} años` : 'No especificada'}</p>
            </div>
            <div>
              <p className="text-xs text-slate-400 uppercase font-bold tracking-wider mb-1 flex items-center gap-1">
                <Calendar size={14} className="text-indigo-500" /> Fecha del Suceso
              </p>
              <p className="text-base text-slate-700 font-medium">
                {new Date(mascota.fechaPerdida).toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' })}
              </p>
            </div>
          </div>

          {/* Relato o Descripción del Caso */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-slate-800 mb-2">Detalles del reporte</h3>
            <p className="text-slate-600 leading-relaxed bg-indigo-50/30 p-4 rounded-xl border border-indigo-100/40">
              {mascota.descripcion}
            </p>
          </div>

          {/* Pie de Página de la Tarjeta con Acciones */}
          <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
            <Link href="/" className="inline-flex items-center text-indigo-600 font-semibold hover:text-indigo-800 transition-colors group text-sm">
              <ArrowLeft size={16} className="mr-2 transform group-hover:-translate-x-1 transition-transform" /> 
              Volver al portal principal
            </Link>
            
            {/* Botón dinámico que asociaremos más adelante al perfil/UID de Firebase */}
            <button 
              onClick={() => alert(`Se iniciará un chat en base al User UID: ${mascota.userUid}`)}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors shadow-sm text-sm"
            >
              <MessageCircle size={16} />
              Contactar al informante
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}