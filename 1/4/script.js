/**
 *
 */
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

    // three.js 用の変数
    let scene;
    let camera;
    let renderer;
    let geometry;
    let material;
    let box;
    let controls;
    let axesHelper;

    const CAMERA_PARAM = {
        fovy: 60,
        aspect: window.innerWidth / window.innerHeight,
        near: 0.1,
        far: 20,
        x: 1.0,
        y: 1.0,
        z: 5.0,
        lookAt: new THREE.Vector3(0.0, 0.0, 0.0)
    };
    const RENDERER_PARAM = {
        clearColor: 0x333333,
        width: window.innerWidth,
        height: window.innerHeight
    };
    const MATERIAL_PARAM = {
        color: 0x7777ff
    };

    function init() {

        wrapper = document.getElementById('webgl');

        scene = new THREE.Scene();

        renderer = new THREE.WebGLRenderer();
        renderer.setClearColor(RENDERER_PARAM.clearColor);
        renderer.setSize(RENDERER_PARAM.width, RENDERER_PARAM.height);
        wrapper.appendChild(renderer.domElement);

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

        geometry = new THREE.BoxGeometry(1.0, 1.0, 1.0);
        material = new THREE.MeshBasicMaterial(MATERIAL_PARAM);

        box = new THREE.Mesh(geometry, material);
        scene.add(box);

        controls = new THREE.OrbitControls(camera, renderer.domElement);
        scene.add(controls);

        axesHelper = new THREE.AxesHelper(5);
        scene.add(axesHelper);

    }

    function render() {

        if (escape) {
            return;
        }

        requestAnimationFrame(render)

        controls.update();

        renderer.render(scene, camera);

    }



    function setEvent() {

        document.addEventListener('keydown', (e) => {

            escape = e.code === 'Escape';

        });

    }


})();