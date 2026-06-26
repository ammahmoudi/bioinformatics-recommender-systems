import { Calculator } from 'lucide-react';
import { BlockMath, InlineMath } from 'react-katex';
import type { FormulaData } from '../presentationData';

export function FormulaBlock({ formula }: { formula: FormulaData }) {
  const dense = (formula.symbols?.length ?? 0) > 4;
  return (
    <div className={dense ? 'formulaCard dense' : 'formulaCard'}>
      <div className="miniHeader"><Calculator size={17} /><h4>{formula.title}</h4></div>
      <BlockMath math={formula.latex} />
      {formula.explanation && <p>{formula.explanation}</p>}
      {formula.symbols && (
        <div className="symbols">
          {formula.symbols.map((row) => (
            <div key={`${formula.title}-${row.symbol}`}>
              <strong><InlineMath math={row.symbol} /></strong>
              <span>{row.meaning}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
