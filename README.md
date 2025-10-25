# threejs-act3.1-3.3- (Three.js Interactive Graphics)

This collection includes **Three.js** activities demonstrating **particles, galaxy generation**, and **scroll-based animation**.
All projects are built using **CDN-based imports**, so no installation or build tools are required — just open in your browser using **Live Server** or deploy to **GitHub Pages / Vercel**.

---

## Activity 3.1 — Particles

### Introduction

Particles are small 2D elements (sprites) used to simulate effects like **stars, dust, smoke, fire**, etc.
In this activity, we explore how to create, color, and animate thousands of particles efficiently.

### Key Concepts

* Use of `THREE.Points` and `THREE.PointsMaterial`
* Controlling transparency with `alphaMap`, `alphaTest`, `depthWrite`, and blending modes
* Generating random positions using `BufferGeometry`
* Adding color and motion (sinusoidal “wave” animation)

### Features

* Randomly placed particle cloud (custom BufferGeometry)
* Alpha-mapped glowing particles (Kenney texture)
* Additive blending for light effects
* Vertex colors for per-particle variation
* Wave motion animation using sine functions

### Files

activity3_1/
├── index.html
├── style.css
└── main.js

### Result

A floating field of glowing, animated particles that simulate 3D waves.


## Activity 3.2 — Galaxy Generator

### Introduction

Expanding from particle systems, we build a **procedural spiral galaxy generator** using `BufferGeometry`, colors, randomness, and mathematical placement formulas.

### Key Concepts

* Galaxy shape defined by `radius`, `branches`, and `spin`
* Controlled randomness (`randomnessPower`)
* Interpolated colors between **inside** and **outside** using `THREE.Color.lerp()`
* Interactive tweaking via **lil-GUI**

### Features

* Fully customizable galaxy with up to 1,000,000 particles
* Smooth color gradient from orange core to blue edges
* Configurable number of branches, spin, and randomness
* Auto-regeneration when settings change

### Files

activity3_2/
├── index.html
├── style.css
└── main.js

### Result

An interactive spiral galaxy that updates in real-time as you adjust parameters in the GUI panel.


##  Activity 3.3 — Scroll-Based Animation

### Introduction

This activity combines 3D rendering with **scroll interactions** and **cursor-based parallax**, creating a dynamic storytelling effect as users scroll through sections.

### Key Concepts

* Scroll-driven camera movement through multiple scenes
* Smooth mesh animations triggered by section transitions
* Mouse parallax motion via `cameraGroup`
* Particle background for visual depth
* `GSAP` animations with easing

### Features

* Three distinct 3D objects (Torus, Cone, TorusKnot)
* Scroll = camera moves vertically through each section
* Mouse movement = parallax effect
* Particles floating across scene
* Color control through lil-GUI
* Section-triggered object rotation animations (GSAP)

### Files

activity3_3/
├── index.html
├── style.css
└── main.js

### Result

A fully interactive 3D webpage that reacts to scrolling and cursor movement, enhanced with glowing particles.


## How to Run Locally

1. Place each activity folder (`activity3_1`, `activity3_2`, `activity3_3`) in one directory.
2. Open the folder in **VS Code**.
3. Right-click the HTML file → “Open with Live Server”.


