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
    let camera;
    let renderer;
    let geometry;
    let material;
    let pointMaterial;
    let box;
    let sphere;
    let pointSphere;
    let cone;
    let torus;
    let plane;
    let directionalLight;
    let ambientLight;

    let axesHelper;
    let controls;

    // カメラに関するパラメーター
    const aspect = window.innerWidth / window.innerHeight;      // アスペクト比（高さに対する幅の値）
    const scale = 5.0;                                         // 切り取る空間の広さ（スケール）
    const horizontal = scale * aspect;
    const vertical = scale;
    const CAMERA_PARAM = {
        left: -horizontal,                                      // 切り取る空間の左端
        right: horizontal,                                      // 切り取る空間の右端
        top: vertical,                                          // 切り取る空間の上端
        bottom: -vertical,                                      // 切り取る空間の下端
        near: 0.1,
        far: 15,
        x: -5.0,
        y: 2.0,
        z: 2.0,
        lookAt: new THREE.Vector3(0.0, 0.0, 0.0)
    };

    const RENDERER_PARAM = {
        clearColor: 0x333333,
        width: window.innerWidth,
        height: window.innerHeight
    };

    const MATERIAL_PARAM = {
        color: 0x0066ff,
        specular: 0xff0000
    };

    const POINT_MATERIAL_PARAM = {
        color: 0x0066ff,
        size: 0.1
    };

    const DIRECTIONAL_LIGHT_PARAM = {
        color: 0xffffff,
        intensity: 0.8,
        x: 2.0,
        y: 0.0,
        z: 4.0,
    };

    const AMBIENT_LIGHT_PARAM = {
        color: 0xff0000,
        intensity: 0.2
    };

    function init() {

        wrapper = document.getElementById('webgl');

        scene = new THREE.Scene();

        renderer = new THREE.WebGLRenderer();
        renderer.setClearColor(RENDERER_PARAM.clearColor);
        renderer.setSize(
            RENDERER_PARAM.width,
            RENDERER_PARAM.height
        );
        wrapper.appendChild(renderer.domElement);

        camera = new THREE.OrthographicCamera(
            CAMERA_PARAM.left,
            CAMERA_PARAM.right,
            CAMERA_PARAM.top,
            CAMERA_PARAM.bottom,
            CAMERA_PARAM.near,
            CAMERA_PARAM.far
        );
        camera.position.set(
            CAMERA_PARAM.x,
            CAMERA_PARAM.y,
            CAMERA_PARAM.z,
        );
        camera.lookAt(CAMERA_PARAM.lookAt);

        geometry = new THREE.BoxGeometry(1.0, 1.0, 1.0);
        material = new THREE.MeshPhongMaterial(MATERIAL_PARAM);
        box = new THREE.Mesh(geometry, material);
        scene.add(box);

        // さまざまなジオメトリを追加
        // 丸
        for (let i = 0; i < 10; i++) {
            geometry = new THREE.SphereGeometry(0.2, 400, 400);
            sphere = new THREE.Points(geometry, material);
            sphere.position.set(-2 + i, 0.75 + i / 4, 0);
            scene.add(sphere);
        }

        pointMaterial = new THREE.PointsMaterial(POINT_MATERIAL_PARAM);

        geometry = new THREE.SphereGeometry(0.5, 16, 16);
        pointSphere =  new THREE.Points(geometry, pointMaterial);
        pointSphere.position.set(0, 2, 0);
        scene.add(pointSphere);


        pointMaterial = new THREE.PointsMaterial(POINT_MATERIAL_PARAM);

        geometry = new THREE.SphereGeometry(0.5, 16, 16);
        pointSphere =  new THREE.Points(geometry, pointMaterial);
        pointSphere.position.set(0, 2, 0);
        scene.add(pointSphere);


        // コーン
        geometry = new THREE.ConeGeometry(0.5, 1.0, 16);
        cone = new THREE.Line(geometry, material);
        cone.position.set(-1.5, 0.5, 1.5);
        scene.add(cone);

        // トーラス（ドーナツみたいなやつ）
        geometry = new THREE.TorusGeometry(0.25, 0.1, 12, 48);
        torus = new THREE.Line(geometry, material);
        torus.position.set(2, 2, 1);
        scene.add(torus);

        // プレーン（板）
        geometry = new THREE.PlaneGeometry(1, 1);
        plane = new THREE.Mesh(geometry, material);
        plane.rotation.x = -Math.PI / 4.0;
        plane.position.set(2, 0, 0.5);
        scene.add(plane);

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


        ambientLight = new THREE.AmbientLight(AMBIENT_LIGHT_PARAM);
        scene.add(ambientLight);

        axesHelper = new THREE.AxesHelper(5);
        scene.add(axesHelper);

        controls = new THREE.OrbitControls(camera,  renderer.domElement);

    }

    function render() {

        if (escape) {
            return;
        }

        requestAnimationFrame(render);

        controls.update();

        box.rotation.y += 0.01;
        sphere.rotation.y += 0.01;
        pointSphere.rotation.y += 0.01;
        cone.rotation.y += 0.01;
        torus.rotation.y += 0.01;
        plane.rotation.y += 0.01;

        if (isActive) {
            box.rotation.y += 0.02;
            sphere.rotation.y += 0.02;
            pointSphere.rotation.y += 0.02;
            cone.rotation.y += 0.02;
            torus.rotation.y += 0.02;
            plane.rotation.x += 0.02;
        }

        renderer.render(scene, camera);

    }

    function setEvent() {

        window.addEventListener('keydown', (e) => {

            switch (e.code) {
                case 'Escape':
                    escape = true;
                    break;
                case 'Space':
                    isActive = true;
                    break;
                default:
                    // デフォルトなし
            }

        });

        window.addEventListener('keyup', (e) => {

            isActive = false;

        });

        window.addEventListener('resize', () => {
            renderer.setSize(window.innerWidth, window.innerHeight);

            const aspect = window.innerWidth / window.innerHeight;
            const scale = 10.0;
            const horizontal = scale * aspect;
            const vertical = scale;

            camera.left = -horizontal;
            camera.right = horizontal;
            camera.top = vertical;
            camera.bottom = -vertical;

            camera.updateProjectionMatrix();
        });

    }



})();