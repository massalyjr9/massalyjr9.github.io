import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EDUCATION, LANGUAGES, SKILL_TIERS, WAYS_OF_WORKING } from '../../content/profile';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-skills',
  imports: [RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './skills.html',
  styleUrl: './skills.css',
})
export class Skills {
  protected readonly tiers = SKILL_TIERS;
  protected readonly ways = WAYS_OF_WORKING;
  protected readonly education = EDUCATION;
  protected readonly languages = LANGUAGES;
}
