;(() => {

    document.addEventListener('DOMContentLoaded', () => {

        init();

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
        material = new THREE.MeshBasicMaterial(MATERIAL_PARAM);

        box = new THREE.Mesh(geometry, material);

        scene.add(box);

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

        renderer.render(scene, camera);

    }


})();