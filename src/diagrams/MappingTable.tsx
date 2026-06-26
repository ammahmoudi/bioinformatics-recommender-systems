import { Binary, Clapperboard, Dna, Eye, Film, Gauge, Layers3, Pill, Sparkles, Star, Target, UserRound } from 'lucide-react';
import { terminology } from '../presentationData';
import type { Icon } from '../types';
import { LinkedText } from '../components/LinkedText';

const termIcons: Record<string, Icon> = {
  User: UserRound,
  'Drug, Disease, or Patient': Pill,
  'Item (Movie)': Film,
  'Target Protein, Gene, or Microbe': Target,
  'Rating (1-5 Stars)': Star,
  'Binding Affinity (Kd/IC50)': Gauge,
  'Movie Genre / Actor': Clapperboard,
  'SMILES, Morgan Fingerprint': Binary,
  'User History': Eye,
  'Multi-omics profile': Layers3
};

const bioTermTargets: Record<string, string> = {
  'Target Protein, Gene, or Microbe': 'Protein Target',
  'Binding Affinity (Kd/IC50)': 'Binding Affinity, Kd, and IC50',
  'SMILES, Morgan Fingerprint': 'Morgan Fingerprint',
  'Multi-omics profile': 'Multi-Omics'
};

export function MappingTable({ onOpenTerm }: { onOpenTerm?: (term: string) => void }) {
  return (
    <div className="mediaMapTable">
      {terminology.table.rows.map(([movie, bio, definition]) => {
        const MovieIcon = termIcons[movie] ?? Sparkles;
        const BioIcon = termIcons[bio] ?? Dna;
        return (
          <article key={movie}>
            <div className="mapCell movie"><MovieIcon size={20} /><span>{movie}</span></div>
            <div className="mapBridge"><span /></div>
            <button className="mapCell bio" onClick={() => bioTermTargets[bio] && onOpenTerm?.(bioTermTargets[bio])} disabled={!bioTermTargets[bio]}>
              <BioIcon size={20} /><span>{bio}</span>
            </button>
            <p><LinkedText text={definition} onOpenTerm={onOpenTerm} /></p>
          </article>
        );
      })}
    </div>
  );
}
