import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EXPERIENCES } from '../../content/profile';
import { cumulativeMonths, formatDuration, formatPeriod, monthsBetween } from '../../shared/duration';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-experience',
  imports: [RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './experience.html',
  styleUrl: './experience.css',
})
export class ExperienceTimeline {
  protected readonly total = formatDuration(cumulativeMonths(EXPERIENCES));
  protected readonly items = EXPERIENCES.map((e) => ({
    ...e,
    period: formatPeriod(e.start, e.end),
    duration: formatDuration(monthsBetween(e.start, e.end)),
  }));
}
