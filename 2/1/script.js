;(() => {

    document.addEventListener('DOMContentLoaded', () => {

        init();

        render();

    });

    let wrapper;

    let escape = false;
    let isActive = false

    let scene;
    let camera;
    let renderer;
    let geometry;
    let material;
    let torusArray;
    let axesHelper;
    let controls;
    let directionalLight;
    let ambientLight;

    // カメラに関するパラメーター
    const aspect = window.innerWidth / window.innerHeight;
    const scale = 10.0;
    const horizontal = scale * aspect;
    const vertical = scale;
    const CAMERA_PARAM = {
        left: -horizontal,
        right: horizontal,
        top: vertical,
        bottom: -vertical,
        near: 0.1,
        far: 50.0,
        x: 0.0,
        y: 5.0,
        z: 20.0,
        lookAt: new THREE.Vector3(0.0, 0.0, 0.0)
    };

    const RENDERER_PARAM = {
        clearColor: 0x333333,
        width: window.innerWidth,
        height: window.innerHeight
    };

    const MATERIAL_PARAM = {
        color: 0x00ff77,
        specular: 0xffffff
    };

    const DIRECTIONAL_LIGHT_PARAM = {
        color: 0x00ff00,
        intensity: 1.0,
        x: 0.0,
        y: 1.0,
        z: 1.0,
    };

    const AMBIENT_LIGHT_PARAM = {
        color: 0xffffff,
        intensity: 0.4
    };

    function init() {

        wrapper = document.getElementById('webgl');

        scene = new THREE.Scene();

        renderer = new THREE.WebGLRenderer();
        renderer.setClearColor(new THREE.Color(RENDERER_PARAM.clearColor));
        renderer.setSize(RENDERER_PARAM.width, RENDERER_PARAM.height);
        wrapper.appendChild(renderer.domElement);

        camera = new THREE.OrthographicCamera(
            CAMERA_PARAM.left,
            CAMERA_PARAM.right,
            CAMERA_PARAM.top,
            CAMERA_PARAM.bottom,
            CAMERA_PARAM.near,
            CAMERA_PARAM.far,
        );
        camera.position.set(
            CAMERA_PARAM.x,
            CAMERA_PARAM.y,
            CAMERA_PARAM.z,
        );
        camera.lookAt(CAMERA_PARAM.lookAt);

        material = new THREE.MeshPhongMaterial(MATERIAL_PARAM);

        geometry = new THREE.TorusGeometry(1.0, 0.4, 32, 32);

        torusArray = [];

        const COUNT = 20;
        for (let i = 0; i < COUNT; i++) {
            const torus = new THREE.Mesh(geometry, material);
            torus.position.x = Math.random() * 10.0 - 5.0;
            torus.position.y = Math.random() * 10.0 - 5.0;
            torus.position.z = Math.random() * 20.0 - 10.0;
            torusArray.push(torus);
            scene.add(torus);
        }

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

        ambientLight = new THREE.AmbientLight(
            AMBIENT_LIGHT_PARAM.color,
            AMBIENT_LIGHT_PARAM.intensity
        );
        scene.add(ambientLight);


    }

    function render() {

        if (escape) {
            return;
        }

        requestAnimationFrame(render);

        renderer.render(scene, camera);

    }




})();