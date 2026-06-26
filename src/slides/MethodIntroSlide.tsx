import { Sparkles } from 'lucide-react';
import type { MethodSlide } from '../presentationData';
import { BulletList } from '../components/BulletList';
import { DataTable } from '../components/DataTable';
import { SectionCard } from '../components/SectionCard';
import { SlideHeading } from '../components/SlideHeading';
import { TermLinks } from '../components/TermLinks';
import { RichFlow } from '../diagrams/RichFlow';
import { methodConcreteNodes, methodIcons } from '../flows/methodFlowNodes';

function concreteDetails(items: string[]) {
  const technicalTerms = /\br_ui\b|latent|vector|TF-IDF|Tanimoto|Random-walk|steady state|\bA\b|self-loop|H is|D is|policy updates|reward can|State can|Action can|GCN|matrix/i;
  const filtered = items.filter((item) => !technicalTerms.test(item)).slice(0, 2);
  return filtered.length > 0 ? filtered : items.slice(0, 1);
}

export function MethodIntroSlide({ method, onOpenTerm }: { method: MethodSlide; onOpenTerm: (term: string) => void }) {
  const Icon = methodIcons[method.id] ?? Sparkles;
  return (
    <div className="slidePage methodIntroPage">
      <SlideHeading icon={Icon} kicker={`${method.number}. ${method.shortTitle} | concrete examples`} title={method.title} summary={method.summary} />
      <TermLinks terms={method.terms} onOpenTerm={onOpenTerm} />
      <div className="introGrid">
        <SectionCard title="Movie concrete example">
          <p className="bodyText">{method.movie.intuition}</p>
          <RichFlow nodes={methodConcreteNodes(method, 'movie')} />
          {method.movie.table && <DataTable table={method.movie.table} />}
        </SectionCard>
        <SectionCard title="Biology concrete example">
          <p className="bodyText">{method.bio.intuition}</p>
          <RichFlow nodes={methodConcreteNodes(method, 'bio')} />
          {method.bio.table && <DataTable table={method.bio.table} />}
        </SectionCard>
        <SectionCard title="Example takeaway" compact>
          <div className="twoColumnBullets">
            <BulletList items={concreteDetails(method.movie.details)} />
            <BulletList items={concreteDetails(method.bio.details)} />
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
