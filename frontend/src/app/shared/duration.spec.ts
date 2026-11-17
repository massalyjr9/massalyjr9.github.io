import { EXPERIENCES } from '../content/profile';
import { cumulativeMonths, formatDuration, formatPeriod, monthsBetween } from './duration';

describe('duration', () => {
  it('compte les mois bornes incluses', () => {
    expect(monthsBetween('2025-01', '2025-08')).toBe(8);
    expect(monthsBetween('2023-09', '2024-09')).toBe(13);
  });

  it('ne compte pas deux fois les périodes qui se chevauchent', () => {
    expect(cumulativeMonths([
      { start: '2024-01', end: '2024-06' },
      { start: '2024-04', end: '2024-09' },
    ])).toBe(9);
  });

  it('formate une durée en français', () => {
    expect(formatDuration(31)).toBe('2 ans et 7 mois');
    expect(formatDuration(12)).toBe('1 an');
    expect(formatDuration(4)).toBe('4 mois');
  });

  it('formate une période', () => {
    expect(formatPeriod('2023-09', '2024-09')).toBe('sept. 2023 – sept. 2024');
    expect(formatPeriod('2025-01', '2025-08')).toBe('janv. – août 2025');
  });

  it("calcule l'expérience affichée sur le site à partir des missions", () => {
    expect(formatDuration(cumulativeMonths(EXPERIENCES))).toBe('2 ans et 7 mois');
  });
});
