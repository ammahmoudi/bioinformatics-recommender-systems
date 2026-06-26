import { Binary, Clapperboard, Dna, Eye, Film, Gauge, Layers3, Pill, Sparkles, Star, Target, UserRound } from 'lucide-react';
import { terminology } from '../presentationData';
import type { Icon } from '../types';

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

export function MappingTable() {
  return (
    <div className="mediaMapTable">
      {terminology.table.rows.map(([movie, bio, definition]) => {
        const MovieIcon = termIcons[movie] ?? Sparkles;
        const BioIcon = termIcons[bio] ?? Dna;
        return (
          <article key={movie}>
            <div className="mapCell movie"><MovieIcon size={20} /><span>{movie}</span></div>
            <div className="mapBridge"><span /></div>
            <div className="mapCell bio"><BioIcon size={20} /><span>{bio}</span></div>
            <p>{definition}</p>
          </article>
        );
      })}
    </div>
  );
}
