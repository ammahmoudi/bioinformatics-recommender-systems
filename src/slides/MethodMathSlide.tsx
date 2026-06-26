import { Calculator } from 'lucide-react';
import type { MethodSlide } from '../presentationData';
import { FormulaBlock } from '../components/FormulaBlock';
import { SectionCard } from '../components/SectionCard';
import { SlideHeading } from '../components/SlideHeading';
import { Tools } from '../components/Tools';
import { RichFlow } from '../diagrams/RichFlow';
import { methodAlgorithmNodes, methodIcons } from '../flows/methodFlowNodes';

export function MethodMathSlide({ method, onOpenTerm }: { method: MethodSlide; onOpenTerm: (term: string) => void }) {
  const Icon = methodIcons[method.id] ?? Calculator;
  return (
    <div className="slidePage methodMathPage">
      <SlideHeading icon={Icon} kicker={`${method.number}. ${method.shortTitle} | algorithms and math`} title={`${method.shortTitle}: Flow, Formula, Tools`} summary={method.bio.context || method.summary} onOpenTerm={onOpenTerm} />
      <div className="mathGrid">
        <div className="algorithmFlowRow">
          <SectionCard title={method.movie.chartTitle}>
            <RichFlow nodes={methodAlgorithmNodes(method, 'movie')} />
          </SectionCard>
          <SectionCard title={method.bio.chartTitle}>
            <RichFlow nodes={methodAlgorithmNodes(method, 'bio')} />
          </SectionCard>
        </div>
        <div className="formulaToolRow">
          <SectionCard title="Formulas and symbols">
            <div className="formulaGrid">
              {method.formulas.map((formula) => <FormulaBlock formula={formula} key={formula.title} onOpenTerm={onOpenTerm} />)}
            </div>
          </SectionCard>
          <SectionCard title="Algorithms and tools">
            <Tools tools={method.tools} />
          </SectionCard>
        </div>
      </div>
    </div>
  );
}
