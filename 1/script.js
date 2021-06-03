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
    let isActive = false;

    // three.js 用の変数
    let scene;
    let camera;
    let renderer;
    let geometry;
    let material;
    let box;
    let plane;
    let axesHelper;
    let controls;
    let directionalLight;
    let ambientLight;

    // パラメーター
    const CAMERA_PARAM = {
        fovy: 80,
        aspect: window.innerWidth / window.innerHeight,
        near: 0.1,
        far: 10.0,
        x: 0.5,
        y: 1.8,
        z: 3.0,
        lookAt: new THREE.Vector3(0.0, 0.0, 0.0) // 注視点（この場合、原点方向を見つめる）
    };
    const RENDERER_PARAM = {
        clearColor: 0x333333,       // 背景を描写する色
        width: window.innerWidth,   // 描写領域
        height: window.innerHeight  // 描写領域
    };
    const MATERIAL_PARAM = {
        color: 0x3333ff,        // マテリアル自体の色
        specular: 0x3300ff      // 反射光の色
    };
    const DIRECTIONAL_LIGHT_PARAM = {
        color: 0xffffff,
        intensity: 1.0,
        x: 1.0,
        y: 1.0,
        z: 1.0
    };
    const AMBIENT_LIGHT_PARAM = {
        color: 0xff0000,
        intensity: 0.2
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

        geometry = new THREE.BoxGeometry(0.1, 0.1, 0.1); // 骨格（サイズ）
        material = new THREE.MeshPhongMaterial(MATERIAL_PARAM);

        box = new THREE.Mesh(geometry, material);
        box.position.set(0.2, 2.0, -1.0);
        scene.add(box);

        // geometry = new THREE.PlaneGeometry(5, 5);
        // material = new THREE.MeshPhongMaterial({
        //         color: 0xffffff,
        //         specular: 0x009900
        // });
        // plane = new THREE.Mesh(geometry, material);
        // plane.position.set(1.0, 1.0, 0.0);
        // scene.add(plane);

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

        axesHelper = new THREE.AxesHelper(3);
        scene.add(axesHelper);

        controls = new THREE.OrbitControls(camera, renderer.domElement);

    }

    /**
     * レンダリング
     */
    function render() {

        if (!run) {
            return;
        }

        requestAnimationFrame(render);

        controls.update();

        if (isActive) {
            box.rotation.y += 0.05;
        }

        renderer.render(scene, camera);

    }

    /**
     * 包括的に 2 つの値の間のランダムな整数を得る
     * @param {number} min：デフォルト引数を0とする
     * @param {number} max：デフォルト引数を15とする
     * @returns {number}
     */
    function getRandomIntInclusiveForHex(min = 0, max = 15) {

        // 引数は0-15の間の数値のみ受け取る
        min =
            min < 0 ? 0
            : min > 15 ? 15
            : min;
        max =
            max < 0 ? 0
            : max > 15 ? 15
            : max;

        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
    }

    /**
     * イベント登録
     */
    function setEvent() {

        document.addEventListener('keydown', (e) => {

            if (e.code === 'Escape') {
                run = false;
            }

            if (e.code === 'Space') {
                isActive = true;
            }

        });

        document.addEventListener('keyup', (e) => {
            isActive = false;
        });

    }



})();