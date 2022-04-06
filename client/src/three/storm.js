import * as THREE from '../../node_modules/three/build/three.module.js';
let scene,camera, renderer, cloudParticles = [], flash, rain, rainGeo, rainCount = 15000;
let velocity = 2;
let velocityMin = 2;
let velocityMax = 10;
let velocityChange = 0;
function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(60,window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 1;
    camera.rotation.x = 1.16;
    camera.rotation.y = -0.12;
    camera.rotation.z = 0.27;
    let ambient = new THREE.AmbientLight(0x555555);
    scene.add(ambient);
    let directionalLight = new THREE.DirectionalLight(0xffeedd);
    directionalLight.position.set(0,0,1);
    scene.add(directionalLight);
    flash = new THREE.PointLight(0x062d89, 30, 500 ,1.7);
    flash.position.set(200,300,100);
    scene.add(flash);
    renderer = new THREE.WebGLRenderer();
    scene.fog = new THREE.FogExp2(0x11111f, 0.002);
    renderer.setClearColor(scene.fog.color);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    rainGeo = new THREE.BufferGeometry();
    const pointsArray = [];
    for(let i=0;i<rainCount;i++) {
        pointsArray.push(Math.random() * 400 -200);
        pointsArray.push(Math.random() * 500 - 250);
        pointsArray.push(Math.random() * 400 - 200);
    }
    // for the bufferGeometry of three, we need to define it vertex, uv... with float 32 array
    //then we set it as the attribute
    const vertexArray = new Float32Array(pointsArray);
    rainGeo.setAttribute( 'position', new THREE.BufferAttribute( vertexArray, 3 ) );
    const rainMaterial = new THREE.PointsMaterial({
        color: 0xaaaaaa,
        size: 0.1,
        transparent: true
    });
    rain = new THREE.Points(rainGeo,rainMaterial);
    scene.add(rain);
    let loader = new THREE.TextureLoader();
    loader.load("https://i.postimg.cc/TYvjnH2F/smoke-1.png", function(texture){
        const cloudGeo = new THREE.PlaneBufferGeometry(500,500);
        const cloudMaterial = new THREE.MeshLambertMaterial({
            map: texture,
            transparent: true
        });
        for(let p=0; p<25; p++) {
            let cloud = new THREE.Mesh(cloudGeo,cloudMaterial);
            cloud.position.set(
                Math.random()*800 -400,
                500,
                Math.random()*500 - 450
            );
            cloud.rotation.x = 1.16;
            cloud.rotation.y = -0.12;
            cloud.rotation.z = Math.random()*360;
            cloud.material.opacity = 0.6;
            cloudParticles.push(cloud);
            scene.add(cloud);
        }
    });
}
function animate() {
    if(velocity<velocityMin) {
        velocity = velocityMin;
    }else if(velocity>velocityMax){
        velocity = velocityMax;
    }else{
        velocity += velocityChange;
    }
    cloudParticles.forEach(p => {
        p.rotation.z -=0.002;
    });
    //to get the vertex information, we go to the attribute position and get the original array
    let newArray = new Float32Array(rainGeo.attributes.position.array)
    for(let i=0; i<newArray.length;++i){
        if(i%3===1){
            newArray[i]-=Math.random()*velocity;
            if(newArray[i]<=-200){
                newArray[i] = 200;
            }
        }
    }
    //by resetting the attribute, we get the new geometry
    rainGeo.setAttribute( 'position', new THREE.BufferAttribute( newArray, 3 ) );
    rain.rotation.y +=0.002;
    if(Math.random() > 0.93 || flash.power > 100) {
        if(flash.power < 100)
            flash.position.set(
                Math.random()*400,
                300 + Math.random() *200,
                100
            );
        flash.power = 50 + Math.random() * 500;
    }
    renderer.render(scene, camera);
    console.log(velocity);
    requestAnimationFrame(animate);
}
function onDocumentmousedown(event){
    velocityChange = 0.05;
}
document.addEventListener('mousedown', onDocumentmousedown);
function onDocumentmouseup(event){
    velocityChange = -0.05;
}
document.addEventListener('mouseup', onDocumentmouseup);
init();
animate()