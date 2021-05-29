;(() => {

    document.addEventListener('DOMContentLoaded', () => {

        init();

        setEscapeEvent();

        run = true;
        render();

    });

    let wrapper;

    let run = true;

    // three.js用変数
    // シーン
    // カメラ
    // レンダラ
    // ジオメトリ（骨格など）
    // マテリアル（質感や色）
    // ボックスメッシュ（ジオメトリ＋マテリアル？）
    let scene;
    let camera;
    let renderer;
    let geometry;
    let material;
    let box;

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
        color: 0xff3333
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
        material = new THREE.MeshBasicMaterial(MATERIAL_PARAM);

        // メッシュ初期化
        box = new THREE.Mesh(geometry, material);

        scene.add(box);
    }

    // 描画
    function render() {

        if (run === true) {
            console.log(Date.now());
            requestAnimationFrame(render)
        }

        renderer.render(scene, camera);
    }

    // キー押下でフラグ変更
    function setEscapeEvent() {
        document.addEventListener('keydown', (e) => {
            run = e.code!== 'Escape';
            console.log(run);
        });
    }

})();
