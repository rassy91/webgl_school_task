;(() => {

    document.addEventListener('DOMContentLoaded', () => {

        init();

        setEvent();

        render();

    });

    // DOM
    const wrapper = document.getElementById('webgl');

    // flags
    let run = true;

    // three.js 用の変数
    let scene;
    let camera;
    let renderer;
    let geometry;
    let material;
    let box;
    let axesHelper;

    // パラメーター
    const CAMERA_PARAM = {
        fovy: 60,
        aspect: window.innerWidth / window.innerHeight,
        near: 0.1,
        far: 15.0,
        x: 1.0,
        y: 1.0,
        z: 1.0,
        lookAt: new THREE.Vector3(0.0, 0.0, 0.0) // 注視点（この場合、原点方向を見つめる）
    };
    const RENDERER_PARAM = {
        clearColor: 0x333333,            // 背景を描写する色
        width: window.innerWidth,   // 描写領域
        height: window.innerHeight  // 描写領域
    };
    const MATERIAL_PARAM = {
        color: 0x44ff44
    };

    /**
     * 初期化
     */
    function init() {

        scene = new THREE.Scene();

        renderer = new THREE.WebGLRenderer();
        renderer.setClearColor(new THREE.Color(RENDERER_PARAM.clearColor));
        renderer.setSize(RENDERER_PARAM.width, RENDERER_PARAM.height);
        wrapper.appendChild(renderer.domElement);

        camera = new THREE.PerspectiveCamera(CAMERA_PARAM.fovy, CAMERA_PARAM.aspect, CAMERA_PARAM.near, CAMERA_PARAM.far);
        camera.position.set(CAMERA_PARAM.x, CAMERA_PARAM.y, CAMERA_PARAM.z);
        camera.lookAt(CAMERA_PARAM.lookAt);

        geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5); // 骨格（サイズ）
        material = new THREE.MeshBasicMaterial(MATERIAL_PARAM);

        box = new THREE.Mesh(geometry, material);
        scene.add(box);

        axesHelper = new THREE.AxesHelper(5);
        scene.add(axesHelper);

    }

    /**
     * レンダリング
     */
    function render() {

        if (!run) {
            return;
        }

        requestAnimationFrame(render);

        renderer.render(scene, camera);

    }

    function setEvent() {

        document.addEventListener('keydown', (e) => {

            if (e.code === 'Escape') {
                run = false;
            }

        });

    }



})();