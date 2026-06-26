import type { ReactNode } from 'react';

export function SectionCard({ title, children, compact = false }: { title: string; children: ReactNode; compact?: boolean }) {
  return (
    <section className={compact ? 'sectionCard compact' : 'sectionCard'}>
      <h3>{title}</h3>
      <div className="sectionCardBody">{children}</div>
    </section>
  );
}
