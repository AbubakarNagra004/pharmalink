import { useState } from 'react';
import { Check } from 'lucide-react';
import Modal from './Modal.jsx';
import { CATEGORIES, CERTIFICATIONS } from '../data/tenders.js';

const empty = { medicine: '', category: 'Tablets', dosage: '', quantity: '', unit: 'units', targetPrice: '', location: '', timeline: '14', closesIn: '7', certs: ['WHO-GMP'] };
const steps = ['Medicine', 'Delivery', 'Certifications'];

export default function PostRequirementModal({ onClose, onCreate }) {
  const [step, setStep] = useState(0);
  const [f, setF] = useState(empty);
  const [errors, setErrors] = useState({});
  const set = (k) => (e) => setF((p) => ({ ...p, [k]: e.target.value }));

  const validate = () => {
    const e = {};
    if (step === 0) {
      if (!f.medicine.trim()) e.medicine = 'Enter the medicine name.';
      if (!(Number(f.quantity) > 0)) e.quantity = 'Enter a quantity greater than 0.';
      if (!(Number(f.targetPrice) > 0)) e.targetPrice = 'Enter a target price per unit.';
    }
    if (step === 1 && !f.location.trim()) e.location = 'Enter a delivery city.';
    if (step === 2 && f.certs.length === 0) e.certs = 'Select at least one certification.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => validate() && setStep((s) => s + 1);
  const submit = () => {
    if (!validate()) return;
    onCreate({
      id: `T-${1049 + Math.floor(Math.random() * 900)}`,
      medicine: f.medicine.trim(), category: f.category, quantity: Number(f.quantity), unit: f.unit,
      dosage: f.dosage || '-', targetPrice: Number(f.targetPrice), expiry: 'Min. 24 months shelf life',
      location: f.location.trim(), deadline: new Date(Date.now() + Number(f.closesIn) * 86400000).toISOString(),
      status: 'Pending Review', bids: 0, buyer: 'Your organisation', certs: f.certs,
    });
  };

  const toggleCert = (c) => setF((p) => ({ ...p, certs: p.certs.includes(c) ? p.certs.filter((x) => x !== c) : [...p.certs, c] }));
  const Err = ({ k }) => (errors[k] ? <p className="mt-1 text-xs text-red-600">{errors[k]}</p> : null);

  return (
    <Modal title="Post new requirement" onClose={onClose}>
      <ol className="flex border-b border-slate-200 px-5 py-3 text-sm">
        {steps.map((s, i) => (
          <li key={s} className={`flex flex-1 items-center gap-2 ${i === step ? 'font-semibold text-navy' : 'text-slate-400'}`}>
            <span className={`grid h-5 w-5 place-items-center rounded-full text-xs ${i < step ? 'bg-verified text-white' : i === step ? 'bg-navy text-white' : 'bg-slate-200'}`}>
              {i < step ? <Check size={12} /> : i + 1}
            </span>
            {s}
          </li>
        ))}
      </ol>

      <div className="space-y-4 p-5">
        {step === 0 && (
          <>
            <div><label className="label" htmlFor="medicine">Medicine name</label><input id="medicine" className="field" value={f.medicine} onChange={set('medicine')} placeholder="e.g. Amoxicillin 500mg Capsules" /><Err k="medicine" /></div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div><label className="label" htmlFor="cat">Category</label><select id="cat" className="field" value={f.category} onChange={set('category')}>{CATEGORIES.map((c) => <option key={c}>{c}</option>)}</select></div>
              <div><label className="label" htmlFor="dose">Dosage / pack size</label><input id="dose" className="field" value={f.dosage} onChange={set('dosage')} placeholder="500 mg, strip of 10" /></div>
              <div><label className="label" htmlFor="qty">Quantity</label><input id="qty" type="number" min="1" className="field" value={f.quantity} onChange={set('quantity')} /><Err k="quantity" /></div>
              <div><label className="label" htmlFor="unit">Unit</label><select id="unit" className="field" value={f.unit} onChange={set('unit')}>{['units', 'tablets', 'capsules', 'vials', 'boxes', 'sachets'].map((u) => <option key={u}>{u}</option>)}</select></div>
            </div>
            <div><label className="label" htmlFor="tp">Target price per unit (USD)</label><input id="tp" type="number" min="0" step="0.001" className="field" value={f.targetPrice} onChange={set('targetPrice')} /><Err k="targetPrice" /></div>
          </>
        )}
        {step === 1 && (
          <>
            <div><label className="label" htmlFor="loc">Delivery location</label><input id="loc" className="field" value={f.location} onChange={set('location')} placeholder="City, country" /><Err k="location" /></div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div><label className="label" htmlFor="tl">Preferred delivery within</label><select id="tl" className="field" value={f.timeline} onChange={set('timeline')}>{[7, 14, 21, 30, 45].map((d) => <option key={d} value={d}>{d} days of award</option>)}</select></div>
              <div><label className="label" htmlFor="ci">Bidding closes in</label><select id="ci" className="field" value={f.closesIn} onChange={set('closesIn')}>{[3, 5, 7, 10, 14].map((d) => <option key={d} value={d}>{d} days</option>)}</select></div>
            </div>
          </>
        )}
        {step === 2 && (
          <fieldset>
            <legend className="label">Required manufacturer certifications</legend>
            <div className="grid gap-2 sm:grid-cols-2">
              {CERTIFICATIONS.map((c) => (
                <label key={c} className={`flex cursor-pointer items-center gap-2 rounded-md border px-3 py-2.5 text-sm ${f.certs.includes(c) ? 'border-verified bg-verified-light/50' : 'border-slate-300'}`}>
                  <input type="checkbox" className="accent-emerald-600" checked={f.certs.includes(c)} onChange={() => toggleCert(c)} />{c}
                </label>
              ))}
            </div>
            <Err k="certs" />
            <p className="mt-4 rounded-md bg-slate-50 p-3 text-sm text-slate-600">Our team reviews new tenders before they open for bids, usually within one business day.</p>
          </fieldset>
        )}
      </div>

      <div className="flex justify-between border-t border-slate-200 px-5 py-4">
        <button className="btn-outline" onClick={() => (step === 0 ? onClose() : setStep(step - 1))}>{step === 0 ? 'Cancel' : 'Back'}</button>
        {step < 2 ? <button className="btn-primary" onClick={next}>Continue</button> : <button className="btn-primary" onClick={submit}>Submit for review</button>}
      </div>
    </Modal>
  );
}
