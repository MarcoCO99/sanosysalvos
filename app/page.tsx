import React from 'react';
import { Camera, Search, MapPin, Heart } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* --- HERO SECTION --- */}
      <header className="bg-white border-b">
        <nav className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-indigo-600 flex items-center gap-2">
            <Heart className="fill-current" /> PetRescue
          </h1>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition">
            Iniciar Sesión
          </button>
        </nav>
      </header>

      <main>
        {/* --- SECCIÓN DE ACCIÓN PRINCIPAL --- */}
        <section className="py-16 px-4 max-w-5xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">
            Ayudémoslos a volver a casa
          </h2>
          <p className="text-lg text-slate-600 mb-12 max-w-2xl mx-auto">
            La red más grande de búsqueda y rescate de mascotas. Si perdiste a tu mejor amigo o encontraste uno, estás en el lugar correcto.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Opción 1: Subir Mascota */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border-2 border-transparent hover:border-indigo-500 transition cursor-pointer group">
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition">
                <Camera className="text-indigo-600" size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-2">Perdí una mascota</h3>
              <p className="text-slate-500 mb-6">Publica un anuncio con fotos y ubicación para que la comunidad te ayude.</p>
              <button className="w-full py-3 bg-indigo-600 text-white rounded-xl font-semibold">
                Reportar Desaparición
              </button>
            </div>

            {/* Opción 2: Buscar Mascota */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border-2 border-transparent hover:border-emerald-500 transition cursor-pointer group">
              <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition">
                <Search className="text-emerald-600" size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-2">Encontré una mascota</h3>
              <p className="text-slate-500 mb-6">¿Viste un animalito solo? Sube su ubicación y ayuda a su dueño a encontrarlo.</p>
              <button className="w-full py-3 bg-emerald-600 text-white rounded-xl font-semibold">
                Buscar Dueños
              </button>
            </div>
          </div>
        </section>

        {/* --- MASCOTAS RECIENTES --- */}
        <section className="bg-slate-100 py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-end mb-8">
              <div>
                <h3 className="text-2xl font-bold">Vistos recientemente</h3>
                <p className="text-slate-600">Reportes de las últimas 24 horas</p>
              </div>
              <a href="#" className="text-indigo-600 font-medium hover:underline">Ver todos los casos</a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((id) => (
                <div key={id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition">
                  <div className="h-48 bg-slate-300 animate-pulse" /> {/* Placeholder para imagen */}
                  <div className="p-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-red-500 bg-red-50 px-2 py-1 rounded">Desaparecido</span>
                    <h4 className="font-bold text-lg mt-2">Firulais</h4>
                    <div className="flex items-center text-slate-500 text-sm mt-1">
                      <MapPin size={14} className="mr-1" /> Santiago, Chile
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}