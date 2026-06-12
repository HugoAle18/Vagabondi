import React, { useState } from 'react';
import registros from '../data/finanzas.json';
import { DollarSign, TrendingUp, ShoppingBag } from 'lucide-react';

export default function Dashboard() {
  const [filtro, setFiltro] = useState('Todos');

  const datosFiltrados = registros.filter(item => {
    if (filtro === 'Todos') return true;
    return item.tipo === filtro;
  });

  const totalCobrado = datosFiltrados.reduce((sum, item) => sum + item.cobrado, 0);
  const totalGastado = datosFiltrados.reduce((sum, item) => sum + item.gastado, 0);
  const gananciaReal = totalCobrado - totalGastado;

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        
        <header className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-5">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Control Financiero — VAGABONDI
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Vista en tiempo real de los fondos, ventas y utilidades del equipo.
            </p>
          </div>
          
          <div>
            <select
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
              className="w-full sm:w-48 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
            >
              <option value="Todos">Todas las actividades</option>
              <option value="Venta de tortas">🍰 Venta de tortas</option>
              <option value="Trabajo">🪵 Trabajos / Servicios</option>
            </select>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 mb-8">
          <div className="overflow-hidden rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-500">Monto Total Cobrado</p>
              <div className="rounded-lg bg-blue-50 p-2 text-blue-600">
                <DollarSign className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-2">
              <span className="text-3xl font-bold tracking-tight text-slate-900">S/ {totalCobrado.toLocaleString('es-PE', { minimumFractionDigits: 2 })}</span>
            </div>
          </div>

          <div className="overflow-hidden rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200 border-l-4 border-red-500">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-500">Monto Total Gastado</p>
              <div className="rounded-lg bg-red-50 p-2 text-red-600">
                <ShoppingBag className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-2">
              <span className="text-3xl font-bold tracking-tight text-slate-900">S/ {totalGastado.toLocaleString('es-PE', { minimumFractionDigits: 2 })}</span>
            </div>
          </div>

          <div className="overflow-hidden rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200 border-l-4 border-emerald-500">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-500">Ganancia Real</p>
              <div className="rounded-lg bg-emerald-50 p-2 text-emerald-600">
                <TrendingUp className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-2">
              <span className="text-3xl font-bold tracking-tight text-emerald-600">S/ {gananciaReal.toLocaleString('es-PE', { minimumFractionDigits: 2 })}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm ring-1 ring-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
            <h2 className="text-lg font-medium text-slate-800">Historial de Transacciones ({datosFiltrados.length})</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-100 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  <th className="px-6 py-3">Fecha</th>
                  <th className="px-6 py-3">Tipo Actividad</th>
                  <th className="px-6 py-3">Detalle / Cliente</th>
                  <th className="px-6 py-3">Insumos Comprados</th>
                  <th className="px-6 py-3 text-right">Monto Gastado</th>
                  <th className="px-6 py-3 text-right">Monto Cobrado</th>
                  <th className="px-6 py-3 text-right">Ganancia Real</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-sm text-slate-600">
                {datosFiltrados.map((item, index) => (
                  <tr key={index} className="hover:bg-slate-50/70 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-slate-900">{item.fecha}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${
                        item.tipo === 'Venta de tortas' 
                          ? 'bg-purple-50 text-purple-700 ring-purple-700/10' 
                          : 'bg-amber-50 text-amber-800 ring-amber-600/20'
                      }`}>
                        {item.tipo === 'Venta de tortas' ? '🍰 ' : '🪵 '} {item.tipo}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-slate-500">{item.detalle || '—'}</td>
                    <td className="px-6 py-4 whitespace-nowrap italic text-slate-400">{item.insumos || 'Ninguno'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-red-500 font-medium">
                      {item.gastado > 0 ? `S/ ${item.gastado.toFixed(2)}` : '—'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-slate-900 font-medium">
                      S/ {item.cobrado.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-emerald-600 font-semibold bg-emerald-50/20">
                      S/ {item.ganancia.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
      </div>
    </div>
  );
}