import { MappingDiagram } from '../diagrams/MappingDiagram';
import { Tools } from '../components/Tools';

export function TitleSlide() {
  return (
    <div className="titleSlide slidePage">
      <div className="titleCopy">
        <p className="kicker">From E-Commerce to Bioinformatics</p>
        <h1>Advanced Recommender System Architectures</h1>
        <p>Prepared by Amirhossein Mahmoudi, Sharif University of Technology. A synchronized Vite presentation with custom rich diagrams, KaTeX math, appendix drawers, algorithm chips, and method-by-method pagination.</p>
        <div className="titleChips">
          <span>Concrete examples first</span>
          <span>No raw Mermaid charts</span>
          <span>Rendered math</span>
          <span>Synced document data</span>
        </div>
      </div>
      <div className="heroPanel">
        <MappingDiagram domain="movie" />
        <MappingDiagram domain="bio" />
        <Tools tools={['CF', 'CBF', 'RWR', 'Autoencoder', 'GNN', 'RL']} />
      </div>
    </div>
  );
}
