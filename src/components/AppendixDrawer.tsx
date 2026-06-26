import { useEffect } from 'react';
import { BlockMath } from 'react-katex';
import { glossary, type GlossaryEntry } from '../presentationData';
import type { FlowVisual } from '../types';
import { MiniMatrix, MiniMolecule, MiniOmics, MiniProtein, MiniScore } from '../diagrams/MiniVisuals';

type AppendixDrawerProps = {
  open: boolean;
  onClose: () => void;
  terms: string[];
  selectedTerm?: string;
  onSelectTerm: (term: string) => void;
};

function isMoleculeVisual(visual?: FlowVisual) {
  return visual === 'drug-a' || visual === 'drug-b' || visual === 'drug-new' || visual === 'molecular-graph';
}

function isOmicsVisual(visual?: FlowVisual) {
  return visual === 'rna-noisy' || visual === 'denoise' || visual === 'omics-profile' || visual === 'multi-omics';
}

function isProteinVisual(visual?: FlowVisual) {
  return visual === 'protein-target' || visual === 'ppi-network';
}

function isScoreVisual(visual?: FlowVisual) {
  return visual === 'binding-score' || visual === 'toxicity-score' || visual === 'qed-score' || visual === 'watch-reward';
}

function AppendixVisual({ visual }: { visual?: FlowVisual }) {
  if (!visual) return null;
  return (
    <div className="appendixVisual">
      {isMoleculeVisual(visual) && <MiniMolecule variant={visual} />}
      {isOmicsVisual(visual) && <MiniOmics variant={visual} />}
      {isProteinVisual(visual) && <MiniProtein variant={visual} />}
      {isScoreVisual(visual) && <MiniScore variant={visual} />}
      {!isMoleculeVisual(visual) && !isOmicsVisual(visual) && !isProteinVisual(visual) && !isScoreVisual(visual) && <MiniMatrix variant={visual} />}
    </div>
  );
}

function GlossaryBody({ entry }: { entry?: GlossaryEntry }) {
  if (!entry) return <p>Definition is not available in the appendix data.</p>;
  return (
    <>
      <AppendixVisual visual={entry.visual} />
      <p>{entry.definition}</p>
      {entry.example && <p className="appendixExample"><strong>Example:</strong> {entry.example}</p>}
      {entry.formula && (
        <div className="appendixFormula">
          <BlockMath math={entry.formula} />
        </div>
      )}
      {entry.table && (
        <table className="appendixTable">
          <thead><tr>{entry.table.headers.map((header) => <th key={header}>{header}</th>)}</tr></thead>
          <tbody>
            {entry.table.rows.map((row, rowIndex) => (
              <tr key={rowIndex}>{row.map((cell, cellIndex) => <td key={`${rowIndex}-${cellIndex}`}>{cell}</td>)}</tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}

export function AppendixDrawer({ open, onClose, terms, selectedTerm, onSelectTerm }: AppendixDrawerProps) {
  const selected = selectedTerm ?? terms[0];
  const visibleTerms = Array.from(new Set([selected, ...terms].filter(Boolean)));

  useEffect(() => {
    if (!selectedTerm && terms[0]) onSelectTerm(terms[0]);
  }, [onSelectTerm, selectedTerm, terms]);

  return (
    <aside className={open ? 'drawer open' : 'drawer'}>
      <div className="drawerHeader">
        <div>
          <p className="kicker">Appendix for this page</p>
          <h2>Definitions</h2>
        </div>
        <button onClick={onClose}>Close</button>
      </div>
      <div className="termChipRow">
        {visibleTerms.map((term) => (
          <button className={term === selected ? 'active' : ''} onClick={() => onSelectTerm(term)} key={term}>
            {term}
          </button>
        ))}
      </div>
      <div className="drawerBody">
        <h3>{selected}</h3>
        <GlossaryBody entry={glossary[selected]} />
      </div>
    </aside>
  );
}
