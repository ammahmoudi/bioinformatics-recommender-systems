import { Calculator } from 'lucide-react';
import { BlockMath, InlineMath } from 'react-katex';
import type { FormulaData } from '../presentationData';
import { LinkedText } from './LinkedText';

export function FormulaBlock({ formula, onOpenTerm }: { formula: FormulaData; onOpenTerm?: (term: string) => void }) {
  const dense = (formula.symbols?.length ?? 0) > 4;
  return (
    <div className={dense ? 'formulaCard dense' : 'formulaCard'}>
      <div className="miniHeader"><Calculator size={17} /><h4>{formula.title}</h4></div>
      <BlockMath math={formula.latex} />
      {formula.explanation && <p><LinkedText text={formula.explanation} onOpenTerm={onOpenTerm} /></p>}
      {formula.symbols && (
        <div className="symbols">
          {formula.symbols.map((row) => (
            <div key={`${formula.title}-${row.symbol}`}>
              <strong><InlineMath math={row.symbol} /></strong>
              <span><LinkedText text={row.meaning} onOpenTerm={onOpenTerm} /></span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
