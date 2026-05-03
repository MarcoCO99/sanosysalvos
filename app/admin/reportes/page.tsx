// app/admin/reportes/page.tsx
"use client";
import React, { useState } from 'react';

const datosIniciales = [
  { id: 1, nombre: 'Max', tipo: 'Perro', estado: 'Perdido', fecha: '2024-03-01', usuario: 'Juan P.' },
  { id: 2, nombre: 'Luna', tipo: 'Gato', estado: 'Encontrado', fecha: '2024-03-05', usuario: 'Maria L.' },
  { id: 3, nombre: 'Rocky', tipo: 'Perro', estado: 'Perdido', fecha: '2024-03-10', usuario: 'Carlos R.' },
];

export default function GestionReportes() {
  const [reportes, setReportes] = useState(datosIniciales);

  // Función para simular eliminación
  const eliminarReporte = (id: number) => {
    if(confirm("¿Estás seguro de que deseas eliminar este reporte?")) {
      setReportes(reportes.filter(r => r.id !== id));
    }
  };

  // Función para simular cambio de estado
  const cambiarEstado = (id: number) => {
    setReportes(reportes.map(r => {
      if (r.id === id) {
        return { ...r, estado: r.estado === 'Perdido' ? 'Encontrado' : 'Perdido' };
      }
      return r;
    }));
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Gestión de Reportes</h1>
        <span className="text-slate-500 font-medium">{reportes.length} reportes listados</span>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Mascota</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Estado</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Reportado por</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Fecha</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {reportes.map((reporte) => (
              <tr key={reporte.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <p className="font-bold text-slate-800">{reporte.nombre}</p>
                  <p className="text-xs text-slate-400">{reporte.tipo}</p>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    reporte.estado === 'Perdido' ? 'bg-red-100 text-red-600' : 'bg-emerald-100 text-emerald-600'
                  }`}>
                    {reporte.estado}
                  </span>
                </td>
                <td className="px-6 py-4 text-slate-600 text-sm">{reporte.usuario}</td>
                <td className="px-6 py-4 text-slate-500 text-sm">{reporte.fecha}</td>
                <td className="px-6 py-4 text-right space-x-2">
                  <button 
                    onClick={() => cambiarEstado(reporte.id)}
                    className="text-xs bg-indigo-50 text-indigo-600 px-3 py-1.5 rounded-lg font-bold hover:bg-indigo-100 transition-colors"
                  >
                    Cambiar Estado
                  </button>
                  <button 
                    onClick={() => eliminarReporte(reporte.id)}
                    className="text-xs bg-red-50 text-red-600 px-3 py-1.5 rounded-lg font-bold hover:bg-red-100 transition-colors"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}