import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, BadgeCheck, FileText, PackageCheck, Timer } from 'lucide-react';
import Navbar from './Navbar.jsx';

const stats = [
  { icon: FileText, label: 'Active tenders', value: 1284 },
  { icon: BadgeCheck, label: 'Verified manufacturers', value: 436 },
  { icon: PackageCheck, label: 'Completed deliveries', value: 9712 },
];

function useCountUp(target, ms = 1200) {
  const [n, setN] = useState(0);
  useEffect(() => {
    const start = performance.now();
    let raf;
    const tick = (t) => {
      const p = Math.min((t - start) / ms, 1);
      setN(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, ms]);
  return n;
}

function Stat({ icon: Icon, label, value }) {
  const n = useCountUp(value);
  return (
    <div className="flex items-center gap-3 px-5 py-4">
      <Icon size={20} className="text-emerald-400" />
      <div>
        <div className="text-2xl font-semibold tabular-nums">{n.toLocaleString()}</div>
        <div className="text-xs text-slate-400">{label}</div>
      </div>
    </div>
  );
}

const sample = [
  { name: 'Ceftriaxone 1g Vials', qty: '18,000 vials', bids: 11, left: '20h left' },
  { name: 'Paracetamol 500mg', qty: '400,000 tablets', bids: 14, left: '4d left' },
  { name: 'Insulin Glargine Pens', qty: '4,200 pens', bids: 5, left: '5d left' },
];

export default function Hero() {
  const [q, setQ] = useState('');
  const navigate = useNavigate();
  const submit = (e) => {
    e.preventDefault();
    navigate(`/bidding${q ? `?q=${encodeURIComponent(q)}` : ''}`);
  };

  return (
    <section
      className="bg-navy text-white"
      style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.035) 1px, transparent 1px)', backgroundSize: '48px 48px' }}
    >
      <Navbar variant="hero" />

      <div className="mx-auto grid max-w-7xl gap-12 px-4 pb-14 pt-16 sm:px-6 lg:grid-cols-5 lg:px-8 lg:pt-24">
        <div className="lg:col-span-3">
          <h1 className="max-w-2xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
            Direct Pharmaceutical Procurement from Verified Manufacturers
          </h1>
          <p className="mt-5 max-w-xl text-lg text-slate-300">
            Post your bulk requirement once. Credential-checked manufacturers compete on price, lead time and documentation, with no distributor markup in between.
          </p>

          <form onSubmit={submit} className="mt-8 flex max-w-xl overflow-hidden rounded-md bg-white" role="search">
            <label htmlFor="hero-search" className="sr-only">Search medicines or tenders</label>
            <Search className="my-auto ml-3 shrink-0 text-slate-400" size={18} />
            <input id="hero-search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search a medicine or tender ID, e.g. Amoxicillin" className="w-full px-3 py-3.5 text-sm text-navy placeholder:text-slate-400 focus:outline-none" />
            <button className="bg-verified px-5 text-sm font-semibold hover:bg-verified-dark">Search</button>
          </form>
        </div>

        <aside className="lg:col-span-2" aria-label="Live tenders">
          <div className="rounded-lg border border-white/10 bg-navy-800">
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 text-sm">
              <span className="font-medium">Closing soon</span>
              <span className="flex items-center gap-1.5 text-xs text-emerald-400"><span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />Live</span>
            </div>
            <ul className="divide-y divide-white/10">
              {sample.map((s) => (
                <li key={s.name} className="flex items-center justify-between gap-3 px-4 py-3.5">
                  <div>
                    <div className="text-sm font-medium">{s.name}</div>
                    <div className="text-xs text-slate-400">{s.qty}, {s.bids} bids</div>
                  </div>
                  <span className="flex items-center gap-1 text-xs text-slate-300"><Timer size={14} />{s.left}</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto grid max-w-7xl divide-white/10 sm:grid-cols-3 sm:divide-x">
          {stats.map((s) => <Stat key={s.label} {...s} />)}
        </div>
      </div>
    </section>
  );
}
