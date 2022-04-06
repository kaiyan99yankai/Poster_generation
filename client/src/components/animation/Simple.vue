<template>
  <div>
    <canvas id="container"></canvas>
  </div>
</template>
<script>
import * as THREE from '../../../node_modules/three/build/three.module.js';
import {GUI} from '../../../node_modules/three/examples/jsm/libs/dat.gui.module.js';
//import SimplexNoise from '../../../node_modules/simplex-noise/simplex-noise.js';
export default {
  name: 'simple',
  methods: {
    init: function () {
      let light1, light2, light3, light4;
      let renderer, scene, camera;
      let width, height, wWidth, wHeight;
	  let light1_color = Math.random() * 0xffffff;
      let light2_color = Math.random() * 0xffffff;
      let light3_color = Math.random() * 0xffffff;
      let light4_color = Math.random() * 0xffffff;
	  let controls = new function(){
            this.light1 = light1_color;
            this.light2 = light2_color;
            this.light3 = light3_color;
            this.light4 = light4_color;
      }
      let plane;
      //the original simplex-noise js does not export the default variables, need to export them
      var SimplexNoise = require('simplex-noise');
	  const simplex = new SimplexNoise(Math.random);

      const mouse = new THREE.Vector2();
      const mousePlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
      const mousePosition = new THREE.Vector3();
      const raycaster = new THREE.Raycaster();
      //connect the renderer with the canvas
      renderer = new THREE.WebGLRenderer({canvas: document.getElementById("container"), antialias: true, alpha: true});
      camera = new THREE.PerspectiveCamera(75);
      camera.position.z = 75;
      //update the renderer and camera szie as the window size change
      updateSize();
      window.addEventListener('resize', updateSize, false);
      document.addEventListener('mousemove', e => {
        const v = new THREE.Vector3();
        //give the vector the direction camera looks at
        camera.getWorldDirection(v);
        v.normalize();
        //set the mouse plane normal to the camera
        mousePlane.normal = v;
        mouse.x = (e.clientX / width) * 2 - 1;
        mouse.y = -(e.clientY / height) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);
        //get the mouse position with raycaster by detcting the intersect of the camera mouse line and the mouse plane
        raycaster.ray.intersectPlane(mousePlane, mousePosition);
      })

      function initScene() {
        scene = new THREE.Scene();
        initLights();

        let mat = new THREE.MeshLambertMaterial({color: 0xffffff, side: THREE.DoubleSide});
        let geo = new THREE.PlaneBufferGeometry(wWidth, wHeight, wWidth, wHeight);
        plane = new THREE.Mesh(geo, mat);
        scene.add(plane);

        plane.rotation.x = -Math.PI / 2 + 0.3;
        plane.position.y = 0;
        camera.position.z = 60;
      }

      function initLights() {
        const r = 30;
        const y = 10;
        const lightDistance = 500;

        // light = new THREE.AmbientLight(conf.ambientColor);
        // scene.add(light);
		light1_color = Math.random() * 0xffffff;
        light2_color = Math.random() * 0xffffff;
        light3_color = Math.random() * 0xffffff;
        light4_color = Math.random() * 0xffffff;
		let gui = new GUI();
		gui.addColor(controls, 'light1');
		gui.addColor(controls, 'light2');
		gui.addColor(controls, 'light3');
		gui.addColor(controls, 'light4');
        light1 = new THREE.PointLight(light1_color, 0.9, lightDistance);
        light1.position.set(0, y, r);
        scene.add(light1);
        light2 = new THREE.PointLight(light2_color, 0.9, lightDistance);
        light2.position.set(0, -y, -r);
        scene.add(light2);
        light3 = new THREE.PointLight(light3_color, 0.9, lightDistance);
        light3.position.set(r, y, 0);
        scene.add(light3);
        light4 = new THREE.PointLight(light4_color, 0.9, lightDistance);
        light4.position.set(-r, y, 0);
        scene.add(light4);
      }

      function animate() {
        requestAnimationFrame(animate);
		
        animatePlane();
        animateLights();

        renderer.render(scene, camera);
      }

      function animatePlane() {
        let gArray = plane.geometry.attributes.position.array;
        const time = Date.now() * 0.0002;
        for (let i = 0; i < gArray.length; i += 3) {
          gArray[i + 2] = simplex.noise4D(gArray[i] / 50, gArray[i + 1] / 50, time, mouse.x + mouse.y) * 15;
        }
        plane.geometry.attributes.position.needsUpdate = true;
        // plane.geometry.computeBoundingSphere();
      }

      function animateLights() {
        const time = Date.now() * 0.001;
        const d = 50;
        light1.position.x = Math.sin(time * 0.1) * d;
        light1.position.z = Math.cos(time * 0.2) * d;
		light1.color.setHex(controls.light1);
		//console.log(light1.color);
        light2.position.x = Math.sin(time * 0.3) * d;
		light2.position.z = Math.sin(time * 0.4) * d;
        light2.color.setHex(controls.light2);
		light3.position.x = Math.sin(time * 0.5) * d;
        light3.position.z = Math.sin(time * 0.6) * d;
		light3.color.setHex(controls.light3);
        light4.position.x = Math.sin(time * 0.7) * d;
        light4.position.z = Math.cos(time * 0.8) * d;
		light4.color.setHex(controls.light4);
      }

      function updateSize() {
        width = window.innerWidth;
        height = window.innerHeight;
        if (renderer && camera) {
          renderer.setSize(width, height);
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
          const wsize = getRendererSize();
          wWidth = wsize[0];
          wHeight = wsize[1];
        }
      }

      function getRendererSize() {
        const cam = new THREE.PerspectiveCamera(camera.fov, camera.aspect);
        const vFOV = cam.fov * Math.PI / 180;
        const height = 2 * Math.tan(vFOV / 2) * Math.abs(75);
        const width = height * cam.aspect;
        return [width, height];
      }

      initScene();
      animate();
    }
  },
  mounted() {
    this.init();
  }
}
</script>
