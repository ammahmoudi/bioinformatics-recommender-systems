import type { Icon } from '../types';

export function SlideHeading({ icon: Icon, kicker, title, summary }: { icon: Icon; kicker: string; title: string; summary: string }) {
  return (
    <div className="slideTitleRow">
      <div className="slideIcon"><Icon size={26} /></div>
      <div>
        <p className="kicker">{kicker}</p>
        <h2>{title}</h2>
        <p>{summary}</p>
      </div>
    </div>
  );
}
