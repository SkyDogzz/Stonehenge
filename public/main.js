import * as THREE from '../node_modules/three/build/three.module.js'

let axesHelper
let scene, camera, renderer
let pillarExtGeometry, pillarExtMaterial, pillarExtTexture
let topExtGeometry, topExtMaterial, topExtTexture
let groundGeometry, groundMaterial, groundTexture
let pillarExt, topExt, ground

let deg2rad = Math.PI / 180

init()
animate()

function init() {
    camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 10000);
    camera.position.z = 4500
    camera.position.y = 2000
    camera.lookAt(0, 0, 0)

    scene = new THREE.Scene();

    axesHelper = new THREE.AxesHelper(10000);
    scene.add(axesHelper);

    groundTexture = new THREE.TextureLoader().load('textures/grass-1024.png')
    groundGeometry = new THREE.PlaneGeometry(1024, 1024)
    groundMaterial = new THREE.MeshBasicMaterial({ map: groundTexture })

    for (let i = -9; i < 10; i++) {
        for (let j = -9; j < 10; j++) {
            ground = new THREE.Mesh(groundGeometry, groundMaterial)
            ground.position.x = i * 1024
            ground.position.z = j * 1024
            ground.rotation.x = - Math.PI / 2
            scene.add(ground)
        }
    }

    pillarExtTexture = new THREE.TextureLoader().load('textures/stone-1024.jpg')
    pillarExtGeometry = new THREE.BoxGeometry(200, 500, 100)
    pillarExtMaterial = new THREE.MeshBasicMaterial({ map: pillarExtTexture })

    for (let i = 0; i < 28; i++) {
        pillarExt = new THREE.Mesh(pillarExtGeometry, pillarExtMaterial)
        pillarExt.position.y = 250
        pillarExt.position.x = 1600 * Math.cos(i * 360 / 28 * deg2rad)
        pillarExt.position.z = 1600 * Math.sin(i * 360 / 28 * deg2rad)
        pillarExt.rotation.y = -(i * 360 / 28 + 90) * deg2rad
        scene.add(pillarExt)
    }

    topExtTexture = new THREE.TextureLoader().load('textures/stone-1024.jpg')
    topExtGeometry = new THREE.BoxGeometry(200, 100, 350)
    topExtMaterial = new THREE.MeshBasicMaterial({ map: topExtTexture })


    for (let i = 0; i < 28; i++) {
        topExt = new THREE.Mesh(topExtGeometry, topExtMaterial)
        topExt.position.y = 550
        topExt.position.x = 1600 * Math.cos((i + 0.5) * 360 / 28 * deg2rad)
        topExt.position.z = 1600 * Math.sin((i + 0.5) * 360 / 28 * deg2rad)
        topExt.rotation.y = -((i + 0.5) * 360 / 28) * deg2rad
        scene.add(topExt)
    }

    pillarExtTexture = new THREE.TextureLoader().load('textures/stone-1024.jpg')
    pillarExtGeometry = new THREE.BoxGeometry(200, 500, 100)
    pillarExtMaterial = new THREE.MeshBasicMaterial({ map: pillarExtTexture })

    for (let i = 0; i < 10; i++) {
        pillarExt = new THREE.Mesh(pillarExtGeometry, pillarExtMaterial)
        pillarExt.position.y = 250
        pillarExt.position.x = 800 * Math.cos(i * 360 / 10 * deg2rad)
        pillarExt.position.z = 800 * Math.sin(i * 360 / 10 * deg2rad)
        pillarExt.rotation.y = -(i * 360 / 10 + 90) * deg2rad
        scene.add(pillarExt)
    }

    topExtTexture = new THREE.TextureLoader().load('textures/stone-1024.jpg')
    topExtGeometry = new THREE.BoxGeometry(200, 100, 350)
    topExtMaterial = new THREE.MeshBasicMaterial({ map: topExtTexture })


    for (let i = 0; i < 5; i++) {
        topExt = new THREE.Mesh(topExtGeometry, topExtMaterial)
        topExt.position.y = 550
        topExt.position.x = 800 * Math.cos((i + 0.25) * 360 / 5 * deg2rad)
        topExt.position.z = 800 * Math.sin((i + 0.25) * 360 / 5 * deg2rad)
        topExt.rotation.y = -((i + 0.5) * 360 / 5) * deg2rad
        scene.add(topExt)
    }
    
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);

    scene.rotation.y += 0.005

    renderer.render(scene, camera);
}