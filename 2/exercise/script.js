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
    let renderer;
    let camera;
    let geometry;
    let material;
    let torus;
    let torusArray;
    let dirs;
    let group;
    let directionalLight;
    let ambientLight;
    let controls;
    let axesHelper;

    const CAMERA_PARAM = {
        fovy: 60,
        aspect: window.innerWidth / window.innerHeight,
        near: 0.1,
        far: 20.0,
        x: 1.0,
        y: 2.0,
        z: 12.0,
        lookAt: new THREE.Vector3(1.0, 1.0, 1.0)
    };

    const RENDERER_PARAM = {
        clearColor: 0x333333,
        width: window.innerWidth,
        height: window.innerHeight
    };

    const MATERIAL_PARAM = {
        color: 0xffffff,
        specular: 0xff0000
    };

    const DIRECTIONAL_LIGHT_PARAM = {
        color: 0x00ff0ff,
        intensity: 0.8,
        x: 1.0,
        y: 0.0,
        z: 5.0
    };

    const AMBIENT_LIGHT_PARAM = {
        color: 0xeeeeee,
        intensity: 0.2
    };

    function init() {

        wrapper = document.getElementById('webgl');

        scene = new THREE.Scene();

        renderer = new THREE.WebGLRenderer();
        renderer.setClearColor(RENDERER_PARAM.clearColor);
        renderer.setSize(
            RENDERER_PARAM.width,
            RENDERER_PARAM.height,
        );
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

        group = new THREE.Group();

        geometry = new THREE.TorusGeometry(0.5, 0.2, 16, 48);
        material = new THREE.MeshPhongMaterial(MATERIAL_PARAM);

        torusArray = [];
        dirs = [];

        for (let i = 0; i < 20; i++) {
            torus = new THREE.Mesh(geometry, material);

            torus.position.set(
                Math.random() * 10.0 - 5.0,
                Math.random() * 10.0 - 5.0,
                Math.random() * 10.0 - 5.0,
            );

            const scale = Math.random() * 0.5 + 0.5;
            torus.scale.setScalar(scale);
            group.add(torus);

            torusArray.push(torus);

            const dir = Math.random() < 0.5 ? -1 : 1;
            dirs.push(dir);
        }
        scene.add(group);

        directionalLight = new THREE.DirectionalLight(
            DIRECTIONAL_LIGHT_PARAM.color,
            DIRECTIONAL_LIGHT_PARAM.intensity
        );
        directionalLight.position.set(
            DIRECTIONAL_LIGHT_PARAM.x,
            DIRECTIONAL_LIGHT_PARAM.y,
            DIRECTIONAL_LIGHT_PARAM.z
        );
        scene.add(directionalLight);

        ambientLight = new THREE.AmbientLight(
            AMBIENT_LIGHT_PARAM.color,
            AMBIENT_LIGHT_PARAM.intensity,
        );
        scene.add(ambientLight);

        controls = new THREE.OrbitControls(camera, renderer.domElement);

        axesHelper = new THREE.AxesHelper(5);
        scene.add(axesHelper);

    }

    function render() {

        if (escape) {
            return;
        }

        requestAnimationFrame(render);

        controls.update();

        group.rotation.y += 0.01;

        if (isActive) {
            torusArray.forEach((el, i) => {
                el.rotation.x += dirs[i] * Math.random() / 20;
            });
        }

        renderer.render(scene, camera);

    }

    function setEvent() {

        window.addEventListener('keydown', (e) => {

            if (e.code === 'Escape') {
                escape = true;
            }

            if(e.code === 'Space') {
                isActive = true;
            }

        });

        window.addEventListener('keyup', (e) => {
            isActive = false;
        });

        window.addEventListener('resize', () => {
            renderer.setSize(window.innerWidth, window.innerHeight);
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
        });

    };

})();