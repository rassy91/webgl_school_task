;(() => {

    document.addEventListener('DOMContentLoaded', () => {

        init();

        setEvents();

        run = true;
        render();

    });

    let wrapper;

    let run = true;
    let isActive = false;

    // three.js用変数
    let scene;
    let camera;
    let renderer;
    let geometry;
    let material;
    let box;
    let controls;
    let axesHelper;         // 軸ヘルパーメッシュ
    let directionalLight;   // 平行光源
    let ambientLight;       // 環境光

    // 各オブジェクト用パラメーター
    // カメラ
    // レンダラ
    // マテリアル
    const CAMERA_PARAM = {
        // 表示領域（高さ）の角度
        fovy: 40,
        aspect: window.innerWidth / window.innerHeight,
        near: 0.1,
        far: 15,
        // カメラの位置
        x: 2.0,
        y: 4.0,
        z: 6.0,

        lookAt: new THREE.Vector3(0.0, 1.0, 0.0)
    };

    const RENDERER_PARAM = {
        clearColor: 0x333333,
        width: window.innerWidth,
        height: window.innerHeight
    };

    const MATERIAL_PARAM  = {
        color: 0xff7777
    };

    const DIRECTIONAL_LIGHT_PARAM = {
        color: 0xffffff,
        intensity: 0.8,     // 光の強さ
        x: 1.0,             // 光の向き
        y: 1.0,
        z: 1.0,
    };

    const AMBIENT_LIGHT = {
        color: 0xffffff,
        intensity: 0.4
    };

    // 初期化
    function init() {

        wrapper = document.getElementById('webgl');

        // シーングラフを作成
        scene = new THREE.Scene();

        // レンダラを初期化
        renderer = new THREE.WebGLRenderer();
        renderer.setClearColor(new THREE.Color(RENDERER_PARAM.clearColor));
        renderer.setSize(RENDERER_PARAM.width, RENDERER_PARAM.height);
        wrapper.appendChild(renderer.domElement);

        // カメラ初期化
        camera = new THREE.PerspectiveCamera(
            CAMERA_PARAM.fovy,
            CAMERA_PARAM.aspect,
            CAMERA_PARAM.near,
            CAMERA_PARAM.far
        );
        camera.position.set(CAMERA_PARAM.x, CAMERA_PARAM.y, CAMERA_PARAM.z);
        camera.lookAt(CAMERA_PARAM.lookAt);

        // ジオメトリとマテリアル初期化
        geometry = new THREE.BoxGeometry(1.0, 1.0, 1.0);
        material = new THREE.MeshLambertMaterial(MATERIAL_PARAM);

        // ライトオブジェクトを作成（平行光線）
        directionalLight = new THREE.DirectionalLight(
            DIRECTIONAL_LIGHT_PARAM.color,
            DIRECTIONAL_LIGHT_PARAM.intensity
        );
        directionalLight.position.x = DIRECTIONAL_LIGHT_PARAM.x;
        directionalLight.position.y = DIRECTIONAL_LIGHT_PARAM.y;
        directionalLight.position.z = DIRECTIONAL_LIGHT_PARAM.z;
        scene.add(directionalLight);

        // ライトオブジェクトを作成（環境光）
        ambientLight = new THREE.AmbientLight(
            AMBIENT_LIGHT.color,
            AMBIENT_LIGHT.intensity
        );
        scene.add(ambientLight);

        // メッシュ初期化
        box = new THREE.Mesh(geometry, material);
        scene.add(box);

        // コントロールを初期化
        controls = new THREE.OrbitControls(camera, renderer.domElement);

        // ヘルパー軸を追加
        axesHelper = new THREE.AxesHelper(5.0);
        scene.add(axesHelper);
    }

    // 描画
    function render() {

        if (run === true) {
            requestAnimationFrame(render)
        }

        // コントロールを追加
        controls.update();

        // スペースキー押下中、ボックスを回転
        if (isActive === true) {
            box.rotation.x -= 0.05;
            // box.rotation.y += 0.05;
            box.rotation.z += 0.05;
        }

        renderer.render(scene, camera);
    }

    // キー押下でフラグ変更
    function setEvents() {
        document.addEventListener('keydown', (e) => {

            switch (e.code) {
                case 'Escape':
                    run = false;
                    break;
                case 'Space':
                    isActive = true;
                    break;
                default:
                    // デフォルトなし
            }

        });

        document.addEventListener('keyup', (e) => {

            isActive = false;

        });
    }

})();
