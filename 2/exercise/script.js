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
    let materialPoint;
    let points
    let controls;
    let axesHelper;


    const CAMERA_PARAM = {
        fovy: 60,
        aspect: window.innerWidth / window.innerHeight,
        near: 0.1,
        far: 30.0,
        x: 1.0,
        y: 2.0,
        z: 15.0,
        lookAt: new THREE.Vector3(0.0, 0.0, 0.0)
    };

    const RENDERER_PARAM = {
        clearColor: 0x000000,
        width: window.innerWidth,
        height: window.innerHeight
    };

    const MATERIAL_PARAM = {
        color: 0xffffff,
        size: 0.25,
        sizeAttenuation: true
    };

    const SELECTED_MATERIAL_PARAM = {
        color: 0xffcccc,
        specular: 0xff0000
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

        geometry = new THREE.BufferGeometry();
        const COUNT = 10;
        const WIDTH = 10.0;
        const vertices = [];
        for (let i = 0; i < COUNT; ++i) {
            const x = (i / COUNT - 0.5) * WIDTH;
            for (let j = 0; j < COUNT; ++j) {
                const y = (j / COUNT - 0.5) * WIDTH;

                vertices.push(x, y, 0.0);
            }
        }

        const stride = 3;
        const attribute = new THREE.BufferAttribute(new Float32Array(vertices), stride);

        geometry.setAttribute('position', attribute);

        points = new THREE.Points(geometry, materialPoint);
        scene.add(points);

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