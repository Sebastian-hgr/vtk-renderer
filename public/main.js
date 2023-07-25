import * as THREE from 'three'
import {OrbitControls} from './jsm/controls/OrbitControls.js'
import {GLTFLoader} from './jsm/loaders/GLTFLoader.js'


let path = 'models/full/full.glb'




//three.js code

const scene = new THREE.Scene()
scene.background = new THREE.Color()
scene.add(new THREE.AxesHelper(5))

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// Directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(0, 1, 0); // Adjust the position of the light
directionalLight.castShadow = true;
scene.add(directionalLight);

// Set up shadow properties for the directional light
directionalLight.shadow.mapSize.width = 2048;
directionalLight.shadow.mapSize.height = 2048;
directionalLight.shadow.bias = -0.003;

const camera = new THREE.PerspectiveCamera(
    85,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)
camera.position.z = 2

const renderer = new THREE.WebGLRenderer({alpha: true})
// renderer.physicallyCorrectLights = true //deprecated
renderer.useLegacyLights = false //use this instead of setting physicallyCorrectLights=true property
renderer.shadowMap.enabled = true
// renderer.outputEncoding = THREE.sRGBEncoding
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true

const loader = new GLTFLoader()

function loadModel() {
    loader.load(
        path,
        function (gltf) {
            gltf.scene.scale.set(0.1, 0.1, 0.1)
            gltf.scene.position.set(0, 0, -2)
            gltf.scene.traverse(function (child) {
                if (child.isMesh) {
                    child.receiveShadow = true
                    child.castShadow = true
                    console.log('first')
                }

                if (child.isLight) {
                    child.castShadow = true
                    child.shadow.bias = -0.003
                    child.shadow.mapSize.width = 2048
                    child.shadow.mapSize.height = 2048
                    console.log('second')
                }

            })
            scene.add(gltf.scene)
        },
        function (xhr) {
            console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
            console.log('loading model')
        },
        function (error) {
            console.log(error)

        }
    );
}

window.addEventListener('resize', onWindowResize, false)

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}

function animate() {
    requestAnimationFrame(animate)
    controls.update()
    render()
}

function render() {
    renderer.render(scene, camera)
}

animate()
//get correct path to models
let tempNumber = 0

document.getElementById('eighth').addEventListener('click', () => {
    path = 'models/eighth/eighth.glb'
    loadModel()
    for (let i = 0; i < tempNumber.len; i++) {

    }
    tempNumber++
})


document.getElementById('full').addEventListener('click', () => {
    path = 'models/full/full.glb'
    loadModel()
    scene.remove(scene.children[tempNumber]);
    tempNumber++
})
document.getElementById('hcut').addEventListener('click', () => {
    path = 'models/hcut/hcut.glb'
    loadModel()
    scene.remove(scene.children[tempNumber]);
    tempNumber++
})
document.getElementById('quarter').addEventListener('click', () => {
    path = 'models/quarter/quarter.glb'
    loadModel()
    scene.remove(scene.children[tempNumber]);
    tempNumber++
})
document.getElementById('slice').addEventListener('click', () => {
    path = 'models/slice/slice.glb'
    loadModel()
    scene.remove(scene.children[tempNumber]);
    tempNumber++
})
document.getElementById('vcut').addEventListener('click', () => {
    path = 'models/vcut/vcut.glb'
    loadModel()
    scene.remove(scene.children[tempNumber]);
    tempNumber++
})