
import * as THREE from 'three';
// import EarthImg from './img/earth.jpg';

// canvas.width = 2000;
// canvas.height = 2000;
// const ctx = canvas.getContext("2d");
// ctx.fillStyle = 'red';
// ctx.fillRect(0, 0, 100, 100);

// window.addEventListener("resize", function () {
//     console.log(window.devicePixelRatio);
// });

function setCanvasSize(canvas) {
    const { clientHeight, clientWidth } = canvas;
    canvas.height = window.devicePixelRatio * clientHeight;
    canvas.width = window.devicePixelRatio * clientWidth;
    // canvas.height = clientHeight;
    // canvas.width = clientWidth;
}

function main() {
    const canvas = document.querySelector('#canvas');
    setCanvasSize(canvas);
    const renderer = new THREE.WebGLRenderer({ canvas });
    const fov = 75;
    const aspect = canvas.clientWidth / canvas.clientHeight;
    const near = 1;
    const far = 10;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 5;

    const scene = new THREE.Scene();

    {
        const color = 0xFFFFFF;
        const intensity = 1;
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(-1, 2, 4);
        scene.add(light);
    }

    const boxWidth = 1;
    const boxHeight = 1;
    const boxDepth = 1;
    const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
    const material = new THREE.MeshPhongMaterial({ color: 0x44aa88 });  // greenish blue
    const cube = new THREE.Mesh(geometry, material);
    const dodeGeometry = new THREE.DodecahedronBufferGeometry(0.4);
    const dode = new THREE.Mesh(dodeGeometry, material);
    dode.position.set(1, 1, 1);
    let earth;
    const loader = new THREE.TextureLoader();
    loader.load('./img/earth.jpg', (texture) => {
        console.log("loaded texture,", texture);
        const geometry = new THREE.SphereGeometry(0.3, 100, 100);
        const material = new THREE.MeshBasicMaterial({
            map: texture,
        });
        earth = new THREE.Mesh(geometry, material);
        earth.position.set(-1, 1, 1);
        cube.add(earth);
    })

    scene.add(cube);
    cube.add(dode);

    function render(time) {
        time *= 0.001;  // convert time to seconds
        dode.rotation.x = time;
        dode.rotation.y = time;
        cube.rotation.x = time;
        cube.rotation.y = time;
        if (earth) {
            earth.rotation.x = time / 10;
            earth.rotation.y = time / 10;
        }
        renderer.render(scene, camera);

        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
    window.addEventListener("resize", () => {
        // setCanvasSize(canvas);
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
    });
}

main();
