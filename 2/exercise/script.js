;(() => {

    document.addEventListener('DOMContentLoaded', () => {

        init();

        setEvent();

        render();

    });

    // DOM
    let wrapper;

    // flags
    let escape = false;
    let isActive = false;

    // three.js用
    let scene;
    let camera;
    let renderer;
    let material;
    let geometry;
    let box;
    let axesHelper;
    let controls;
    let directionalLight;

    // params
    const CAMERA_PARAM = {
        fovy: 60,
        aspect: window.innerWidth / window.innerHeight,
        near: 0.1,
        far: 15,
        x: 0.5,
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
        color: 0x00ffff
    };

    const DIRECTIONAL_LIGHT_PARAM = {
        color: 0xffffff,
        intensity: 1.0,
        x: 1.5,
        y: 2.0,
        z: 3.0,
    };

    function init() {

        wrapper = document.getElementById('webgl');

        scene = new THREE.Scene();

        renderer = new THREE.WebGLRenderer();
        renderer.setClearColor(RENDERER_PARAM.clearColor);
        renderer.setSize(
            RENDERER_PARAM.width,
            RENDERER_PARAM.height
        );
        wrapper.appendChild(renderer.domElement);

        camera = new THREE.PerspectiveCamera(
            CAMERA_PARAM.fovy,
            CAMERA_PARAM.aspect,
            CAMERA_PARAM.near,
            CAMERA_PARAM.far,
        );
        camera.position.set(
            CAMERA_PARAM.x,
            CAMERA_PARAM.y,
            CAMERA_PARAM.z,
        );
        camera.lookAt(CAMERA_PARAM.lookAt);

        geometry = new THREE.BoxGeometry(1.0, 1.0, 1.0);
        material = new THREE.MeshLambertMaterial(MATERIAL_PARAM);

        box = new THREE.Mesh(geometry, material);

        scene.add(box);

        directionalLight = new THREE.DirectionalLight(
            DIRECTIONAL_LIGHT_PARAM.color,
            DIRECTIONAL_LIGHT_PARAM.intensity
        );
        directionalLight.position.set(
            DIRECTIONAL_LIGHT_PARAM.x,
            DIRECTIONAL_LIGHT_PARAM.y,
            DIRECTIONAL_LIGHT_PARAM.z,
        );
        scene.add(directionalLight);

        axesHelper = new THREE.AxesHelper(5);
        scene.add(axesHelper);

        controls = new THREE.OrbitControls(camera, renderer.domElement);
        scene.add(controls);

    }

    function render() {

        if (escape) {
            return;
        }

        requestAnimationFrame(render)

        controls.update();

        if (isActive) {
            box.rotation.y += 0.05;
        }

        renderer.render(scene, camera);

    }

    function setEvent() {

        window.addEventListener('keydown', (e) => {

            if (e.code === 'Escape') {
                escape = true;
            }

            if (e.code === 'Space') {
                isActive = true;
            }

        });

        window.addEventListener('keyup', (e) => {
            isActive = false;
        });

    }


})();