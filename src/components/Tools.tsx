export function Tools({ tools }: { tools: string[] }) {
  return (
    <div className="toolGrid">
      {tools.map((tool) => <span className="toolChip" key={tool}>{tool}</span>)}
    </div>
  );
}
