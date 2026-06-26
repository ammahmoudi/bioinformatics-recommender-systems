import { CircleHelp } from 'lucide-react';

export function TermLinks({ terms, onOpenTerm }: { terms: string[]; onOpenTerm: (term: string) => void }) {
  return (
    <div className="inlineTermLinks" aria-label="Appendix links">
      {terms.map((term) => (
        <button key={term} onClick={() => onOpenTerm(term)} title={`Open appendix: ${term}`}>
          <CircleHelp size={13} />
          {term}
        </button>
      ))}
    </div>
  );
}
