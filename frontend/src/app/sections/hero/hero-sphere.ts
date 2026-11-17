import { ChangeDetectionStrategy, Component, DestroyRef, ElementRef, afterNextRender, inject, viewChild } from '@angular/core';

/**
 * Sphère filaire décorative (Three.js), chargée à la demande côté navigateur.
 * Désactivée si l'utilisateur préfère réduire les animations ; mise en pause hors écran.
 */
@Component({
  selector: 'app-hero-sphere',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<canvas #canvas aria-hidden="true"></canvas>`,
  styles: `
    :host { position: absolute; inset: 0; z-index: 0; pointer-events: none; }
    canvas { width: 100%; height: 100%; display: block; opacity: 0; transition: opacity 1.6s ease; }
    canvas.ready { opacity: 0.7; }
  `,
})
export class HeroSphere {
  private readonly canvas = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(async () => {
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const canvas = this.canvas().nativeElement;
      const { startSphere } = await import('./sphere-scene');
      const stop = startSphere(canvas);
      if (!stop) return; // pas de WebGL : le site reste complet sans la sphère
      canvas.classList.add('ready');
      this.destroyRef.onDestroy(stop);
    });
  }
}
