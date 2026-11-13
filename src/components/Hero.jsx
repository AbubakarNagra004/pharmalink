import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, BadgeCheck, FileText, PackageCheck } from 'lucide-react';
import Navbar from './Navbar.jsx';
import heroImg from '../assets/hero.jpg';

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

export default function Hero() {
  const [q, setQ] = useState('');
  const navigate = useNavigate();
  const submit = (e) => {
    e.preventDefault();
    navigate(`/bidding${q ? `?q=${encodeURIComponent(q)}` : ''}`);
  };

  return (
    <section className="relative isolate overflow-hidden bg-navy text-white">
      <img src={heroImg} alt="" className="absolute inset-0 -z-20 h-full w-full object-cover object-right" />
      {/* navy scrim keeps text legible: solid on mobile, fading to the photo on desktop */}
      <div className="absolute inset-0 -z-10 bg-navy/85 lg:bg-gradient-to-r lg:from-navy lg:via-navy/85 lg:to-navy/10" />

      <Navbar variant="hero" />

      <div className="mx-auto max-w-7xl px-4 pb-20 pt-16 sm:px-6 lg:px-8 lg:pb-28 lg:pt-24">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
            Direct Pharmaceutical Procurement from Verified Manufacturers
          </h1>
          <p className="mt-5 max-w-xl text-lg text-slate-200">
            Post your bulk requirement once. Credential-checked manufacturers compete on price, lead time and documentation, with no distributor markup in between.
          </p>

          <form onSubmit={submit} className="mt-8 flex max-w-xl overflow-hidden rounded-md bg-white" role="search">
            <label htmlFor="hero-search" className="sr-only">Search medicines or tenders</label>
            <Search className="my-auto ml-3 shrink-0 text-slate-400" size={18} />
            <input id="hero-search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search a medicine or tender ID, e.g. Amoxicillin" className="w-full px-3 py-3.5 text-sm text-navy placeholder:text-slate-400 focus:outline-none" />
            <button className="bg-verified px-5 text-sm font-semibold hover:bg-verified-dark">Search</button>
          </form>
        </div>
      </div>

      <div className="border-t border-white/10 bg-navy/90">
        <div className="mx-auto grid max-w-7xl divide-white/10 sm:grid-cols-3 sm:divide-x">
          {stats.map((s) => <Stat key={s.label} {...s} />)}
        </div>
      </div>
    </section>
  );
}
