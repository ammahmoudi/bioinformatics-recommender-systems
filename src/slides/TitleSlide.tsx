import { MappingDiagram } from '../diagrams/MappingDiagram';
import { Tools } from '../components/Tools';

export function TitleSlide() {
  return (
    <div className="titleSlide slidePage">
      <div className="titleCopy">
        <p className="kicker">From E-Commerce to Bioinformatics</p>
        <h1>Advanced Recommender System Architectures</h1>
        <p>By Amirhossein Mahmoudi.</p>
      </div>
      <div className="heroPanel">
        <MappingDiagram domain="movie" />
        <MappingDiagram domain="bio" />
        <Tools tools={['CF', 'CBF', 'RWR', 'Autoencoder', 'GNN', 'RL']} />
      </div>
    </div>
  );
}
