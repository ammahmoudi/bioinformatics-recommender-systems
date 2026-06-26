import type { TableData } from '../presentationData';

export function DataTable({ table }: { table: TableData }) {
  return (
    <div className="tableCard">
      <h4>{table.title}</h4>
      <table>
        <thead>
          <tr>{table.headers.map((header) => <th key={header}>{header}</th>)}</tr>
        </thead>
        <tbody>
          {table.rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={`${rowIndex}-${cellIndex}`} className={cell === '?' ? 'missing' : ''}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
