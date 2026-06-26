import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Atom, ChevronLeft, ChevronRight, CircleHelp, Play } from 'lucide-react';
import { glossary } from './presentationData';
import { AppendixDrawer } from './components/AppendixDrawer';
import { AppendixSlide } from './slides/AppendixSlide';
import { MethodIntroSlide } from './slides/MethodIntroSlide';
import { MethodMathSlide } from './slides/MethodMathSlide';
import { slides } from './slides/slides';
import { TerminologySlide } from './slides/TerminologySlide';
import { TitleSlide } from './slides/TitleSlide';

function initialSlideIndex() {
  const value = new URLSearchParams(window.location.search).get('slide');
  if (!value) return 0;
  const numeric = Number(value);
  if (Number.isInteger(numeric)) return Math.min(Math.max(numeric - 1, 0), slides.length - 1);
  const byId = slides.findIndex((slide) => slide.id === value);
  return byId >= 0 ? byId : 0;
}

export default function App() {
  const [active, setActive] = useState(initialSlideIndex);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedTerm, setSelectedTerm] = useState<string | undefined>();
  const current = slides[active];

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight' || event.key === 'PageDown') setActive((value) => Math.min(value + 1, slides.length - 1));
      if (event.key === 'ArrowLeft' || event.key === 'PageUp') setActive((value) => Math.max(value - 1, 0));
      if (event.key === 'Escape') setDrawerOpen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const activeTerms = useMemo(() => {
    if (current.kind === 'method-intro' || current.kind === 'method-math') return current.method.terms;
    if (current.kind === 'terminology') return ['Protein Target', 'Binding Affinity, Kd, and IC50', 'DTI: Drug-Target Interaction', 'SMILES', 'Morgan Fingerprint', 'Omics Profile', 'Multi-Omics'];
    return Object.keys(glossary);
  }, [current]);

  const openTerm = (term: string) => {
    setSelectedTerm(term);
    setDrawerOpen(true);
  };

  return (
    <div className="appShell">
      <header className="topbar">
        <div className="brand">
          <div className="brandOrb"><Atom size={28} /></div>
          <div>
            <strong>Recommender Systems in Bioinformatics</strong>
          </div>
        </div>
        <nav>
          <a href="https://mamood.ir" target="_blank" rel="noreferrer">mamood.ir</a>
          <button onClick={() => setActive(0)}><Play size={16} /> Start</button>
          <button onClick={() => openTerm(activeTerms[0])}><CircleHelp size={16} /> Appendix</button>
        </nav>
      </header>

      <main className="deck">
        <AnimatePresence mode="wait">
          <motion.section
            key={current.id}
            className="slide"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.22 }}
          >
            {current.kind === 'title' && <TitleSlide />}
            {current.kind === 'terminology' && <TerminologySlide onOpenTerm={openTerm} />}
            {current.kind === 'method-intro' && <MethodIntroSlide method={current.method} onOpenTerm={openTerm} />}
            {current.kind === 'method-math' && <MethodMathSlide method={current.method} onOpenTerm={openTerm} />}
            {current.kind === 'appendix' && <AppendixSlide />}
          </motion.section>
        </AnimatePresence>
      </main>

      <footer className="pager">
        <button disabled={active === 0} onClick={() => setActive((value) => Math.max(0, value - 1))}><ChevronLeft size={18} /> Previous</button>
        <div className="progressArea">
          <div className="progress"><span style={{ width: `${((active + 1) / slides.length) * 100}%` }} /></div>
          <div className="dotRow">
            {slides.map((slide, index) => <button className={index === active ? 'dot active' : 'dot'} key={slide.id} onClick={() => setActive(index)} aria-label={`Go to ${slide.title}`} />)}
          </div>
        </div>
        <span className="counter">{String(active + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}</span>
        <button disabled={active === slides.length - 1} onClick={() => setActive((value) => Math.min(slides.length - 1, value + 1))}>Next <ChevronRight size={18} /></button>
      </footer>

      <AppendixDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} terms={activeTerms} selectedTerm={selectedTerm} onSelectTerm={setSelectedTerm} />
    </div>
  );
}
