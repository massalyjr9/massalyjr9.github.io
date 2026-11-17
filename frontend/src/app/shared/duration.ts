const MONTHS = ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'];

function parse(yearMonth: string): { year: number; month: number } {
  const [year, month] = yearMonth.split('-').map(Number);
  return { year, month };
}

/** Nombre de mois entre deux mois AAAA-MM, bornes incluses. */
export function monthsBetween(start: string, end: string): number {
  const a = parse(start);
  const b = parse(end);
  return (b.year - a.year) * 12 + (b.month - a.month) + 1;
}

/** Total cumulé, sans double comptage si des périodes se chevauchent. */
export function cumulativeMonths(periods: { start: string; end: string }[]): number {
  const months = new Set<string>();
  for (const { start, end } of periods) {
    const { year, month } = parse(start);
    for (let i = 0; i < monthsBetween(start, end); i++) {
      const m = month - 1 + i;
      months.add(`${year + Math.floor(m / 12)}-${m % 12}`);
    }
  }
  return months.size;
}

export function formatDuration(months: number): string {
  const years = Math.floor(months / 12);
  const rest = months % 12;
  const y = years === 0 ? '' : years === 1 ? '1 an' : `${years} ans`;
  const m = rest === 0 ? '' : `${rest} mois`;
  return [y, m].filter(Boolean).join(' et ');
}

export function formatPeriod(start: string, end: string): string {
  const a = parse(start);
  const b = parse(end);
  const from = `${MONTHS[a.month - 1]} ${a.year}`;
  const to = `${MONTHS[b.month - 1]} ${b.year}`;
  return a.year === b.year ? `${MONTHS[a.month - 1]} - ${to}` : `${from} - ${to}`;
}
