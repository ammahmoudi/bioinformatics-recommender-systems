import { BookOpen } from 'lucide-react';
import { terminology } from '../presentationData';
import { SectionCard } from '../components/SectionCard';
import { SlideHeading } from '../components/SlideHeading';
import { TermLinks } from '../components/TermLinks';
import { MappingDiagram } from '../diagrams/MappingDiagram';
import { MappingTable } from '../diagrams/MappingTable';

const terminologyTerms = ['Protein Target', 'Binding Affinity, Kd, and IC50', 'DTI: Drug-Target Interaction', 'SMILES', 'Morgan Fingerprint', 'Omics Profile', 'Multi-Omics'];

export function TerminologySlide({ onOpenTerm }: { onOpenTerm: (term: string) => void }) {
  return (
    <div className="slidePage terminologyPage">
      <SlideHeading icon={BookOpen} kicker="1. General terminology mapping" title={terminology.title} summary={terminology.summary} />
      <TermLinks terms={terminologyTerms} onOpenTerm={onOpenTerm} />
      <div className="terminologyGrid">
        <SectionCard title="Mapping table">
          <MappingTable />
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
