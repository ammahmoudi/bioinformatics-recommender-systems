import { BookOpen } from 'lucide-react';
import { terminology } from '../presentationData';
import { SectionCard } from '../components/SectionCard';
import { SlideHeading } from '../components/SlideHeading';
import { MappingDiagram } from '../diagrams/MappingDiagram';
import { MappingTable } from '../diagrams/MappingTable';

export function TerminologySlide({ onOpenTerm }: { onOpenTerm: (term: string) => void }) {
  return (
    <div className="slidePage terminologyPage">
      <SlideHeading icon={BookOpen} kicker="1. General terminology mapping" title={terminology.title} summary={terminology.summary} onOpenTerm={onOpenTerm} />
      <div className="terminologyGrid">
        <SectionCard title="Mapping table">
          <MappingTable onOpenTerm={onOpenTerm} />
        </SectionCard>
        <SectionCard title="Movie recommendation objects">
          <MappingDiagram domain="movie" />
        </SectionCard>
        <SectionCard title="Bioinformatics translation">
          <MappingDiagram domain="bio" />
        </SectionCard>
      </div>
    </div>
  );
}
