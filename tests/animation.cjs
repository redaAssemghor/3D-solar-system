const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');
const THREE = require('three');
const { OrbitControls } = require('three-stdlib');
const source = ts.transpileModule(fs.readFileSync('src/components/useBodyAnimation.ts', 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 }
}).outputText;
function setup(followed = false, parent, multiplier = 1) {
  const frames = [];
  const exports = {};
  vm.runInNewContext(source, { exports, require: name => {
    if (name === 'react') return { useRef: current => ({ current }), useContext: () => multiplier };
    if (name === '@react-three/fiber') return { useFrame: (callback, priority) => frames.push({ callback, priority }) };
    if (name === './SimulationTime') return { SimulationTime: {} };
    return require(name);
  }});
  const body = new THREE.Object3D();
  if (parent) parent.add(body);
  const camera = new THREE.PerspectiveCamera();
  camera.position.set(0, 16, 40);
  const controls = new OrbitControls(camera);
  exports.useBodyAnimation({ current: body }, 23, 0.1, followed);
  frames.sort((a,b) => a.priority-b.priority);
  return { body, camera, controls, step(delta) {
    frames.forEach(({ callback }) => callback({ camera, controls }, delta));
    controls.update();
  }};
}
test('orbit and spin have the same speed at 30, 60 and 144 FPS', () => {
  const results = [30,60,144].map(fps => {
    const scene = setup();
    for (let i=0; i<fps*10; i++) scene.step(1/fps);
    assert.ok(Math.abs(scene.body.position.length()-23)<1e-9);
    return scene.body;
  });
  for (const body of results) {
    assert.ok(body.position.distanceTo(results[0].position)<1e-9);
    assert.ok(Math.abs(body.rotation.y-results[0].rotation.y)<1e-9);
  }
});
test('tracking updates the world-space target and points the camera at it', () => {
  const parent = new THREE.Group();
  parent.position.set(100, 3, 10);
  const scene = setup(true, parent);
  for (let i=0; i<600; i++) scene.step(1/60);
  assert.ok(scene.controls.target.distanceTo(scene.body.getWorldPosition(new THREE.Vector3()))<1);
  const direction = scene.controls.target.clone().sub(scene.camera.position).normalize();
  assert.ok(scene.camera.getWorldDirection(new THREE.Vector3()).dot(direction)>0.999);
});
test('unfollowed motion leaves the camera target alone', () => {
  const scene = setup();
  const before = scene.camera.position.clone();
  for (let i=0; i<60; i++) scene.step(1/60);
  assert.ok(scene.camera.position.distanceTo(before)<1e-9);
  assert.equal(scene.controls.target.length(), 0);
});
test('a suspended tab cannot cause a large animation jump', () => {
  const scene = setup();
  scene.step(120);
  assert.ok(Math.abs(scene.body.rotation.y-0.015)<1e-9);
  assert.ok(Math.abs(scene.body.position.x-Math.sin(23 * 0.37 + 0.005)*23)<1e-9);
});

test('pause freezes orbit and rotation', () => {
  const scene = setup(false, undefined, 0);
  scene.step(0);
  const before = scene.body.position.clone();
  for (let i=0;i<60;i++) scene.step(1/60);
  assert.ok(scene.body.position.distanceTo(before)<1e-9);
  assert.equal(scene.body.rotation.y,0);
});
test('speed multiplier advances the same orbit faster', () => {
  const normal = setup();
  const fast = setup(false, undefined, 5);
  for(let i=0;i<300;i++) normal.step(1/60);
  for(let i=0;i<60;i++) fast.step(1/60);
  assert.ok(normal.body.position.distanceTo(fast.body.position)<1e-9);
});
