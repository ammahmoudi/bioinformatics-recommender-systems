import { LinkedText } from './LinkedText';

export function BulletList({ items, onOpenTerm }: { items: string[]; onOpenTerm?: (term: string) => void }) {
  return <ul className="bullets">{items.map((item) => <li key={item}><LinkedText text={item} onOpenTerm={onOpenTerm} /></li>)}</ul>;
}
