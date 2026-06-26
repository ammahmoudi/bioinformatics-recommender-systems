import { glossary } from '../presentationData';

const aliases: Record<string, string> = {
  DTI: 'DTI: Drug-Target Interaction',
  'drug-target interaction': 'DTI: Drug-Target Interaction',
  target: 'Protein Target',
  protein: 'Protein Target',
  Kd: 'Binding Affinity, Kd, and IC50',
  IC50: 'Binding Affinity, Kd, and IC50',
  affinity: 'Binding Affinity, Kd, and IC50',
  SMILES: 'SMILES',
  'Morgan fingerprint': 'Morgan Fingerprint',
  'Morgan fingerprints': 'Morgan Fingerprint',
  Tanimoto: 'Tanimoto Coefficient',
  'TF-IDF': 'TF-IDF',
  omics: 'Omics Profile',
  'omics profile': 'Omics Profile',
  'RNA-seq': 'RNA-seq',
  'multi-omics': 'Multi-Omics',
  'PPI': 'PPI Network',
  'PPI network': 'PPI Network',
  RWR: 'Random Walk with Restart (RWR)',
  'Random Walk with Restart': 'Random Walk with Restart (RWR)',
  LMF: 'LMF, RLMF, and NRLMF',
  RLMF: 'LMF, RLMF, and NRLMF',
  NRLMF: 'LMF, RLMF, and NRLMF',
  QED: 'QED Score',
  toxicity: 'Toxicity',
  repurposing: 'Drug Repurposing',
  'de novo': 'De Novo Drug Design'
};

const glossaryTerms = Object.keys(glossary).reduce<Record<string, string>>((acc, term) => {
  acc[term] = term;
  return acc;
}, {});

const linkTargets = { ...glossaryTerms, ...aliases };
const escaped = Object.keys(linkTargets)
  .sort((a, b) => b.length - a.length)
  .map((term) => term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
const termPattern = new RegExp(`\\b(${escaped.join('|')})\\b`, 'gi');

export function LinkedText({ text, onOpenTerm }: { text: string; onOpenTerm?: (term: string) => void }) {
  if (!onOpenTerm) return <>{text}</>;
  const parts = text.split(termPattern).filter(Boolean);

  return (
    <>
      {parts.map((part, index) => {
        const target = linkTargets[part] ?? linkTargets[Object.keys(linkTargets).find((key) => key.toLowerCase() === part.toLowerCase()) ?? ''];
        if (!target) return <span key={`${part}-${index}`}>{part}</span>;
        return (
          <button className="inlineAppendixLink" key={`${part}-${index}`} onClick={() => onOpenTerm(target)} title={`Open appendix: ${target}`}>
            {part}
          </button>
        );
      })}
    </>
  );
}
