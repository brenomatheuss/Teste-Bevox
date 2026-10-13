"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import {
  Bell,
  ChevronDown,
  LogOut,
  Menu,
  Settings,
  SlidersHorizontal,
} from "lucide-react";
import { ROTAS, tituloDaRota } from "@/config/navigation";
import { DATA_REFERENCIA_DEMO, alertasDemo, empresaDemo, usuarioDemo } from "@/data/mockData";
import { useDismiss } from "@/hooks/useDismiss";
import { formatarRelativo } from "@/lib/dashboard";

const focoBotao =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600";

export default function Header({ onAbrirMenu }: { onAbrirMenu: () => void }) {
  const pathname = usePathname();
  const [notifAberto, setNotifAberto] = useState(false);
  const [perfilAberto, setPerfilAberto] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const perfilRef = useRef<HTMLDivElement>(null);
  useDismiss(notifRef, notifAberto, () => setNotifAberto(false));
  useDismiss(perfilRef, perfilAberto, () => setPerfilAberto(false));

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-3 border-b border-line bg-white/95 px-4 backdrop-blur sm:px-8">
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          onClick={onAbrirMenu}
          aria-label="Abrir menu de navegação"
          className={`rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden ${focoBotao}`}
        >
          <Menu className="h-5 w-5" aria-hidden="true" />
        </button>
        <nav aria-label="Breadcrumb" className="min-w-0">
          <ol className="flex items-center gap-2 text-[14px] text-slate-500">
            <li className="hidden sm:block">
              <Link href={ROTAS.dashboard} className="hover:text-slate-800">
                BEVOX
              </Link>
            </li>
            <li aria-hidden="true" className="hidden text-slate-300 sm:block">/</li>
            <li className="hidden font-semibold text-slate-900 md:block">{empresaDemo.nome}</li>
            <li aria-hidden="true" className="hidden text-slate-300 md:block">/</li>
            <li aria-current="page" className="truncate font-medium text-blue-600">
              {tituloDaRota(pathname)}
            </li>
          </ol>
        </nav>
      </div>

      <div className="flex items-center gap-1 sm:gap-2">
        {/* Notificações */}
        <div ref={notifRef} className="relative">
          <button
            type="button"
            aria-haspopup="menu"
            aria-expanded={notifAberto}
            aria-label={`Notificações (${alertasDemo.length})`}
            onClick={() => {
              setNotifAberto((v) => !v);
              setPerfilAberto(false);
            }}
            className={`relative rounded-lg p-2.5 text-slate-500 hover:bg-slate-100 hover:text-slate-800 ${focoBotao}`}
          >
            <Bell className="h-5 w-5" aria-hidden="true" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" aria-hidden="true" />
          </button>
          {notifAberto && (
            <div
              role="menu"
              aria-label="Notificações recentes"
              className="absolute right-0 top-full z-40 mt-2 w-[min(22rem,calc(100vw-2rem))] rounded-xl border border-line bg-white p-2 shadow-xl"
            >
              <p className="px-3 py-2 text-[12px] font-semibold text-slate-500">
                Notificações recentes (demonstração)
              </p>
              <ul>
                {alertasDemo.slice(0, 3).map((a) => (
                  <li key={a.id}>
                    <Link
                      role="menuitem"
                      href={ROTAS.notificacoes}
                      onClick={() => setNotifAberto(false)}
                      className="block rounded-lg px-3 py-2 hover:bg-slate-50"
                    >
                      <span className="block text-[13px] font-semibold text-slate-800">{a.titulo}</span>
                      <span className="block text-[12px] text-slate-500">
                        {formatarRelativo(a.ocorridoEm, DATA_REFERENCIA_DEMO)}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                role="menuitem"
                href={ROTAS.notificacoes}
                onClick={() => setNotifAberto(false)}
                className="mt-1 block rounded-lg px-3 py-2 text-center text-[13px] font-semibold text-blue-600 hover:bg-blue-50"
              >
                Ver todas as notificações
              </Link>
            </div>
          )}
        </div>

        <Link
          href={ROTAS.configuracoes}
          aria-label="Configurações"
          title="Configurações"
          className={`rounded-lg p-2.5 text-slate-500 hover:bg-slate-100 hover:text-slate-800 ${focoBotao}`}
        >
          <SlidersHorizontal className="h-5 w-5" aria-hidden="true" />
        </Link>

        <span className="mx-1 hidden h-8 w-px bg-line sm:block" aria-hidden="true" />

        {/* Perfil */}
        <div ref={perfilRef} className="relative">
          <button
            type="button"
            aria-haspopup="menu"
            aria-expanded={perfilAberto}
            onClick={() => {
              setPerfilAberto((v) => !v);
              setNotifAberto(false);
            }}
            className={`flex items-center gap-3 rounded-xl p-1.5 hover:bg-slate-50 ${focoBotao}`}
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-navy-900 text-[12px] font-bold text-white">
              {usuarioDemo.iniciais}
            </span>
            <span className="hidden text-left leading-tight sm:block">
              <span className="block text-[14px] font-semibold text-slate-900">{usuarioDemo.nome}</span>
              <span className="block text-[12px] text-slate-500">{usuarioDemo.perfil}</span>
            </span>
            <ChevronDown className="hidden h-4 w-4 text-slate-400 sm:block" aria-hidden="true" />
          </button>
          {perfilAberto && (
            <div
              role="menu"
              aria-label="Menu do perfil"
              className="absolute right-0 top-full z-40 mt-2 w-56 rounded-xl border border-line bg-white p-2 shadow-xl"
            >
              <div className="border-b border-line px-3 pb-2 pt-1">
                <p className="text-[13px] font-semibold text-slate-900">{usuarioDemo.nome}</p>
                <p className="text-[12px] text-slate-500">{usuarioDemo.perfil}</p>
              </div>
              <Link
                role="menuitem"
                href={ROTAS.configuracoes}
                onClick={() => setPerfilAberto(false)}
                className="mt-1 flex items-center gap-2 rounded-lg px-3 py-2 text-[13px] text-slate-700 hover:bg-slate-50"
              >
                <Settings className="h-4 w-4" aria-hidden="true" /> Configurações
              </Link>
              <Link
                role="menuitem"
                href={ROTAS.login}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-[13px] text-red-600 hover:bg-red-50"
              >
                <LogOut className="h-4 w-4" aria-hidden="true" /> Sair
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
