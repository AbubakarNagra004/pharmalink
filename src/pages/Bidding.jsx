import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Plus, SearchX } from 'lucide-react';
import { initialTenders, BATCH_SIZES } from '../data/tenders.js';
import FilterBar from '../components/FilterBar.jsx';
import TenderCard from '../components/TenderCard.jsx';
import BidModal from '../components/BidModal.jsx';
import PostRequirementModal from '../components/PostRequirementModal.jsx';

export default function Bidding() {
  const [params, setParams] = useSearchParams();
  const [tenders, setTenders] = useState(initialTenders);
  const [filters, setFilters] = useState({ q: params.get('q') || '', category: '', status: '', batch: '' });
  const [view, setView] = useState('list');
  const [selected, setSelected] = useState(null);
  const [showPost, setShowPost] = useState(params.get('post') === '1');
  const [now, setNow] = useState(Date.now());

  // keep countdowns fresh
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 30000);
    return () => clearInterval(id);
  }, []);

  // clear one-shot query params so refresh doesn't reopen the modal
  useEffect(() => {
    if (params.get('post')) setParams({}, { replace: true });
  }, []); // eslint-disable-line

  const visible = useMemo(() => {
    const q = filters.q.trim().toLowerCase();
    const batch = BATCH_SIZES.find((b) => b.id === filters.batch);
    return tenders.filter((t) =>
      (!q || t.medicine.toLowerCase().includes(q) || t.id.toLowerCase().includes(q)) &&
      (!filters.category || t.category === filters.category) &&
      (!filters.status || t.status === filters.status) &&
      (!batch || batch.test(t.quantity))
    );
  }, [tenders, filters]);

  const addTender = (t) => { setTenders((p) => [t, ...p]); setShowPost(false); setFilters({ q: '', category: '', status: '', batch: '' }); };
  const addBid = (id) => setTenders((p) => p.map((t) => (t.id === id ? { ...t, bids: t.bids + 1 } : t)));
  // keep modal in sync with the bid count
  const current = selected && tenders.find((t) => t.id === selected);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Bidding marketplace</h1>
          <p className="mt-1 text-sm text-slate-600">Open procurement tenders from licensed retailers. Manufacturers bid directly.</p>
        </div>
        <button className="btn-primary" onClick={() => setShowPost(true)}><Plus size={16} />Post new requirement</button>
      </div>

      <FilterBar filters={filters} setFilters={setFilters} view={view} setView={setView} resultCount={visible.length} />

      {visible.length === 0 ? (
        <div className="mt-6 rounded-lg border border-dashed border-slate-300 bg-white py-16 text-center">
          <SearchX className="mx-auto text-slate-400" size={32} />
          <p className="mt-3 font-medium">No tenders match these filters</p>
          <p className="text-sm text-slate-500">Clear a filter, or post this requirement yourself.</p>
        </div>
      ) : (
        <div className={`mt-6 ${view === 'grid' ? 'grid gap-4 sm:grid-cols-2 xl:grid-cols-3' : 'space-y-3'}`}>
          {visible.map((t) => (
            <TenderCard key={t.id} tender={t} now={now} view={view} onOpen={(x) => setSelected(x.id)} />
          ))}
        </div>
      )}

      {current && <BidModal tender={current} now={now} onClose={() => setSelected(null)} onSubmit={addBid} />}
      {showPost && <PostRequirementModal onClose={() => setShowPost(false)} onCreate={addTender} />}
    </div>
  );
}
