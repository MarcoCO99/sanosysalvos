"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Camera, MapPin, Calendar, AlignLeft, UploadCloud } from 'lucide-react';

export default function ReportarPage() {
  // Estado para alternar entre los dos tipos de reportes
  const [tipoReporte, setTipoReporte] = useState<'perdido' | 'encontrado'>('perdido');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Formulario enviado, tipo:", tipoReporte);
    // Aquí irá la lógica de envío a su base de datos
  };

  // Clases base para los inputs (reutilizando la mejora de contraste)
  const inputClasses = "block w-full pl-10 pr-3 py-2 bg-white text-slate-900 placeholder:text-slate-400 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors";

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        
        {/* --- NAVEGACIÓN SUPERIOR --- */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-indigo-600 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver al inicio
          </Link>
        </div>

        {/* --- ENCABEZADO --- */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Reportar un caso
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            Completa la información a continuación para que la comunidad pueda ayudar.
          </p>
        </div>

        {/* --- SELECTOR DE TIPO DE REPORTE --- */}
        <div className="flex justify-center mb-8">
          <div className="bg-slate-200 p-1 rounded-xl inline-flex">
            <button
              type="button"
              onClick={() => setTipoReporte('perdido')}
              className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                tipoReporte === 'perdido'
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Perdí mi mascota
            </button>
            <button
              type="button"
              onClick={() => setTipoReporte('encontrado')}
              className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                tipoReporte === 'encontrado'
                  ? 'bg-white text-emerald-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Encontré una mascota
            </button>
          </div>
        </div>

        {/* --- FORMULARIO PRINCIPAL --- */}
        <div className="bg-white py-8 px-6 shadow-sm rounded-2xl border border-slate-100 sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            
            {/* Campo: Nombre (Solo si está perdido) */}
            {tipoReporte === 'perdido' && (
              <div>
                <label htmlFor="nombre" className="block text-sm font-medium text-slate-700 mb-1">
                  Nombre de la mascota
                </label>
                <input
                  id="nombre"
                  type="text"
                  className="block w-full px-3 py-2 bg-white text-slate-900 placeholder:text-slate-400 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                  placeholder="Ej. Firulais"
                  required
                />
              </div>
            )}

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {/* Campo: Especie */}
              <div>
                <label htmlFor="especie" className="block text-sm font-medium text-slate-700 mb-1">
                  Especie
                </label>
                <select
                  id="especie"
                  className="block w-full px-3 py-2 bg-white text-slate-900 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                >
                  <option value="perro">Perro</option>
                  <option value="gato">Gato</option>
                  <option value="ave">Ave</option>
                  <option value="otro">Otro</option>
                </select>
              </div>

              {/* Campo: Fecha */}
              <div>
                <label htmlFor="fecha" className="block text-sm font-medium text-slate-700 mb-1">
                  {tipoReporte === 'perdido' ? '¿Cuándo se perdió?' : '¿Cuándo lo encontraste?'}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-5 w-5 text-slate-400" />
                  </div>
                  <input id="fecha" type="date" className={inputClasses} required />
                </div>
              </div>
            </div>

            {/* Campo: Ubicación */}
            <div>
              <label htmlFor="ubicacion" className="block text-sm font-medium text-slate-700 mb-1">
                Última ubicación conocida
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  id="ubicacion"
                  type="text"
                  className={inputClasses}
                  placeholder="Ej. Parque O'Higgins, Santiago"
                  required
                />
              </div>
            </div>

            {/* Campo: Descripción */}
            <div>
              <label htmlFor="descripcion" className="block text-sm font-medium text-slate-700 mb-1">
                Descripción y detalles distintivos
              </label>
              <div className="relative">
                <div className="absolute top-3 left-3 flex items-start pointer-events-none">
                  <AlignLeft className="h-5 w-5 text-slate-400" />
                </div>
                <textarea
                  id="descripcion"
                  rows={4}
                  className="block w-full pl-10 pr-3 py-2 bg-white text-slate-900 placeholder:text-slate-400 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                  placeholder="Colores, collar, cicatrices, tamaño, comportamiento..."
                  required
                />
              </div>
            </div>

            {/* Campo: Subir Foto */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Fotografía
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-xl hover:border-indigo-500 hover:bg-slate-50 transition-colors cursor-pointer group">
                <div className="space-y-1 text-center">
                  <UploadCloud className="mx-auto h-12 w-12 text-slate-400 group-hover:text-indigo-500 transition-colors" />
                  <div className="flex text-sm text-slate-600 justify-center">
                    <span className="relative rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                      Sube un archivo
                    </span>
                    <p className="pl-1">o arrastra y suelta aquí</p>
                  </div>
                  <p className="text-xs text-slate-500">PNG, JPG, GIF hasta 5MB</p>
                </div>
              </div>
            </div>

            {/* Botón de Enviar */}
            <div className="pt-4">
              <button
                type="submit"
                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-base font-bold text-white transition-colors ${
                  tipoReporte === 'perdido' 
                    ? 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500' 
                    : 'bg-emerald-600 hover:bg-emerald-700 focus:ring-emerald-500'
                } focus:outline-none focus:ring-2 focus:ring-offset-2`}
              >
                {tipoReporte === 'perdido' ? 'Publicar Mascota Perdida' : 'Publicar Mascota Encontrada'}
              </button>
            </div>
            
          </form>
        </div>
      </div>
    </div>
  );
}