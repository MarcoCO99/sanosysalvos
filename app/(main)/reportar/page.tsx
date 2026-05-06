"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Calendar, AlignLeft, UploadCloud, Loader2, Info, Award, User } from 'lucide-react';
import { petService } from '@/services/petService';

export default function ReportarPage() {
  const router = useRouter();

  // 1. Estado para el tipo de reporte visual
  const [tipoReporte, setTipoReporte] = useState<'perdido' | 'encontrado'>('perdido');
  
  // 2. Estados de control de la petición
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [exito, setExito] = useState<boolean>(false);

  // 3. Estado unificado para los campos del formulario (alineados al Backend)
  const [formData, setFormData] = useState({
    nombre: '',
    especie: 'PERRO',       // Enums en mayúsculas para Spring Boot
    fechaPerdida: '',
    descripcion: '',
    color: '',
    edad: '',
    // UserUid simulado por ahora (aquí irá el uid de Firebase Auth más adelante)
    userUid: 'auth0|simulado-vecino-123', 
    // Foto por defecto en lo que integras un input para subir imágenes binarias/Cloudinary
    foto: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=800&q=80'
  });

  // Manejador genérico de cambios en inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  // 4. Lógica de envío al Backend
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Mapeamos los datos al formato exacto que espera tu Base de Datos en Spring Boot
    const payload = {
      nombre: tipoReporte === 'encontrado' ? 'Mascota Encontrada (Sin Nombre)' : formData.nombre,
      especie: formData.especie.toUpperCase(), 
      estado: tipoReporte === 'perdido' ? 'PERDIDO' : 'AVISTADO', // Sincronizado con tus Enums
      fechaPerdida: formData.fechaPerdida, // Formato YYYY-MM-DD nativo del input date
      descripcion: formData.descripcion,
      color: formData.color || 'No especificado',
      edad: formData.edad ? Number(formData.edad) : undefined,
      foto: formData.foto,
      userUid: formData.userUid
    };

    try {
      // Llamamos a petService (Asegúrate de que tenga el método createPet)
      await petService.createPet(payload);
      setExito(true);
      
      // Redirigimos al portal principal tras 2 segundos para ver el caso publicado
      setTimeout(() => {
        router.push('/');
      }, 2000);

    } catch (err) {
      console.error('Error al publicar reporte:', err);
      setError('Hubo un problema al guardar el reporte en el servidor. Por favor, verifica los campos.');
    } finally {
      setLoading(false);
    }
  };

  const inputClasses = "block w-full pl-10 pr-3 py-2 bg-white text-slate-900 placeholder:text-slate-400 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors";

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        
        {/* NAVEGACIÓN SUPERIOR */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-indigo-600 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver al inicio
          </Link>
        </div>

        {/* ENCABEZADO */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Reportar un caso
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            Completa la información a continuación para que la comunidad pueda ayudar.
          </p>
        </div>

        {/* SELECTOR DE TIPO DE REPORTE */}
        <div className="flex justify-center mb-8">
          <div className="bg-slate-200 p-1 rounded-xl inline-flex">
            <button
              type="button"
              disabled={loading || exito}
              onClick={() => setTipoReporte('perdido')}
              className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                tipoReporte === 'perdido'
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              } disabled:opacity-50`}
            >
              Perdí mi mascota
            </button>
            <button
              type="button"
              disabled={loading || exito}
              onClick={() => setTipoReporte('encontrado')}
              className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                tipoReporte === 'encontrado'
                  ? 'bg-white text-emerald-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              } disabled:opacity-50`}
            >
              Encontré una mascota
            </button>
          </div>
        </div>

        {/* MENSAJES DE ESTADO */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-center font-medium">
            ⚠️ {error}
          </div>
        )}

        {exito && (
          <div className="mb-6 bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-4 rounded-xl text-center font-bold shadow-sm animate-pulse">
            🎉 ¡Reporte publicado con éxito! Redirigiendo al inicio...
          </div>
        )}

        {/* FORMULARIO PRINCIPAL */}
        <div className="bg-white py-8 px-6 shadow-sm rounded-2xl border border-slate-100 sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            
            {/* Campo: Nombre (Solo si está perdido) */}
            {tipoReporte === 'perdido' && (
              <div>
                <label htmlFor="nombre" className="block text-sm font-medium text-slate-700 mb-1">
                  Nombre de la mascota
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    id="nombre"
                    type="text"
                    value={formData.nombre}
                    onChange={handleChange}
                    className={inputClasses}
                    placeholder="Ej. Firulais"
                    required={tipoReporte === 'perdido'}
                  />
                </div>
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
                  value={formData.especie}
                  onChange={handleChange}
                  className="block w-full px-3 py-2 bg-white text-slate-900 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                >
                  <option value="PERRO">Perro</option>
                  <option value="GATO">Gato</option>
                  <option value="AVE">Ave</option>
                  <option value="OTRO">Otro</option>
                </select>
              </div>

              {/* Campo: Fecha */}
              <div>
                <label htmlFor="fechaPerdida" className="block text-sm font-medium text-slate-700 mb-1">
                  {tipoReporte === 'perdido' ? '¿Cuándo se perdió?' : '¿Cuándo lo encontraste?'}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-5 w-5 text-slate-400" />
                  </div>
                  <input 
                    id="fechaPerdida" 
                    type="date" 
                    value={formData.fechaPerdida}
                    onChange={handleChange}
                    className={inputClasses} 
                    required 
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {/* Campo: Color */}
              <div>
                <label htmlFor="color" className="block text-sm font-medium text-slate-700 mb-1">
                  Color o rasgos característicos
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Award className="h-5 w-5 text-slate-400" />
                  </div>
                  <input 
                    id="color" 
                    type="text" 
                    value={formData.color}
                    onChange={handleChange}
                    placeholder="Ej. Negro con manchas blancas"
                    className={inputClasses} 
                    required
                  />
                </div>
              </div>

              {/* Campo: Edad */}
              <div>
                <label htmlFor="edad" className="block text-sm font-medium text-slate-700 mb-1">
                  Edad aproximada (Opcional)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Info className="h-5 w-5 text-slate-400" />
                  </div>
                  <input 
                    id="edad" 
                    type="number" 
                    min="0"
                    max="30"
                    value={formData.edad}
                    onChange={handleChange}
                    placeholder="Ej. 3"
                    className={inputClasses} 
                  />
                </div>
              </div>
            </div>

            {/* Campo: Descripción / Relato */}
            <div>
              <label htmlFor="descripcion" className="block text-sm font-medium text-slate-700 mb-1">
                Detalles del suceso e indicaciones de contacto
              </label>
              <div className="relative">
                <div className="absolute top-3 left-3 flex items-start pointer-events-none">
                  <AlignLeft className="h-5 w-5 text-slate-400" />
                </div>
                <textarea
                  id="descripcion"
                  rows={4}
                  value={formData.descripcion}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-2 bg-white text-slate-900 placeholder:text-slate-400 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                  placeholder="Tenía collar rojo, cojea un poco, se asusta con ruidos fuertes, visto por última vez en San Miguel..."
                  required
                />
              </div>
            </div>

            {/* Campo: Subir Foto (Simulado con URL por defecto por ahora) */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Fotografía de la mascota
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-xl hover:border-indigo-500 hover:bg-slate-50 transition-colors cursor-pointer group">
                <div className="space-y-1 text-center">
                  <UploadCloud className="mx-auto h-12 w-12 text-slate-400 group-hover:text-indigo-500 transition-colors" />
                  <div className="flex text-sm text-slate-600 justify-center">
                    <span className="relative rounded-md font-semibold text-indigo-600 hover:text-indigo-500">
                      Fotografía vinculada por defecto
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">El sistema asocia una imagen de prueba temporal</p>
                </div>
              </div>
            </div>

            {/* Botón de Enviar */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading || exito}
                className={`w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-xl shadow-sm text-base font-bold text-white transition-colors ${
                  tipoReporte === 'perdido' 
                    ? 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500' 
                    : 'bg-emerald-600 hover:bg-emerald-700 focus:ring-emerald-500'
                } focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50`}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Procesando reporte...
                  </>
                ) : tipoReporte === 'perdido' ? (
                  'Publicar Mascota Perdida'
                ) : (
                  'Publicar Mascota Encontrada'
                )}
              </button>
            </div>
            
          </form>
        </div>
      </div>
    </div>
  );
}