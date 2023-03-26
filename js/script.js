import * as THREE from "three"
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TTFLoader } from 'three/addons/loaders/TTFLoader.js';

// window sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

// scene svariables
let scene = new THREE.Scene()
let renderer = new THREE.WebGLRenderer({ alpha: true })
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(0,0,9)
scene.add(camera)
// render transparent background
renderer.setClearColor( 0xff0000, 0 );

const textureLoader = new THREE.TextureLoader()
const colorTexture = textureLoader.load('assets/textures/metal032_color.jpg')
const normalTexture = textureLoader.load('assets/textures/metal032_normal_gl.jpg')
const metalnessTexture = textureLoader.load('assets/textures/metal032_metalness.jpg')
const roughnessTexture = textureLoader.load('assets/textures/metal032_roughness.jpg')
const textMaterial =  new THREE.MeshStandardMaterial({
    map: colorTexture,
    metalnessMap: metalnessTexture,
    normalMap: normalTexture,
    roughnessMap: roughnessTexture,
    metalness: 0.1,
    side: THREE.DoubleSide
})

let myFont
let text = 'SpOnAcT'
let firstLetter = true
let textMesh1, textGeo, parent
parent = new THREE.Object3D();
scene.add(parent)

// load font
const fontLoader = new FontLoader()
const ttfLoader = new TTFLoader()
ttfLoader.load('assets/fonts/advert.ttf', json => {
    myFont = fontLoader.parse(json)
    createText()
})

// lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6) // soft white light
ambientLight.position.set(0,3,3)
scene.add( ambientLight );

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
directionalLight.castShadow = true
directionalLight.position.set(0, 0, 5)
scene.add(directionalLight)

const pointLightBack = new THREE.PointLight( 0xffffff, 1, 100 );
pointLightBack.position.set( 0, 0, -10 );
scene.add( pointLightBack );
const pointLightFront = new THREE.PointLight( 0xffffff, 1, 100 );
pointLightFront.position.set( 0, 0, 10 );
scene.add( pointLightFront );

// set and append renderer
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
document.body.appendChild(renderer.domElement)

// orbit controls
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true

const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()
    pointLightFront.position.x = Math.tan(elapsedTime*0.5) * 20
    parent.rotation.y = Math.sin(elapsedTime * 2) * 0.1

    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}

tick()

function createText() {
    textGeo = new TextGeometry( text, {
        size: 1.5,
        height: 0.5,
        //curveSegments: curveSegments,

        font: myFont,
        bevelThickness: 0.1,
        bevelSegments: 1,
		bevelSize: 0.1,
		bevelEnabled: true,

    });

    //textGeo.materials = [ textMaterialFront, textMaterialSide ];
    textGeo.materials = [textMaterial, textMaterial]
    
    // textGeo.computeBoundingBox();
    // textGeo.computeVertexNormals();
    textMesh1 = new THREE.Mesh( textGeo, textMaterial );
    textMesh1.geometry.center()
    parent.add(textMesh1)
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    
    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// use js to change css style
const canvasElm = document.querySelector('canvas')
canvasElm.style.position = 'fixed'
canvasElm.style.top = 0
canvasElm.style.left = 0
// canvasElm.style.zIndex = 10
