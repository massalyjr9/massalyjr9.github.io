import {
  BufferAttribute,
  BufferGeometry,
  Clock,
  Group,
  IcosahedronGeometry,
  LineBasicMaterial,
  LineSegments,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Points,
  PointsMaterial,
  Scene,
  WebGLRenderer,
  WireframeGeometry,
} from 'three';

/**
 * Dessine la sphère filaire dans le canvas. Imports nommés pour que le bundler ne garde que l'utile de Three.js.
 * @returns une fonction de nettoyage, ou `null` si WebGL n'est pas disponible.
 */
export function startSphere(canvas: HTMLCanvasElement): (() => void) | null {
  let renderer: WebGLRenderer;
  try {
    renderer = new WebGLRenderer({ canvas, alpha: true, antialias: true });
  } catch {
    return null;
  }
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));

  const scene = new Scene();
  const camera = new PerspectiveCamera(45, 1, 0.1, 100);
  camera.position.z = 5;

  const group = new Group();
  const wire = new LineSegments(
    new WireframeGeometry(new IcosahedronGeometry(1.4, 6)),
    new LineBasicMaterial({ color: 0xc8a55c, transparent: true, opacity: 0.35 }),
  );
  const inner = new Mesh(
    new IcosahedronGeometry(1.36, 4),
    new MeshBasicMaterial({ color: 0x1a1815, transparent: true, opacity: 0.9 }),
  );
  const dustPositions = new Float32Array(400 * 3);
  for (let i = 0; i < 400; i++) {
    const r = 2.2 + Math.random() * 4;
    const t = Math.random() * Math.PI * 2;
    const p = Math.acos(2 * Math.random() - 1);
    dustPositions.set([r * Math.sin(p) * Math.cos(t), r * Math.sin(p) * Math.sin(t), r * Math.cos(p)], i * 3);
  }
  const dustGeometry = new BufferGeometry();
  dustGeometry.setAttribute('position', new BufferAttribute(dustPositions, 3));
  const dust = new Points(
    dustGeometry,
    new PointsMaterial({ color: 0xd9bf85, size: 0.012, transparent: true, opacity: 0.5 }),
  );
  group.add(inner, wire, dust);
  scene.add(group);

  const resize = () => {
    const { clientWidth: w, clientHeight: h } = canvas;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    // À gauche sur grand écran (le portrait est à droite), centrée et plus petite sur mobile
    const wide = w > 900;
    group.position.x = wide ? -1.1 : 0;
    group.scale.setScalar(wide ? 1 : 0.8);
  };
  resize();
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(canvas);

  let pointerX = 0;
  const onPointer = (e: PointerEvent) => (pointerX = (e.clientX / innerWidth - 0.5) * 0.6);
  addEventListener('pointermove', onPointer, { passive: true });

  let visible = true;
  const visibility = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting));
  visibility.observe(canvas);

  const clock = new Clock();
  let frame = 0;
  const animate = () => {
    frame = requestAnimationFrame(animate);
    if (!visible) return;
    const t = clock.getElapsedTime();
    const breathe = 1 + Math.sin(t * 0.6) * 0.025;
    inner.scale.setScalar(breathe);
    wire.scale.setScalar(breathe * 1.005);
    group.rotation.y = t * 0.08 + pointerX;
    group.rotation.x = t * 0.035;
    dust.rotation.y = -t * 0.03;
    renderer.render(scene, camera);
  };
  animate();

  return () => {
    cancelAnimationFrame(frame);
    resizeObserver.disconnect();
    visibility.disconnect();
    removeEventListener('pointermove', onPointer);
    renderer.dispose();
  };
}
