import * as THREE from '../../node_modules/three/build/three.module.js';
import {PCFSoftShadowMap} from '../../node_modules/three/build/three.module.js';
import Stats from '../../node_modules/three/examples/jsm/libs/stats.module.js';
import { OrbitControls } from '../../node_modules/three/examples/jsm/controls/OrbitControls.js';
const nameList = ['Wenxin', 'Keji', "Jianyue", "Xiqing", "Qingxin", "Fugu", "Shangwu", "Xuanku", "Menghuan"];
const candidate = [nameList[Math.floor(Math.random()*10)], nameList[Math.floor(Math.random()*10)], nameList[Math.floor(Math.random()*10)]];
let camera, scene, renderer, rayCaster, controls;
let stats, container;
let INTERSECTED;
let num = 3;
const posterPairs = [];
const pointer = new THREE.Vector2();
const boxBound = new THREE.Box3(new THREE.Vector3(-8, -4, 2), new THREE.Vector3(8, 4, num*3+14));
const inter = new THREE.Group();
//set the outside of the gallery
let box = new THREE.BoxGeometry(30, 15, num*3+16);
const outside = new THREE.Mesh( box, new THREE.MeshPhongMaterial( { color: 0xffffff } ) );
outside.position.x = 0;
outside.position.y = 0;
outside.position.z = num*3/2+8;
//object.rotation.x= -Math.PI/2;
outside.receiveShadow = true;
outside.material.side = THREE.DoubleSide;
init();
animate();

function loadText(text, x, y, z, angle, i){
    let loader = new THREE.FontLoader();
    loader.load( '../../node_modules/three/examples/fonts/optimer_bold.typeface.json', function ( font ) {

        let textGeometry = new THREE.TextBufferGeometry( text, {
            font: font,
            size: 1,
            height: 0.1,
            /*curveSegments: 12,
            bevelEnabled: true,
            bevelThickness: 10,
            bevelSize: 8,
            bevelSegments: 5*/
        } );
        textGeometry.computeBoundingBox();
        let mesh = new THREE.Mesh(textGeometry, new THREE.MeshLambertMaterial({color:0xffffff}));
        mesh.material.emissive.setHex(0xffffff);
        mesh.position.x = -text.length/3;
        mesh.position.y = 0;
        mesh.position.z = 0;
        let pivot = new THREE.Object3D();
        pivot.position.set(x, y, z);
        scene.add(pivot);
        pivot.add(mesh);
        console.log(mesh.position);
        pivot.rotation.y = angle;
        posterPairs[i]["text"] = mesh;
    } );
}

function init() {
    //number of the recommended posters
    //initialize container
    container = document.createElement('div');
    document.body.appendChild(container);

    //initialize the camera
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
    camera.setLens(8);
    //camera.lookAt(new THREE.Vector3(0, 0, 0));
    camera.position.set(0, 0, num*3+14);
    //initialize the scene
    scene = new THREE.Scene();
    scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    scene.add(outside);
    //initialize the renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = PCFSoftShadowMap;
    document.body.appendChild(renderer.domElement);
    //add orbital controls to the camera
    controls = new OrbitControls( camera, renderer.domElement );
    controls.update();
    //initialize raycaster
    rayCaster = new THREE.Raycaster();
    //save the current render situation
    container.appendChild(renderer.domElement);
    stats = new Stats();
    container.appendChild(stats.dom);
    //add listener to the mouse move
    document.addEventListener('mousemove', onPointerMove);

    function onPointerMove(event) {
        pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
        pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
    }
    //initialize poster and light array
    for (let i = 0; i < num; i++) {
        let plane = new THREE.PlaneGeometry(5, 4, 32);
        const texture = new THREE.TextureLoader().load("./"+candidate[i]+".png");

        //now just set the material and color as random
        const object = new THREE.Mesh(plane, new THREE.MeshLambertMaterial({color: 0xffffff, map: texture, emissiveIntensity: 0.5,emissive: 0xffffff, emissiveMap: texture}));
        //set the position ans rotation of the objects
        object.position.x = 5 * Math.pow(-1, i % 2);
        object.position.y = 0;
        object.position.z = num*3+8-3*i;
        object.rotation.y = -Math.PI / 6 * Math.pow(-1, i % 2);
        object.castShadow = true;
        object.material.side = THREE.DoubleSide;
        inter.add(object);

        //set the position of the spot light
        const spotLight = new THREE.SpotLight(0xffffff, 0.1);
        spotLight.position.x = 5 * Math.pow(-1, i % 2);
        spotLight.position.y = 4;
        spotLight.position.z = num*3+8-3*i;
        spotLight.angle = Math.PI/6;
        spotLight.penumbra = 0.5;
        let lightTarget = new THREE.Object3D();
        lightTarget.position.x = 5 * Math.pow(-1, i % 2);
        lightTarget.position.y = -4;
        lightTarget.position.z = num*3+8-3*i;
        scene.add(lightTarget);
        spotLight.target = lightTarget;
        spotLight.castShadow = true;
        scene.add(spotLight);
        //var helper = new THREE.CameraHelper( spotLight.shadow.camera );
        //scene.add( helper );
        posterPairs[i] = {poster: object, light: spotLight};
        loadText(candidate[i], 5 * Math.pow(-1, i % 2), 3, num*3+8-3*i, -Math.PI / 6 * Math.pow(-1, i % 2), i);
    }
    scene.add(inter);
}

function animate() {
    requestAnimationFrame(animate);
    if(camera.position.x > boxBound.max.x){
        camera.position.x = boxBound.max.x;
    }

    if(camera.position.x < boxBound.min.x){
        camera.position.x = boxBound.min.x;
    }

    if(camera.position.z > boxBound.max.z){
        camera.position.z = boxBound.max.z;
    }

    if(camera.position.z < boxBound.min.z){
        camera.position.z = boxBound.min.z;
    }

    if(camera.position.y > boxBound.max.y){
        camera.position.y = boxBound.max.y;
    }

    if(camera.position.y < boxBound.min.y){
        camera.position.y = boxBound.min.y;
    }
    controls.update();
    render();
    stats.update();
}

function render(){
    rayCaster.setFromCamera( pointer, camera );

    const intersects = rayCaster.intersectObjects( inter.children );
    //find the first object intersected and let it emit red color
    if ( intersects.length > 0) {
        if ( INTERSECTED !== intersects[0].object) {
            if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );
            INTERSECTED = intersects[0].object;
            INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
            INTERSECTED.material.emissive.setHex( 0xff0000 );
            let ind = (num*3+8-INTERSECTED.position.z)/3;
            posterPairs[ind].light.intensity = 0.5;
            posterPairs[ind]["text"].material.emissive.setHex( 0xff0000 );
            //set the case when some object is selected and the mouse clicked
            document.onclick = function (e){
                console.log("./"+candidate[ind]+".html");
                window.open("./"+candidate[ind]+".html");
            }
        }
    //recome to the original color
    } else {
        if ( INTERSECTED ) {
            INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);
            let ind = (num * 3 + 8 - INTERSECTED.position.z) / 3;
            posterPairs[ind].light.intensity = 0.1;
            posterPairs[ind]["text"].material.emissive.setHex( 0xffffff );
            INTERSECTED = null;
        }
    }
    renderer.render(scene, camera);
}
