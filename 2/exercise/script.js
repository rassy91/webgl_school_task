;(() => {

    document.addEventListener('DOMContentLoaded', () => {

        init();

        setEvent();

        render();

    });

    // DOM
    let wrapper;

    // flags
    let escape;
    let isActive;

    // three.js 用
    let scene;
    let camera;
    let renderer;
    let geometry;
    let material;
    let box;
    let directionalLight;
    let ambientLight;

    let axesHelper;
    let controls;

    const CAMERA_PARAM = {
        fovy: 60,
        aspect: window.innerWidth / window.innerHeight,
        near: 0.1,
        far: 15,
        x: 1.0,
        y: 2.0,
        z: 5.0,
        lookAt: new THREE.Vector3(0.0, 0.0, 0.0)
    };

    const RENDERER_PARAM = {
        clearColor: 0x333333,
        width: window.innerWidth,
        height: window.innerHeight
    };

    const MATERIAL_PARAM = {
        color: 0x0066ff,
        specular: 0xff0000
    };

    const DIRECTIONAL_LIGHT_PARAM = {
        color: 0xffffff,
        intensity: 0.8,
        x: 2.0,
        y: -2.0,
        z: 4.0,
    };

    const AMBIENT_LIGHT_PARAM = {
        color: 0xff0000,
        intensity: 0.2
    };

    function init() {

        wrapper = document.getElementById('webgl');

        scene = new THREE.Scene();

        camera = new THREE.PerspectiveCamera(
            CAMERA_PARAM.fovy,
            CAMERA_PARAM.aspect,
            CAMERA_PARAM.near,
            CAMERA_PARAM.far
        );
        camera.position.set(
            CAMERA_PARAM.x,
            CAMERA_PARAM.y,
            CAMERA_PARAM.z,
        );
        camera.lookAt(CAMERA_PARAM.lookAt);

        renderer = new THREE.WebGLRenderer();
        renderer.setClearColor(RENDERER_PARAM.clearColor);
        renderer.setSize(
            RENDERER_PARAM.width,
            RENDERER_PARAM.height
        );
        wrapper.appendChild(renderer.domElement);

        geometry = new THREE.BoxGeometry(1.0, 1.0, 1.0);
        material = new THREE.MeshPhongMaterial(MATERIAL_PARAM);
        box = new THREE.Mesh(geometry, material);
        scene.add(box);

        directionalLight = new THREE.DirectionalLight(
            DIRECTIONAL_LIGHT_PARAM.color,
            DIRECTIONAL_LIGHT_PARAM.intensity,
        );
        directionalLight.position.set(
            DIRECTIONAL_LIGHT_PARAM.x,
            DIRECTIONAL_LIGHT_PARAM.y,
            DIRECTIONAL_LIGHT_PARAM.z,
        );
        scene.add(directionalLight);

        ambientLight = new THREE.AmbientLight(AMBIENT_LIGHT_PARAM);
        scene.add(ambientLight);

        axesHelper = new THREE.AxesHelper(5);
        scene.add(axesHelper);

        controls = new THREE.OrbitControls(camera,  renderer.domElement);

    }

    function render() {

        if (escape) {
            return;
        }

        requestAnimationFrame(render);

        controls.update();

        box.rotation.y += 0.01;

        if (isActive) {
            box.rotation.y += 0.02;
        }

        renderer.render(scene, camera);

    }

    function setEvent() {

        window.addEventListener('keydown', (e) => {

            switch (e.code) {
                case 'Escape':
                    escape = true;
                    break;
                case 'Space':
                    isActive = true;
                    break;
                default:
                    // デフォルトなし
            }

        });

        window.addEventListener('keyup', (e) => {

            isActive = false;

        });

    }



})();