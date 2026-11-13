import { Search, LayoutList, LayoutGrid, X } from 'lucide-react';
import { CATEGORIES, STATUSES, BATCH_SIZES } from '../data/tenders.js';

function Select({ label, value, onChange, options }) {
  return (
    <label className="block min-w-[10rem] flex-1">
      <span className="sr-only">{label}</span>
      <select className="field" value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="">{label}</option>
        {options.map((o) => (
          <option key={o.value ?? o} value={o.value ?? o}>{o.label ?? o}</option>
        ))}
      </select>
    </label>
  );
}

export default function FilterBar({ filters, setFilters, view, setView, resultCount }) {
  const set = (k) => (v) => setFilters((f) => ({ ...f, [k]: v }));
  const active = Object.values(filters).some(Boolean);

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4">
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative min-w-[14rem] flex-[2]">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input className="field pl-9" placeholder="Search medicine or tender ID" aria-label="Search tenders" value={filters.q} onChange={(e) => set('q')(e.target.value)} />
        </div>
        <Select label="All categories" value={filters.category} onChange={set('category')} options={CATEGORIES} />
        <Select label="All statuses" value={filters.status} onChange={set('status')} options={STATUSES} />
        <Select label="Any batch size" value={filters.batch} onChange={set('batch')} options={BATCH_SIZES.map((b) => ({ value: b.id, label: b.label }))} />

        <div className="ml-auto flex rounded-md border border-slate-300" role="group" aria-label="View">
          {[['list', LayoutList, 'List view'], ['grid', LayoutGrid, 'Grid view']].map(([id, Icon, label]) => (
            <button key={id} onClick={() => setView(id)} aria-label={label} aria-pressed={view === id} className={`p-2 ${view === id ? 'bg-navy text-white' : 'text-slate-600 hover:bg-slate-50'}`}>
              <Icon size={18} />
            </button>
          ))}
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between text-sm text-slate-500">
        <span>{resultCount} tender{resultCount === 1 ? '' : 's'}</span>
        {active && (
          <button className="flex items-center gap-1 font-medium text-navy hover:underline" onClick={() => setFilters({ q: '', category: '', status: '', batch: '' })}>
            <X size={14} /> Clear filters
          </button>
        )}
      </div>
    </div>
  );
}
