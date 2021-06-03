/**
 * カメラ移動を加えたもの（意図通りにならず）
 */
;(() => {

    document.addEventListener('DOMContentLoaded', () => {

        init();

        setEvent();

        render();

    });

    // DOM
    const wrapper = document.getElementById('webgl');

    // flags
    let escape = false;
    let isActive = false;

    // 色
    let materialR;
    let materialG;
    let materialB;

    // boxの数
    const BOX_LENGTH = 200;

    // カメラ移動に関する変数
    let cameraDir = 1;
    let cameraPosMax = 2;

    // three.js 用の変数
    let scene;
    let camera;
    let renderer;
    let geometry;
    let material;
    let boxs = [];
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
        y: 0.0,
        z: 4.4,
        lookAt: new THREE.Vector3(0.0, 0.0, 0.0) // 注視点（この場合、原点方向を見つめる）
    };
    const RENDERER_PARAM = {
        clearColor: 0x333333,       // 背景を描写する色
        width: window.innerWidth,   // 描写領域
        height: window.innerHeight  // 描写領域
    };

    const MATERIAL_PARAM = {
        color: null,        // マテリアル自体の色
        specular: 0x3300ff      // 反射光の色
    };
    const DIRECTIONAL_LIGHT_PARAM = {
        color: 0xffffff,
        intensity: 1.0,
        x: 0.0,
        y: 0.0,
        z: 10.0
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

        for (let i = 0; i < BOX_LENGTH; i++) {

            // カラーのRGBを指定
            materialR = getRandomIntInclusive(0, 10, true);
            materialG = getRandomIntInclusive(0, 10, true);
            materialB = getRandomIntInclusive(7, 15, true);

            // MATERIAL_PARAMに代入
            MATERIAL_PARAM.color = parseInt(`0x${materialR}${materialG}${materialB}`, 16);

            // geometryを作成
            // 骨格（サイズ）
            geometry = new THREE.BoxGeometry(
                getRandomIntInclusive(10, 20, false) / 100,
                getRandomIntInclusive(20, 30, false) / 100,
                getRandomIntInclusive(10, 20, false) / 100,
            );
            material = new THREE.MeshPhongMaterial(MATERIAL_PARAM);

            box = new THREE.Mesh(geometry, material);
            box.position.set(
                getRandomIntInclusive(-20, 20, false) / 10,
                getRandomIntInclusive(-20, 20, false) / 10,
                getRandomIntInclusive(-20, 20, false) / 10,
            );
            scene.add(box);
            boxs.push({
                box: box,
                rotationParam: getRandomIntInclusive(2, 4, false) / 100
            });

        }

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

        // エスケープ押下で処理終了
        if (escape) {
            return;
        }

        // 再帰呼び出し
        requestAnimationFrame(render);

        // コントロールの更新
        controls.update();

        // boxの回転
        for (let i = 0; i < BOX_LENGTH; i++) {
            boxs[i].box.rotation.y += boxs[i].rotationParam;
        }

        if (camera.position.x > cameraPosMax) {
            cameraDir = -1;
        } else if (camera.position.x < (cameraPosMax * -1)) {
            cameraDir = 1;
        }

        camera.position.x += (getRandomIntInclusive(1, cameraPosMax) / 100 * cameraDir);
        camera.position.y += (getRandomIntInclusive(1, cameraPosMax  *2) / 100 * cameraDir);
        camera.position.z -= (getRandomIntInclusive(1, cameraPosMax) / 100 * cameraDir);
        camera.updateProjectionMatrix();

        // スペースキー謳歌中の処理
        if (isActive) {
            // boxs[0].rotation.y += 0.05;
        }

        renderer.render(scene, camera);

    }

    /**
     * 包括的に 2 つの値の間のランダムな整数を得る
     * @param {number} min：デフォルト引数を0とする
     * @param {number} max：デフォルト引数を15とする
     * @param {boolean} forHex
     * @returns {number}
     */
    function getRandomIntInclusive(min = 0, max = 15, forHex = false) {

        // HEX値の計算の場合、引数は0-15の間の数値のみを有効とする
        if (forHex === true) {
            min =
                min < 0 ? 0
                    : min > 15 ? 15
                    : min;
            max =
                max < 0 ? 0
                    : max > 15 ? 15
                    : max;
        }

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
                escape = true;
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