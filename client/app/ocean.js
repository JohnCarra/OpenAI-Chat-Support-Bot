// const container = document.getElementById('container');
const canvas = document.querySelector('canvas.webgl');
let renderer, scene, camera, mesh;
const start = Date.now();

const clock = new THREE.Clock();

const timeUniform = {
    iGlobalTime: {
        type: 'f',
        value: 0.1
    },
    iResolution: {
        type: 'v2',
        value: new THREE.Vector2()
    }
};

timeUniform.iResolution.value.x = window.innerWidth;
timeUniform.iResolution.value.y = window.innerHeight;

scene = new THREE.Scene();

camera = new THREE.PerspectiveCamera(
    30,
    window.innerWidth / window.innerHeight,
    0.1,
    10000
);
camera.position.x = 20;
camera.position.y = 10;
camera.position.z = 20;
camera.lookAt(scene.position);
scene.add(camera);

const material = new THREE.ShaderMaterial({
    uniforms: timeUniform,
    vertexShader: document.getElementById('vertex-shader').textContent,
    fragmentShader: document.getElementById('fragment-shader').textContent
});

const water = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(
        window.innerWidth, 
        window.innerHeight, 40), 
        material
    );
water.position.set(0,0,-5)
scene.add(water);


renderer = new THREE.WebGLRenderer({ canvas: canvas });
renderer.setSize( window.innerWidth, window.innerHeight );
// container.appendChild( renderer.domElement );


const render = () => {
    timeUniform.iGlobalTime.value += clock.getDelta();
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}

render();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});