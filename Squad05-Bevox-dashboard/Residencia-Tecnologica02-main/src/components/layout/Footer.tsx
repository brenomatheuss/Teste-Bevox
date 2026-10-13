import pkg from "../../../package.json";

export default function Footer({ ultimaSincronizacao = null }: { ultimaSincronizacao?: string | null }) {
  return (
    <footer className="mt-auto border-t border-line bg-white px-4 py-5 sm:px-8">
      <div className="flex flex-col gap-2 text-[12px] text-slate-500 md:flex-row md:items-center md:justify-between">
        <p>
          © {new Date().getFullYear()} <strong className="font-semibold text-slate-800">BEVOX Analytics Studio</strong>{" "}
          • Adega Distribution Ltda. <span className="text-slate-400">(dados demonstrativos)</span>
        </p>
        <p className="font-[ui-monospace,SFMono-Regular,Menlo,monospace] text-[11px] text-slate-400">
          v{pkg.version} • Última sincronização:{" "}
          {ultimaSincronizacao ?? "indisponível (sem integração com API)"}
        </p>
      </div>
    </footer>
  );
}
