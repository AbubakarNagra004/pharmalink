import { useState } from 'react';
import { ShieldCheck, Upload, CheckCircle2, Users, Clock } from 'lucide-react';
import Modal from './Modal.jsx';
import { timeLeft, fmtPrice } from './TenderCard.jsx';

const guidelines = [
  'Quote only batches that meet the stated shelf life at dispatch.',
  'Attach a Certificate of Analysis and your valid manufacturing licence.',
  'Quoted price is final: all duties and freight to the delivery location included.',
  'Quotes are binding for 30 days after the bidding window closes.',
];

function Row({ k, v }) {
  return <div className="flex justify-between gap-4 py-2 text-sm"><dt className="text-slate-500">{k}</dt><dd className="text-right font-medium">{v}</dd></div>;
}

export default function BidModal({ tender: t, now, onClose, onSubmit }) {
  const open = t.status === 'Open for Bids';
  const [unitPrice, setUnitPrice] = useState('');
  const [lead, setLead] = useState('14');
  const [file, setFile] = useState(null);
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);

  const total = Number(unitPrice) > 0 ? Number(unitPrice) * t.quantity : 0;
  const diff = Number(unitPrice) > 0 ? ((Number(unitPrice) - t.targetPrice) / t.targetPrice) * 100 : null;

  const submit = (e) => {
    e.preventDefault();
    if (!(Number(unitPrice) > 0)) return setError('Enter your price per unit.');
    if (!agree) return setError('Confirm you meet the compliance guidelines.');
    setError('');
    onSubmit(t.id);
    setDone(true);
  };

  return (
    <Modal title={`${t.medicine}`} onClose={onClose} wide>
      <div className="grid gap-0 md:grid-cols-5">
        {/* Tender details */}
        <div className="border-b border-slate-200 p-5 md:col-span-2 md:border-b-0 md:border-r">
          <div className="flex items-center gap-3 text-sm text-slate-500">
            <span>{t.id}</span>
            <span className="flex items-center gap-1"><Users size={14} />{t.bids} bids</span>
            <span className="flex items-center gap-1"><Clock size={14} />{timeLeft(t.deadline, now)}</span>
          </div>
          <dl className="mt-3 divide-y divide-slate-100">
            <Row k="Buyer" v={t.buyer} />
            <Row k="Category" v={t.category} />
            <Row k="Quantity" v={`${t.quantity.toLocaleString()} ${t.unit}`} />
            <Row k="Dosage" v={t.dosage} />
            <Row k="Target price" v={`${fmtPrice(t.targetPrice)} / unit`} />
            <Row k="Shelf life" v={t.expiry} />
            <Row k="Delivery to" v={t.location} />
          </dl>
          <div className="mt-3">
            <div className="text-sm text-slate-500">Required certifications</div>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {t.certs.map((c) => <span key={c} className="flex items-center gap-1 rounded bg-verified-light px-2 py-0.5 text-xs font-medium text-verified-dark"><ShieldCheck size={12} />{c}</span>)}
            </div>
          </div>
          <div className="mt-5 rounded-md bg-slate-50 p-3">
            <h3 className="text-sm font-semibold">Supplier compliance guidelines</h3>
            <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-slate-600">{guidelines.map((g) => <li key={g}>{g}</li>)}</ul>
          </div>
        </div>

        {/* Quote form */}
        <div className="p-5 md:col-span-3">
          {done ? (
            <div className="py-10 text-center">
              <CheckCircle2 className="mx-auto text-verified" size={44} />
              <h3 className="mt-3 text-lg font-semibold">Quote submitted</h3>
              <p className="mx-auto mt-1 max-w-sm text-sm text-slate-600">The buyer will see your quote when bidding closes. You can edit it until then from your dashboard.</p>
              <button className="btn-primary mt-6" onClick={onClose}>Back to tenders</button>
            </div>
          ) : !open ? (
            <p className="rounded-md bg-slate-50 p-4 text-sm text-slate-600">This tender is {t.status.toLowerCase()} and is not accepting quotes.</p>
          ) : (
            <form onSubmit={submit} className="space-y-4" noValidate>
              <h3 className="font-semibold">Submit manufacturer quote</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="label" htmlFor="up">Unit price (USD)</label>
                  <input id="up" type="number" min="0" step="0.001" className="field" value={unitPrice} onChange={(e) => setUnitPrice(e.target.value)} />
                  {diff !== null && <p className={`mt-1 text-xs ${diff <= 0 ? 'text-verified-dark' : 'text-slate-500'}`}>{Math.abs(diff).toFixed(1)}% {diff <= 0 ? 'below' : 'above'} target</p>}
                </div>
                <div>
                  <label className="label" htmlFor="tq">Total quote (USD)</label>
                  <input id="tq" readOnly className="field bg-slate-50 tabular-nums" value={total ? total.toLocaleString(undefined, { maximumFractionDigits: 2 }) : ''} placeholder="Calculated" />
                </div>
              </div>
              <div>
                <label className="label" htmlFor="lt">Estimated delivery lead time</label>
                <select id="lt" className="field" value={lead} onChange={(e) => setLead(e.target.value)}>
                  {[7, 10, 14, 21, 30, 45].map((d) => <option key={d} value={d}>{d} days from award</option>)}
                </select>
              </div>
              <div>
                <span className="label">Batch documentation</span>
                <label className="flex cursor-pointer items-center gap-3 rounded-md border border-dashed border-slate-300 p-4 text-sm text-slate-600 hover:bg-slate-50">
                  <Upload size={18} />
                  <span>{file ? file.name : 'Attach Certificate of Analysis and licence (PDF)'}</span>
                  <input type="file" accept=".pdf" className="sr-only" onChange={(e) => setFile(e.target.files[0] || null)} />
                </label>
                <p className="mt-1 text-xs text-slate-500">Upload is a placeholder. Connect your storage endpoint to enable it.</p>
              </div>
              <label className="flex items-start gap-2 text-sm text-slate-700">
                <input type="checkbox" className="mt-0.5 accent-emerald-600" checked={agree} onChange={(e) => setAgree(e.target.checked)} />
                I confirm this quote meets the compliance guidelines and required certifications.
              </label>
              {error && <p role="alert" className="text-sm text-red-600">{error}</p>}
              <button className="btn-primary w-full">Submit quote</button>
            </form>
          )}
        </div>
      </div>
    </Modal>
  );
}
