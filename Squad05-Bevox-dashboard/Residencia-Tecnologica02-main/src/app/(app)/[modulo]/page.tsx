import Link from "next/link";
import { notFound } from "next/navigation";
import { Construction } from "lucide-react";
import { modulosPendentes, ROTAS } from "@/config/navigation";

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(modulosPendentes).map((modulo) => ({ modulo }));
}

export default async function ModuloPendentePage({ params }: { params: Promise<{ modulo: string }> }) {
  const { modulo } = await params;
  const info = modulosPendentes[modulo];
  if (!info) notFound();

  return (
    <div className="mx-auto mt-10 max-w-lg rounded-2xl border border-line bg-white p-8 text-center shadow-sm">
      <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
        <Construction className="h-6 w-6" aria-hidden="true" />
      </span>
      <h1 className="mt-4 text-xl font-bold text-slate-900">{info.titulo}</h1>
      <p className="mt-2 text-sm text-slate-500">{info.descricao}</p>
      <p className="mt-4 rounded-lg bg-slate-50 px-4 py-3 text-[13px] text-slate-600">
        Este módulo ainda não foi implementado. Nenhuma operação é realizada nesta tela.
      </p>
      <Link href={ROTAS.dashboard} className="mt-6 inline-block rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
        Voltar ao Dashboard
      </Link>
    </div>
  );
}
