"use client";

import { useId, useMemo, useState } from "react";
import {
  Area,
  CartesianGrid,
  ComposedChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardTitle } from "@/components/ui/Card";
import { montarSerie, variacaoPercentual } from "@/lib/dashboard";
import type { DashboardData, Periodo, SerieKey } from "@/types";

const PERIODOS: { id: Periodo; rotulo: string; descricao: string }[] = [
  { id: "30d", rotulo: "30 Dias", descricao: "últimos 30 dias (semanal)" },
  { id: "6m", rotulo: "6 Meses", descricao: "últimos 6 meses" },
  { id: "1a", rotulo: "1 Ano", descricao: "últimos 12 meses" },
];

const SERIES: { key: SerieKey; nome: string; legenda: string; cor: string }[] = [
  { key: "documentos", nome: "Documentos", legenda: "Documentos", cor: "#2563eb" },
  { key: "tarefas", nome: "Tarefas", legenda: "Tarefas", cor: "#10b981" },
  { key: "licencas", nome: "Licenças", legenda: "Licenças", cor: "#f59e0b" },
  { key: "unidades", nome: "Unidades", legenda: "Unidades", cor: "#8b5cf6" },
];

export default function CompanyOverviewChart({ data }: { data: DashboardData }) {
  const [periodo, setPeriodo] = useState<Periodo>("6m");
  const uid = useId().replace(/:/g, "");
  const serie = useMemo(() => montarSerie(data, periodo), [data, periodo]);
  const info = PERIODOS.find((p) => p.id === periodo)!;
  const maximo = Math.max(...serie.flatMap((p) => SERIES.map((s) => p[s.key])));
  const topo = Math.max(25, Math.ceil(maximo / 25) * 25);
  const ultimo = serie[serie.length - 1];
  const primeiro = serie[0];

  return (
    <Card aria-labelledby="visao-geral" className="p-5 sm:p-6">
      <div className="flex flex-col gap-3 border-b border-line pb-4 sm:flex-row sm:items-start sm:justify-between">
        <CardTitle
          id="visao-geral"
          titulo="Visão Geral da Empresa"
          subtitulo="Evolução dos principais indicadores operacionais"
        />
        <div role="group" aria-label="Período do gráfico" className="inline-flex shrink-0 self-start rounded-lg bg-slate-100 p-1">
          {PERIODOS.map((p) => (
            <button
              key={p.id}
              type="button"
              aria-pressed={periodo === p.id}
              onClick={() => setPeriodo(p.id)}
              className={`rounded-md px-3 py-1.5 text-[12px] font-medium transition focus-visible:outline-2 focus-visible:outline-blue-600 ${
                periodo === p.id ? "bg-white font-bold text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-800"
              }`}
            >
              {p.rotulo}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 h-72 w-full" role="img" aria-label={`Gráfico de linhas com a evolução de documentos, tarefas, licenças e unidades nos ${info.descricao}.`}>
        <ResponsiveContainer width="100%" height="100%" minWidth={0}>
          <ComposedChart data={serie} margin={{ top: 12, right: 16, left: -12, bottom: 0 }}>
            <defs>
              {SERIES.map((s) => (
                <linearGradient key={s.key} id={`${uid}-${s.key}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={s.cor} stopOpacity={0.14} />
                  <stop offset="100%" stopColor={s.cor} stopOpacity={0} />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid stroke="#e2e8f0" strokeDasharray="3 4" vertical={false} />
            <XAxis dataKey="rotulo" tickLine={false} axisLine={{ stroke: "#e2e8f0" }} tick={{ fontSize: 11, fill: "#94a3b8" }} interval="preserveStartEnd" />
            <YAxis domain={[0, topo]} tickCount={6} tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "#94a3b8" }} width={44} />
            <Tooltip
              cursor={{ stroke: "#cbd5e1", strokeDasharray: "3 3" }}
              contentStyle={{ borderRadius: 12, border: "1px solid #e4e8f1", fontSize: 12, boxShadow: "0 8px 24px rgba(15,23,42,.08)" }}
            />
            {SERIES.map((s) => (
              <Area
                key={s.key}
                type="monotone"
                dataKey={s.key}
                name={s.nome}
                stroke={s.cor}
                strokeWidth={2.5}
                fill={`url(#${uid}-${s.key})`}
                dot={{ r: 4, fill: "#fff", stroke: s.cor, strokeWidth: 2 }}
                activeDot={{ r: 5.5 }}
                isAnimationActive={false}
              />
            ))}
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Tabela equivalente para leitores de tela */}
      <div className="sr-only">
      <table>
        <caption>Valores do gráfico ({info.descricao})</caption>
        <thead>
          <tr>
            <th>Período</th>
            {SERIES.map((s) => <th key={s.key}>{s.nome}</th>)}
          </tr>
        </thead>
        <tbody>
          {serie.map((p) => (
            <tr key={p.rotulo}>
              <td>{p.rotulo}</td>
              {SERIES.map((s) => <td key={s.key}>{p[s.key]}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
      </div>

      <ul className="mt-4 grid grid-cols-2 gap-4 border-t border-line pt-4 lg:grid-cols-4">
        {SERIES.map((s) => {
          const v = variacaoPercentual(primeiro[s.key], ultimo[s.key]);
          return (
            <li key={s.key} className="flex items-start gap-2.5">
              <span className="mt-1 h-3 w-3 shrink-0 rounded-full" style={{ backgroundColor: s.cor }} aria-hidden="true" />
              <span className="leading-tight">
                <span className="text-[14px] font-bold text-slate-900">{ultimo[s.key]}</span>
                {v !== null && (
                  <span className={`ml-1.5 text-[11px] font-semibold ${v >= 0 ? "text-emerald-600" : "text-red-600"}`}>
                    {v >= 0 ? "+" : ""}{v}%
                  </span>
                )}
                <span className="block text-[12px] text-slate-500">{s.legenda}</span>
              </span>
            </li>
          );
        })}
      </ul>
      <p className="mt-3 text-[11px] text-slate-400">
        Variação em relação ao início do período selecionado • dados demonstrativos.
      </p>
    </Card>
  );
}
