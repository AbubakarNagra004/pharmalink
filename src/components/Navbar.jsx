import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Pill, Menu, X } from 'lucide-react';

const links = [
  { to: '/', label: 'Home' },
  { to: '/bidding', label: 'Browse Bids' },
  { to: '/about#how', label: 'How It Works' },
  { to: '/about', label: 'About Us' },
  { to: '/contact', label: 'Contact Us' },
];

/**
 * variant="hero"  -> transparent, sits flush at the top of the navy hero
 * variant="solid" -> sticky navy bar for inner pages
 */
export default function Navbar({ variant = 'solid' }) {
  const [open, setOpen] = useState(false);
  const base = variant === 'hero' ? 'bg-transparent' : 'sticky top-0 z-40 bg-navy';

  const linkCls = ({ isActive }) =>
    `rounded px-3 py-2 text-sm font-medium transition-colors ${isActive ? 'text-white' : 'text-slate-300 hover:text-white'}`;

  return (
    <header className={`${base} border-b border-white/10`}>
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8" aria-label="Main">
        <Link to="/" className="flex items-center gap-2 text-white">
          <span className="grid h-8 w-8 place-items-center rounded bg-verified"><Pill size={18} /></span>
          <span className="text-lg font-semibold tracking-tight">PharmaLink</span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <NavLink key={l.label} to={l.to} end className={linkCls}>{l.label}</NavLink>
          ))}
        </div>

        <div className="hidden items-center gap-2 lg:flex">
          <Link to="/bidding?post=1" className="btn border border-white/25 text-white hover:bg-white/10">Post Requirement</Link>
          <Link to="/contact?type=manufacturer" className="btn-primary">Join as Manufacturer</Link>
        </div>

        <button className="text-white lg:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu" aria-expanded={open}>
          {open ? <X /> : <Menu />}
        </button>
      </nav>

      {open && (
        <div className="space-y-1 border-t border-white/10 bg-navy px-4 pb-4 pt-2 lg:hidden">
          {links.map((l) => (
            <Link key={l.label} to={l.to} onClick={() => setOpen(false)} className="block py-2 text-sm text-slate-200">{l.label}</Link>
          ))}
          <div className="grid gap-2 pt-2">
            <Link to="/bidding?post=1" onClick={() => setOpen(false)} className="btn border border-white/25 text-white">Post Requirement</Link>
            <Link to="/contact?type=manufacturer" onClick={() => setOpen(false)} className="btn-primary">Join as Manufacturer</Link>
          </div>
        </div>
      )}
    </header>
  );
}
