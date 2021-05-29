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

    let dir = 1;
    let dir2 = 1;

    // three.js用変数
    let scene;
    let camera;
    let renderer;
    let geometry;
    let material;
    let box;                // ボックスメッシュ
    let sphere;             // スフェアメッシュ（球）
    let cone;               // コーンメッシュ
    let torus;              // トーラスメッシュ（ドーナツ）
    let plane;              // プレーンメッシュ（平面）
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
        fovy: 60,
        aspect: window.innerWidth / window.innerHeight,
        near: 0.1,
        far: 30,
        // カメラの位置
        x: 2.0,
        y: 4.0,
        z: 6.0,
        // 原点座標を向かせるパラメーター？
        lookAt: new THREE.Vector3(0.0, 0.0, 0.0)
    };

    const RENDERER_PARAM = {
        clearColor: 0x333333,
        width: window.innerWidth,
        height: window.innerHeight
    };

    const MATERIAL_PARAM  = {
        color: 0xff7777,
        specular: 0xffffff
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

        // マテリアル初期化
        material = new THREE.MeshPhongMaterial(MATERIAL_PARAM);

        // ボックスジオメトリ生成
        geometry = new THREE.BoxGeometry(1.0, 1.0, 1.0);
        box = new THREE.Mesh(geometry, material);
        box.position.x = 1;
        box.position.y = 1;
        scene.add(box);

        // スフェアジオメトリ生成
        geometry = new THREE.SphereGeometry(0.8, 20.0, 20.0);
        sphere = new THREE.Mesh(geometry, material);
        sphere.position.x = -1;
        sphere.position.y = -1;
        sphere.position.z = 1;
        scene.add(sphere);

        // コーンジオメトリ生成
        geometry = new THREE.ConeGeometry(0.8, 2.0, 32.0);
        cone = new THREE.Mesh(geometry, material);
        cone.position.x = -2;
        cone.position.z = -2;
        scene.add(cone);

        // トーラスジオメトリを生成
        geometry = new THREE.TorusGeometry(0.5, 0.2, 12, 12);
        torus = new THREE.Mesh(geometry, material);
        torus.position.x = 1;
        torus.position.y = 3;
        scene.add(torus);

        // プレーンジオメトリを生成
        geometry = new THREE.PlaneGeometry(4, 4);
        plane = new THREE.Mesh(geometry, material);
        plane.position.z = 4;
        scene.add(plane);

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
            // box.rotation.x -= 0.05;
            box.rotation.y += 0.05;
            // box.rotation.z += 0.05;

            sphere.rotation.x += 0.5;
            if (sphere.position.x >= 3) {
                dir = -1;
            } else if (sphere.position.x <= -3) {
                dir = 1;
            }
            sphere.position.x += 0.05 * dir;

            if (cone.scale.y >= 1.5) {
                dir2 = -1;
            }  else if (cone.scale.y <= 0.5) {
                dir2 = 1;
            }
            cone.scale.y += 0.02 * dir2;

            torus.rotation.x += 0.05;
            // torus.rotation.y += 0.05;

            plane.position.z -= 0.01;
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
