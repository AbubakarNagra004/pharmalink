import { Clock, MapPin, CalendarClock, Users, BadgeCheck } from 'lucide-react';

export function timeLeft(deadline, now) {
  const ms = new Date(deadline) - now;
  if (ms <= 0) return 'Closed';
  const m = Math.floor(ms / 60000);
  const d = Math.floor(m / 1440);
  const hr = Math.floor((m % 1440) / 60);
  if (d > 0) return `${d}d ${hr}h left`;
  if (hr > 0) return `${hr}h ${m % 60}m left`;
  return `${m}m left`;
}

const statusStyle = {
  'Open for Bids': 'bg-verified-light text-verified-dark',
  'Pending Review': 'bg-amber-100 text-amber-800',
  Awarded: 'bg-slate-200 text-slate-700',
};

export const fmtPrice = (n) => `$${n < 1 ? n.toFixed(3) : n.toFixed(2)}`;

function Meta({ icon: Icon, children }) {
  return <span className="flex items-center gap-1.5"><Icon size={15} className="shrink-0 text-slate-400" />{children}</span>;
}

export default function TenderCard({ tender: t, now, view, onOpen }) {
  const left = timeLeft(t.deadline, now);
  const urgent = t.status === 'Open for Bids' && new Date(t.deadline) - now < 24 * 3600 * 1000;
  const isList = view === 'list';

  return (
    <article className={`rounded-lg border border-slate-200 bg-white p-5 transition-colors hover:border-slate-400 ${isList ? 'grid items-center gap-4 md:grid-cols-12' : 'flex flex-col gap-4'}`}>
      <div className={isList ? 'md:col-span-4' : ''}>
        <div className="flex items-center gap-2">
          <span className={`rounded px-2 py-0.5 text-xs font-medium ${statusStyle[t.status]}`}>{t.status}</span>
          <span className="text-xs text-slate-500">{t.id}</span>
        </div>
        <h3 className="mt-2 font-semibold leading-snug">{t.medicine}</h3>
        <p className="mt-1 flex items-center gap-1 text-sm text-slate-500">
          <BadgeCheck size={14} className="text-verified" />{t.buyer}
        </p>
      </div>

      <div className={`grid gap-1.5 text-sm text-slate-600 ${isList ? 'md:col-span-4' : ''}`}>
        <div className="font-medium text-navy">{t.quantity.toLocaleString()} {t.unit} <span className="font-normal text-slate-500">· {t.dosage}</span></div>
        <Meta icon={CalendarClock}>{t.expiry}</Meta>
        <Meta icon={MapPin}>Deliver to {t.location}</Meta>
      </div>

      <div className={`flex items-center justify-between gap-4 ${isList ? 'md:col-span-4 md:justify-end' : 'border-t border-slate-100 pt-4'}`}>
        <div>
          <div className="text-xs text-slate-500">Target price / unit</div>
          <div className="text-lg font-semibold tabular-nums">{fmtPrice(t.targetPrice)}</div>
          <div className={`mt-0.5 flex items-center gap-1 text-xs ${urgent ? 'font-medium text-red-600' : 'text-slate-500'}`}>
            <Clock size={13} />{left}
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <span className="flex items-center gap-1 text-xs text-slate-500"><Users size={13} />{t.bids} bids</span>
          <button className={t.status === 'Open for Bids' ? 'btn-primary' : 'btn-outline'} onClick={() => onOpen(t)}>
            {t.status === 'Open for Bids' ? 'View and bid' : 'View details'}
          </button>
        </div>
      </div>
    </article>
  );
}
