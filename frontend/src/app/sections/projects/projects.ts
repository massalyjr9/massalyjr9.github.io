import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PROJECTS } from '../../content/profile';
import { RevealDirective } from '../../shared/reveal.directive';
import { Gallery } from '../../shared/gallery/gallery';

@Component({
  selector: 'app-projects',
  imports: [RevealDirective, Gallery],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './projects.html',
  styleUrl: './projects.css',
})
export class Projects {
  private readonly visible = PROJECTS.filter((p) => p.visible);
  protected readonly featured = this.visible.filter((p) => p.featured);
  protected readonly others = this.visible.filter((p) => !p.featured);
}
