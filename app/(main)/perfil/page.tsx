import React from 'react';
import Link from 'next/link';

// Datos de prueba para el usuario actual
const mockUsuario = {
  nombre: 'María Pérez',
  email: 'maria.perez@correo.com',
  telefono: '+56 9 1234 5678',
  ubicacion: 'Santiago Centro, Chile',
  foto: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80',
  fechaRegistro: 'Enero 2024'
};

// Reportes creados por este usuario (simulados)
const misReportes = [
  { 
    id: '1', 
    nombre: 'Max', 
    tipo: 'Perro', 
    estado: 'Perdido', 
    ubicacion: 'Santiago Centro',
    foto: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=800&q=80' 
  },
  { 
    id: '3', 
    nombre: 'Rocky', 
    tipo: 'Perro', 
    estado: 'Perdido', 
    ubicacion: 'Maipú',
    foto: 'https://images.unsplash.com/photo-1537151608804-ea2f1fa73a74?auto=format&fit=crop&w=800&q=80' 
  }
];

export default function PerfilPage() {
  return (
    <main className="min-h-screen bg-slate-50 flex flex-col">
      
      {/* HEADER - Consistente con el resto de la app */}
      <header className="bg-white border-b sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-indigo-600">
            Sanos y Salvos
          </Link>
          <div className="flex gap-4 items-center">
            <Link href="/explorar" className="text-slate-600 font-medium hover:text-indigo-600 px-3 py-2 transition-colors">
              Explorar
            </Link>
            <Link href="/reportar" className="bg-indigo-600 text-white font-medium px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors shadow-sm">
              Reportar Mascota
            </Link>
          </div>
        </nav>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-12 w-full flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* PANEL IZQUIERDO: INFORMACIÓN DEL USUARIO */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="bg-indigo-600 h-24 w-full"></div>
              <div className="px-6 pb-6">
                <div className="relative -mt-12 mb-4">
                  <img 
                    src={mockUsuario.foto} 
                    alt={mockUsuario.nombre}
                    className="w-24 h-24 rounded-full border-4 border-white object-cover shadow-sm mx-auto"
                  />
                </div>
                <div className="text-center mb-6">
                  <h1 className="text-2xl font-bold text-slate-900">{mockUsuario.nombre}</h1>
                  <p className="text-slate-500 text-sm">Miembro desde {mockUsuario.fechaRegistro}</p>
                </div>

                <div className="space-y-4 border-t border-slate-100 pt-6">
                  <div>
                    <label className="text-xs font-bold text-slate-400 uppercase">Email</label>
                    <p className="text-slate-700">{mockUsuario.email}</p>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-400 uppercase">Teléfono</label>
                    <p className="text-slate-700">{mockUsuario.telefono}</p>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-400 uppercase">Ubicación</label>
                    <p className="text-slate-700">{mockUsuario.ubicacion}</p>
                  </div>
                </div>

                <button className="w-full mt-8 py-2.5 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-colors">
                  Editar Datos del Perfil
                </button>
              </div>
            </div>
          </div>

          {/* PANEL DERECHO: MIS REPORTES ACTIVOS */}
          <div className="lg:col-span-2">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-slate-900">Mis Reportes Activos</h2>
              <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-bold">
                {misReportes.length} casos
              </span>
            </div>

            {misReportes.length === 0 ? (
              <div className="bg-white p-12 rounded-2xl border-2 border-dashed border-slate-200 text-center">
                <p className="text-slate-400 text-lg mb-4">No tienes reportes activos en este momento.</p>
                <Link href="/reportar" className="text-indigo-600 font-bold hover:underline">
                  Crear un nuevo reporte →
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {misReportes.map((mascota) => (
                  <div key={mascota.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
                    <div className="relative h-40">
                      <img src={mascota.foto} className="w-full h-full object-cover" />
                      <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold uppercase">
                        {mascota.estado}
                      </div>
                    </div>
                    <div className="p-4 flex-grow">
                      <h3 className="font-bold text-lg text-slate-800">{mascota.nombre}</h3>
                      <p className="text-slate-500 text-sm mb-4">📍 {mascota.ubicacion}</p>
                      
                      {/* Botones de Gestión */}
                      <div className="grid grid-cols-2 gap-2 mt-auto">
                        <Link 
                          href={`/mascota/${mascota.id}`}
                          className="text-center py-2 bg-slate-50 text-slate-600 text-xs font-bold rounded-lg hover:bg-slate-100 border border-slate-200"
                        >
                          Ver detalle
                        </Link>
                        <button className="py-2 bg-emerald-50 text-emerald-600 text-xs font-bold rounded-lg hover:bg-emerald-100 border border-emerald-100 transition-colors">
                          ¡Lo encontré!
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>

      <footer className="bg-slate-900 text-slate-400 py-8 text-center text-sm">
        <p>© 2024 Sanos y Salvos</p>
      </footer>
    </main>
  );
}