;(() => {

    document.addEventListener('DOMContentLoaded', () => {

        // init();

        setEvent();

        const loader = new THREE.TextureLoader();
        texture = loader.load('./sample.jpg', init);

        // render();

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
    let plane;
    let sphere;
    let bpx;
    let torus;
    let group;
    let directionalLight;
    let ambientLight;
    let texture;
    let composer;
    let renderPass;
    let glitchPass;
    let controls;
    let axesHelper;

    const SCENE_PARAM = {
        fogColor: 0xffffff,
        fogNear: 1.0,
        forFar: 15.0
    };

    const CAMERA_PARAM = {
        fovy: 60,
        aspect: window.innerWidth / window.innerHeight,
        near: 0.1,
        far: 100.0,
        x: 1.0,
        y: 5.0,
        z: 10.0,
        lookAt: new THREE.Vector3(0.0, 0.0, 0.0)
    };

    const RENDERER_PARAM = {
        clearColor: 0x000000,
        width: window.innerWidth,
        height: window.innerHeight
    };

    const MATERIAL_PARAM = {
        color: 0x33ff99,
        size: 0.1,
        sizeAttenuation: true
    };

    const DIRECTIONAL_LIGHT_PARAM = {
        color: 0xffffff,
        intensity: 1.0,
        x: 1.0,
        y: 1.0,
        z: 1.0,
    };

    const AMBIENT_LIGHT_PARAM = {
        color: 0xffffff,
        intensity: 0.2
    };

    function init() {

        wrapper = document.getElementById('webgl');

        scene = new THREE.Scene();
        scene.fog = new THREE.Fog(
            SCENE_PARAM.fogColor,
            SCENE_PARAM.fogNear,
            SCENE_PARAM.fogFar,
        );

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

        composer = new THREE.EffectComposer(renderer);
        renderPass = new THREE.RenderPass(scene, camera);
        composer.addPass(renderPass);
        glitchPass = new THREE.GlitchPass();
        composer.addPass(glitchPass);
        glitchPass.renderToScreen = true;

        group = new THREE.Group();

        material = new THREE.MeshPhongMaterial(MATERIAL_PARAM);
        material.map = texture;

        geometry = new THREE.BufferGeometry(2.0, 2.0);
        plane = new THREE.Mesh(geometry, material);
        plane.position.set(-2.0, 0.0, 2.0);
        group.add(plane);

        geometry = new THREE.PlaneGeometry(1.0, 16, 16);
        sphere = new THREE.Mesh(geometry, material);
        sphere.position.set(2.0, 0.0, 2.0);
        group.add(sphere);

        geometry = new THREE.BoxGeometry(1.0, 2.0, 3.0);
        box = new THREE.Mesh(geometry, material);
        box.position.set(2.0, 0.0, -2.0);
        group.add(box);

        geometry = new THREE.TorusGeometry(1.0, 0.4, 32, 32);
        torus = new THREE.Mesh(geometry, material);
        torus.position.set(-2.0, 0.0, -2.0);
        group.add(torus);

        scene.add(group);

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

        ambientLight = new THREE.AmbientLight(
            AMBIENT_LIGHT_PARAM.color,
            AMBIENT_LIGHT_PARAM.intensity
        );
        scene.add(ambientLight);

        controls = new THREE.OrbitControls(camera, renderer.domElement);

        axesHelper = new THREE.AxesHelper(5);
        scene.add(axesHelper);

        render();

    }

    function render() {

        if (escape) {
            return;
        }

        requestAnimationFrame(render);

        controls.update();

        if (isActive) {
            group.rotation.y += 0.2;
        }

        // scene.rotation.x += 0.0003;
        // scene.rotation.y += 0.0007;

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

        window.addEventListener('click', (e) => {


        });

    };

})();