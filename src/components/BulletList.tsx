export function BulletList({ items }: { items: string[] }) {
  return <ul className="bullets">{items.map((item) => <li key={item}>{item}</li>)}</ul>;
}
