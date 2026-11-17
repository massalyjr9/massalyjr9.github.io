import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EXPERIENCES, PROFILE } from '../../content/profile';
import { cumulativeMonths, formatDuration } from '../../shared/duration';
import { HeroSphere } from './hero-sphere';

@Component({
  selector: 'app-hero',
  imports: [HeroSphere],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero {
  protected readonly profile = PROFILE;
  protected readonly experience = formatDuration(cumulativeMonths(EXPERIENCES));
}
