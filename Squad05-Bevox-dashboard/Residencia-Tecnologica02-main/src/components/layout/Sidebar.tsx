"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { Check, ChevronsUpDown, LogOut } from "lucide-react";
import { BeerIcon } from "@/components/login/icons";
import { navGroups, ROTAS } from "@/config/navigation";
import { empresaDemo, usuarioDemo } from "@/data/mockData";
import { useDismiss } from "@/hooks/useDismiss";

export default function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const [empresaAberta, setEmpresaAberta] = useState(false);
  const empresaRef = useRef<HTMLDivElement>(null);
  useDismiss(empresaRef, empresaAberta, () => setEmpresaAberta(false));

  return (
    <div className="flex h-full flex-col bg-navy-950 text-slate-300">
      {/* Marca */}
      <div className="flex items-center gap-3 px-5 pt-5">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-blue-700">
          <BeerIcon className="h-6 w-6" />
        </span>
        <div className="leading-tight">
          <p className="text-[17px] font-extrabold tracking-wide text-white">BEVOX</p>
          <p className="text-[11px] tracking-wide text-slate-400">BACKOFFICE ERP</p>
        </div>
      </div>

      {/* Empresa */}
      <div ref={empresaRef} className="relative mx-4 mt-5">
        <button
          type="button"
          aria-haspopup="listbox"
          aria-expanded={empresaAberta}
          onClick={() => setEmpresaAberta((v) => !v)}
          className="flex w-full items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-left transition hover:bg-white/[0.07] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-navy-800 text-[11px] font-bold text-amber-300 ring-1 ring-white/10">
            AD
          </span>
          <span className="min-w-0 flex-1 leading-tight">
            <span className="block truncate text-[13px] font-semibold text-white">
              {empresaDemo.nome}
            </span>
            <span className="block truncate text-[11px] text-amber-400">
              Empresa {empresaDemo.status} • {empresaDemo.sede}
            </span>
          </span>
          <ChevronsUpDown className="h-4 w-4 shrink-0 text-slate-400" aria-hidden="true" />
        </button>
        {empresaAberta && (
          <div
            role="listbox"
            aria-label="Empresas"
            className="absolute inset-x-0 top-full z-20 mt-2 rounded-xl border border-white/10 bg-navy-800 p-2 shadow-xl"
          >
            <div
              role="option"
              aria-selected="true"
              className="flex items-center justify-between rounded-lg bg-white/10 px-3 py-2 text-[13px] text-white"
            >
              {empresaDemo.nome}
              <Check className="h-4 w-4 text-blue-300" aria-hidden="true" />
            </div>
            <p className="px-3 pb-1 pt-2 text-[11px] text-slate-400">
              Sua conta está vinculada a uma única empresa.
            </p>
          </div>
        )}
      </div>

      {/* Navegação */}
      <nav aria-label="Menu principal" className="mt-4 flex-1 overflow-y-auto px-4 pb-4">
        {navGroups.map((grupo) => (
          <div key={grupo.label} className="mb-4">
            <p className="px-3 pb-2 pt-3 text-[11px] font-semibold uppercase tracking-wider text-blue-400">
              {grupo.label}
            </p>
            <ul className="space-y-1">
              {grupo.items.map(({ href, label, icon: Icon }) => {
                const ativo = pathname === href || pathname.startsWith(`${href}/`);
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      onClick={onNavigate}
                      aria-current={ativo ? "page" : undefined}
                      className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-[14px] font-medium transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400 ${
                        ativo
                          ? "bg-blue-600 text-white shadow-lg shadow-blue-900/30"
                          : "text-slate-300 hover:bg-white/[0.06] hover:text-white"
                      }`}
                    >
                      <Icon className="h-[18px] w-[18px] shrink-0" aria-hidden="true" />
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Usuário */}
      <div className="flex items-center gap-3 border-t border-white/10 px-5 py-4">
        <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy-800 text-[12px] font-bold text-white ring-1 ring-white/15">
          {usuarioDemo.iniciais}
          <span
            className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-navy-950 bg-emerald-500"
            aria-hidden="true"
          />
        </span>
        <span className="min-w-0 flex-1 leading-tight">
          <span className="block truncate text-[13px] font-semibold text-white">
            {usuarioDemo.nome}
          </span>
          <span className="block truncate text-[11px] text-slate-400">{usuarioDemo.perfil}</span>
        </span>
        <Link
          href={ROTAS.login}
          aria-label="Sair da plataforma"
          title="Sair"
          className="rounded-lg p-2 text-slate-400 transition hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-blue-400"
        >
          <LogOut className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
