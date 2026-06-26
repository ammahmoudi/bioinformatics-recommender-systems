import { CircleHelp } from 'lucide-react';
import { glossary } from '../presentationData';
import { SlideHeading } from '../components/SlideHeading';

export function AppendixSlide() {
  return (
    <div className="slidePage appendixPage">
      <SlideHeading icon={CircleHelp} kicker="Appendix" title="Simple Biology and Math Glossary" summary="All glossary terms used by the method pages, synced to the Markdown appendix." />
      <div className="glossaryGrid">
        {Object.entries(glossary).map(([term, body]) => (
          <article className="glossaryCard" key={term}>
            <div className="miniHeader"><CircleHelp size={16} /><h3>{term}</h3></div>
            <p>{body.definition}</p>
            {body.example && <p className="appendixExample">{body.example}</p>}
          </article>
        ))}
      </div>
    </div>
  );
}
