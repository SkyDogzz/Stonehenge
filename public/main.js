import * as THREE from '../node_modules/three/build/three.module.js'

let axesHelper
let scene, camera, renderer
let pillarExtGeometry, topExtGeometry, pillarIntGeometry, topIntGeometry, pillarMidGeometry, groundGeometry
let pillarExtMaterial, topExtMaterial, pillarIntMaterial, topIntMaterial, pillarMidMaterial, groundMaterial
let pillarExtTexture, topExtTexture, pillarIntTexture, topIntTexture, pillarMidTexture, groundTexture
let pillarExt, topExt, pillarInt, topInt, pillarMid, ground
let ambientLight, pointLight

init()
animate()

function init() {
    camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 20000);
    camera.position.z = 4500
    camera.position.y = 2500
    camera.lookAt(0, 0, 0)

    scene = new THREE.Scene();

    axesHelper = new THREE.AxesHelper(10000);
    scene.add(axesHelper);

    ambientLight = new THREE.AmbientLight(0xffffff, 0.2)
    scene.add(ambientLight)

    pointLight = new THREE.PointLight(0xffffff, 0.6, 0)
    pointLight.position.set(2000, 6000, 0)
    pointLight.shadowMapWidth = 2048
    pointLight.shadowMapHeight = 2048
    pointLight.shadow.camera.near = 0.1
    pointLight.shadow.camera.far = 20000
    pointLight.castShadow = true
    scene.add(pointLight)

    groundTexture = new THREE.TextureLoader().load('textures/grass-1024.png')
    groundGeometry = new THREE.PlaneGeometry(1024, 1024)
    groundMaterial = new THREE.MeshPhongMaterial({ map: groundTexture })

    for (let i = -9; i < 10; i++) {
        for (let j = -9; j < 10; j++) {
            ground = new THREE.Mesh(groundGeometry, groundMaterial)
            ground.position.x = i * 1024
            ground.position.z = j * 1024
            ground.rotation.x = - THREE.MathUtils.degToRad(90)
            ground.receiveShadow = true
            scene.add(ground)
        }
    }

    pillarExtTexture = new THREE.TextureLoader().load('textures/stone-1024.jpg')
    pillarExtGeometry = new THREE.BoxGeometry(200, 500, 100)
    pillarExtMaterial = new THREE.MeshPhongMaterial({ map: pillarExtTexture })

    for (let i = 0; i < 28; i++) {
        pillarExt = new THREE.Mesh(pillarExtGeometry, pillarExtMaterial)
        pillarExt.position.y = 250
        pillarExt.position.x = 1600 * Math.cos(THREE.MathUtils.degToRad(i * 360 / 28))
        pillarExt.position.z = 1600 * Math.sin(THREE.MathUtils.degToRad(i * 360 / 28))
        pillarExt.rotation.y = -THREE.MathUtils.degToRad(i * 360 / 28 + 90)
        pillarExt.receiveShadow = true
        pillarExt.castShadow = true
        scene.add(pillarExt)
    }

    topExtTexture = new THREE.TextureLoader().load('textures/stone-1024.jpg')
    topExtGeometry = new THREE.BoxGeometry(150, 100, 350)
    topExtMaterial = new THREE.MeshPhongMaterial({ map: topExtTexture })


    for (let i = 0; i < 28; i++) {
        topExt = new THREE.Mesh(topExtGeometry, topExtMaterial)
        topExt.position.y = 550
        topExt.position.x = 1600 * Math.cos(THREE.MathUtils.degToRad((i + 0.5) * 360 / 28))
        topExt.position.z = 1600 * Math.sin(THREE.MathUtils.degToRad((i + 0.5) * 360 / 28))
        topExt.rotation.y = -(THREE.MathUtils.degToRad((i + 0.5) * 360 / 28))
        topExt.receiveShadow = true
        topExt.castShadow = true
        scene.add(topExt)
    }

    pillarIntTexture = new THREE.TextureLoader().load('textures/stone-1024.jpg')
    pillarIntGeometry = new THREE.BoxGeometry(200, 600, 100)
    pillarIntMaterial = new THREE.MeshPhongMaterial({ map: pillarIntTexture })

    for (let i = 0; i < 10; i++) {
        pillarInt = new THREE.Mesh(pillarIntGeometry, pillarIntMaterial)
        pillarInt.position.y = 300
        pillarInt.position.x = 800 * Math.cos(THREE.MathUtils.degToRad(i * 360 / 12))
        pillarInt.position.z = 800 * Math.sin(THREE.MathUtils.degToRad(i * 360 / 12))
        pillarInt.rotation.y = -(THREE.MathUtils.degToRad(i * 360 / 12 + 90))
        pillarInt.receiveShadow = true
        pillarInt.castShadow = true
        scene.add(pillarInt)
    }

    topIntTexture = new THREE.TextureLoader().load('textures/stone-1024.jpg')
    topIntGeometry = new THREE.BoxGeometry(200, 100, 600)
    topIntMaterial = new THREE.MeshPhongMaterial({ map: topIntTexture })


    for (let i = 0; i < 5; i++) {
        topInt = new THREE.Mesh(topIntGeometry, topIntMaterial)
        topInt.position.y = 650
        topInt.position.x = 800 * Math.cos(THREE.MathUtils.degToRad((i + 0.25) * 360 / 6))
        topInt.position.z = 800 * Math.sin(THREE.MathUtils.degToRad((i + 0.25) * 360 / 6))
        topInt.rotation.y = -THREE.MathUtils.degToRad((i + 0.25) * 360 / 6)
        topInt.receiveShadow = true
        topInt.castShadow = true
        scene.add(topInt)
    }

    pillarMidTexture = new THREE.TextureLoader().load('textures/stone-1024.jpg')
    pillarMidGeometry = new THREE.BoxGeometry(80, 200, 100)
    pillarMidMaterial = new THREE.MeshPhongMaterial({ map: pillarMidTexture })

    for (let i = 0; i < 53; i++) {
        pillarMid = new THREE.Mesh(pillarMidGeometry, pillarMidMaterial)
        pillarMid.position.y = 100
        pillarMid.position.x = 1400 * Math.cos(THREE.MathUtils.degToRad((i - 5) * 360 / 56))
        pillarMid.position.z = 1400 * Math.sin(THREE.MathUtils.degToRad((i - 5) * 360 / 56))
        pillarMid.rotation.y = -THREE.MathUtils.degToRad((i - 5) * 360 / 56)
        pillarMid.receiveShadow = true
        pillarMid.castShadow = true
        scene.add(pillarMid)
    }

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.BasicShadowMap
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