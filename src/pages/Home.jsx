import { Link } from 'react-router-dom';
import { ClipboardList, Gavel, Truck } from 'lucide-react';
import Hero from '../components/Hero.jsx';

const steps = [
  { icon: ClipboardList, title: 'Retailers post a tender', text: 'Specify medicine, quantity, certifications and delivery window.' },
  { icon: Gavel, title: 'Manufacturers bid', text: 'Verified suppliers submit unit price, lead time and batch documents.' },
  { icon: Truck, title: 'Award and fulfil', text: 'Compare quotes side by side, award the tender, track delivery.' },
];

export default function Home() {
  return (
    <>
      <Hero />
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-semibold">How a tender works</h2>
        <div className="mt-8 grid gap-8 md:grid-cols-3">
          {steps.map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex gap-4">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-navy text-white"><Icon size={20} /></span>
              <div>
                <h3 className="font-semibold">{title}</h3>
                <p className="mt-1 text-sm text-slate-600">{text}</p>
              </div>
            </div>
          ))}
        </div>
        <Link to="/bidding" className="btn-primary mt-10">Browse open tenders</Link>
      </section>
    </>
  );
}
