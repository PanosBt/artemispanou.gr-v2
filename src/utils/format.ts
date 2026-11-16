/** Zero-padded position label, e.g. `formatCount(0, 3)` → "01 / 03". */
export function formatCount(index: number, total: number): string {
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${pad(index + 1)} / ${pad(total)}`;
}
