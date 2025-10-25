import * as THREE from 'https://unpkg.com/three@0.152.2/build/three.module.js';
import { OrbitControls } from 'https://unpkg.com/three@0.152.2/examples/jsm/controls/OrbitControls.js';

const container = document.getElementById('container');

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
container.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, innerWidth / innerHeight, 0.1, 100);
camera.position.set(0, 1.5, 4);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

const clock = new THREE.Clock();

// === Default Settings (no button needed) ===
const mode = "custom"; // "sphere" or "custom"
const count = 5000;
const size = 0.05;
const useTexture = true;
const alphaTest = true;
const depthTestOff = false;
const depthWriteOff = true;
const additive = true;
const vertexColors = true;

// === Texture Loader ===
const textureLoader = new THREE.TextureLoader();
const kenneyURL = 'https://raw.githubusercontent.com/kenneyNL/kenney.nl/master/Assets/particle-pack/PNG/2.png';
const particleTexture = textureLoader.load(kenneyURL);

let particles, particlesGeometry, particlesMaterial, basePositions;

// === Functions ===
function disposeParticles() {
  if (particles) {
    scene.remove(particles);
    if (particlesGeometry) particlesGeometry.dispose();
    if (particlesMaterial) {
      if (particlesMaterial.map) particlesMaterial.map.dispose();
      particlesMaterial.dispose();
    }
    particles = particlesGeometry = particlesMaterial = null;
  }
}

function applyMaterialOptions(material) {
  if (alphaTest) material.alphaTest = 0.001;
  if (depthTestOff) material.depthTest = false;
  if (depthWriteOff) material.depthWrite = false;
  material.blending = additive ? THREE.AdditiveBlending : THREE.NormalBlending;
}

function createSphereParticles() {
  const geometry = new THREE.SphereGeometry(1, 32, 32).toNonIndexed();
  geometry.scale(1.5, 1.5, 1.5);
  const material = new THREE.PointsMaterial({
    size: size,
    sizeAttenuation: true,
    transparent: true,
    vertexColors: vertexColors
  });
  if (useTexture) {
    material.alphaMap = particleTexture;
    material.transparent = true;
  }
  applyMaterialOptions(material);
  const points = new THREE.Points(geometry, material);
  return { points, geometry, material };
}

function createCustomParticles() {
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    positions[i3] = (Math.random() - 0.5) * 10;
    positions[i3 + 1] = (Math.random() - 0.5) * 6;
    positions[i3 + 2] = (Math.random() - 0.5) * 10;
    colors[i3] = Math.random();
    colors[i3 + 1] = Math.random();
    colors[i3 + 2] = Math.random();
  }
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  if (vertexColors) geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const material = new THREE.PointsMaterial({
    size: size,
    sizeAttenuation: true,
    transparent: true,
    vertexColors: vertexColors
  });
  if (useTexture) {
    material.alphaMap = particleTexture;
    material.transparent = true;
  }
  applyMaterialOptions(material);
  const points = new THREE.Points(geometry, material);
  return { points, geometry, material };
}

// === Create Particles Automatically ===
function createParticles() {
  disposeParticles();
  if (mode === "sphere") {
    const res = createSphereParticles();
    particles = res.points;
    particlesGeometry = res.geometry;
    particlesMaterial = res.material;
  } else {
    const res = createCustomParticles();
    particles = res.points;
    particlesGeometry = res.geometry;
    particlesMaterial = res.material;
  }
  scene.add(particles);

  // Keep base positions for animation
  if (particlesGeometry && particlesGeometry.attributes.position) {
    basePositions = Float32Array.from(particlesGeometry.attributes.position.array);
  } else basePositions = null;
}

// === Cube (for depth testing) ===
const cube = new THREE.Mesh(
  new THREE.BoxGeometry(0.6, 0.6, 0.6),
  new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true })
);
cube.position.set(0, 0.25, 0);
scene.add(cube);

// === Animation Loop ===
function animate() {
  const elapsed = clock.getElapsedTime();

  if (particles) {
    particles.rotation.y = elapsed * 0.08;

    if (basePositions && particlesGeometry.attributes.position) {
      const positions = particlesGeometry.attributes.position.array;
      const c = particlesGeometry.attributes.position.count;
      for (let i = 0; i < c; i++) {
        const i3 = i * 3;
        const x = basePositions[i3];
        positions[i3 + 1] = basePositions[i3 + 1] + Math.sin(elapsed * 1.5 + x * 0.5) * 0.35;
      }
      particlesGeometry.attributes.position.needsUpdate = true;
    }
  }

  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

// === Auto initialize ===
createParticles();
animate();

// === Handle resize ===
window.addEventListener('resize', () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
});

// === Info Overlay ===
const info = document.createElement('div');
info.className = 'canvas-info';
info.innerHTML = '<strong>Activity 3.1 — Particles</strong><br>Auto-start version (no button).';
document.body.appendChild(info);
