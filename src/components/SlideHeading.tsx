import type { Icon } from '../types';
import { LinkedText } from './LinkedText';

export function SlideHeading({ icon: Icon, kicker, title, summary, onOpenTerm }: { icon: Icon; kicker: string; title: string; summary: string; onOpenTerm?: (term: string) => void }) {
  return (
    <div className="slideTitleRow">
      <div className="slideIcon"><Icon size={26} /></div>
      <div>
        <p className="kicker">{kicker}</p>
        <h2>{title}</h2>
        <p><LinkedText text={summary} onOpenTerm={onOpenTerm} /></p>
      </div>
    </div>
  );
}
