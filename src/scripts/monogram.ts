import * as THREE from 'three';
import { monogramPieces, monogramCenterX, monogramDepth } from '../data/monogram';

/** Six solid pieces; only the entrance and changes in scroll/pointer need frames. */
export function createMonogram(host: HTMLElement) {
  let renderer: THREE.WebGLRenderer;
  try {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('webgl2', { antialias: true, alpha: true, powerPreference: 'low-power' });
    if (!context) return null;
    renderer = new THREE.WebGLRenderer({ canvas, context, antialias: true, alpha: true, powerPreference: 'low-power' });
  } catch { return null; }
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.75));
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.domElement.setAttribute('aria-hidden', 'true');
  host.prepend(renderer.domElement);
  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-4, 4, 4, -4, .1, 40);
  camera.position.set(0, 0, 10);
  const group = new THREE.Group(); scene.add(group);
  const face = new THREE.MeshStandardMaterial({ color: 0xc7351d, roughness: .76, metalness: 0 });
  const ceramic = new THREE.MeshStandardMaterial({ color: 0xe0d2bf, roughness: .88, metalness: 0 });
  const meshes = monogramPieces.map(piece => {
    const shape = new THREE.Shape();
    piece.points.forEach(([x,y],i) => i ? shape.lineTo(x-monogramCenterX,y) : shape.moveTo(x-monogramCenterX,y));
    shape.closePath();
    // ExtrudeGeometry assigns group 0 to caps and group 1 to bevels/sides.
    const geometry = new THREE.ExtrudeGeometry(shape, { depth: monogramDepth, bevelEnabled: true, bevelSegments: 4, steps: 1, bevelSize: .035, bevelThickness: .045, curveSegments: 1 });
    geometry.translate(0,0,-monogramDepth/2);
    // Rotate each piece around its own centre during separation, rather than the origin.
    geometry.computeBoundingBox();
    const center = geometry.boundingBox!.getCenter(new THREE.Vector3());
    geometry.translate(-center.x,-center.y,-center.z);
    const mesh = new THREE.Mesh(geometry,[face,ceramic]); mesh.position.copy(center);
    group.add(mesh);
    return { mesh, center, piece };
  });
  scene.add(new THREE.HemisphereLight(0xfff6e9,0x69503c,2.5));
  const key = new THREE.DirectionalLight(0xfff0db,2.8); key.position.set(-3,5,6); scene.add(key);
  const fill = new THREE.DirectionalLight(0xffffff,.8); fill.position.set(4,-1,3); scene.add(fill);
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const smallScreen = matchMedia('(max-width: 600px)');
  let visible = false, disposed = false, frame = 0, ready = false;
  let entranceStart: number | null = null;
  const target = { progress: 0, x: 0, y: 0 }, current = { progress: 0, x: 0, y: 0 };
  const render = (now: number) => {
    frame = 0;
    if (disposed || !visible || document.hidden) return;
    entranceStart ??= now;
    const reduced = reducedMotion.matches;
    const t = reduced ? 1 : Math.min(1,(now-entranceStart)/800);
    const entrance = 1-Math.pow(1-t,3);
    for (const key of ['progress','x','y'] as const) current[key] += (target[key]-current[key])*(reduced ? 1 : .15);
    const progress = reduced ? 0 : current.progress;
    const spread = (1-entrance)*.36 + Math.sin(progress*Math.PI)*(smallScreen.matches ? .28 : .48);
    meshes.forEach(({mesh,center,piece}) => {
      mesh.position.set(center.x+piece.offset[0]*spread,center.y+piece.offset[1]*spread,center.z+piece.offset[2]*spread);
      mesh.rotation.z = piece.turn*spread;
    });
    group.rotation.set(.12+(reduced ? 0 : current.y),-.22+(reduced ? 0 : current.x)+progress*.22,-.045-progress*.035);
    group.position.y = progress*.65;
    group.scale.setScalar(1-progress*.07);
    renderer.render(scene,camera);
    if (!ready) { host.classList.add('is-ready'); ready = true; }
    const changing = (['progress','x','y'] as const).some(key => Math.abs(current[key]-target[key])>.0005);
    if (t<1 || changing) frame = requestAnimationFrame(render);
  };
  const schedule = () => { if (!frame && visible && !disposed && !document.hidden) frame=requestAnimationFrame(render); };
  const resize = () => {
    const {width,height} = host.getBoundingClientRect(); if (!width || !height || disposed) return;
    renderer.setSize(width,height,false);
    const aspect=width/height, frustumHeight=Math.max(4.8,6.9/aspect);
    camera.left=-frustumHeight*aspect/2; camera.right=frustumHeight*aspect/2;
    camera.top=frustumHeight/2; camera.bottom=-frustumHeight/2; camera.updateProjectionMatrix(); schedule();
  };
  const sizeObserver=new ResizeObserver(resize); sizeObserver.observe(host);
  const visibilityObserver=new IntersectionObserver(([entry]) => {
    visible=entry.isIntersecting;
    if (visible) schedule(); else { cancelAnimationFrame(frame); frame=0; }
  }); visibilityObserver.observe(host);
  const onVisibility=() => { if (!document.hidden) schedule(); };
  const onMotion=() => { if (reducedMotion.matches) { target.progress=target.x=target.y=0; } schedule(); };
  const onLost=(event: Event) => { event.preventDefault(); cancelAnimationFrame(frame); frame=0; host.classList.remove('is-ready'); };
  const onRestored=() => { ready=false; schedule(); };
  document.addEventListener('visibilitychange',onVisibility);
  reducedMotion.addEventListener('change',onMotion);
  renderer.domElement.addEventListener('webglcontextlost',onLost);
  renderer.domElement.addEventListener('webglcontextrestored',onRestored);
  resize();
  return {
    update(progress: number,pointerX=0,pointerY=0) {
      target.progress=reducedMotion.matches ? 0 : Math.max(0,Math.min(1,progress));
      const tiltLimit=Math.PI/30;
      target.x=reducedMotion.matches ? 0 : Math.max(-tiltLimit,Math.min(tiltLimit,pointerX));
      target.y=reducedMotion.matches ? 0 : Math.max(-tiltLimit,Math.min(tiltLimit,pointerY)); schedule();
    },
    dispose() {
      if (disposed) return;
      disposed=true; cancelAnimationFrame(frame); sizeObserver.disconnect(); visibilityObserver.disconnect();
      document.removeEventListener('visibilitychange',onVisibility); reducedMotion.removeEventListener('change',onMotion);
      renderer.domElement.removeEventListener('webglcontextlost',onLost); renderer.domElement.removeEventListener('webglcontextrestored',onRestored);
      meshes.forEach(({mesh})=>mesh.geometry.dispose()); face.dispose(); ceramic.dispose(); renderer.dispose();
      renderer.domElement.remove(); host.classList.remove('is-ready');
    },
  };
}
