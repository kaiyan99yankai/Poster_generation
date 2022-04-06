<template>
  <div>
    <canvas id="container"></canvas>
  </div>
</template>
<script>
import * as THREE from '../../../node_modules/three/build/three.module.js';
import {GUI} from '../../../node_modules/three/examples/jsm/libs/dat.gui.module.js';
export default {
	name: 'heartwarming',
	methods: {
		init: function (){
    		let container, camera, scene, renderer;
			const spheres = [];
			let mouseX = 0, mouseY = 0;
			document.addEventListener( 'mousemove', onDocumentMouseMove );
			container = document.getElementById("container");
			camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 100000 );
			camera.position.z = 1600;
			scene = new THREE.Scene();
			scene.background = new THREE.CubeTextureLoader().load([require('../../three/px.jpg'),require('../../three/nx.jpg'),require('../../three/py.jpg'),require('../../three/ny.jpg'),require('../../three/pz.jpg'),require('../../three/nz.jpg')]);

        	const geometry = new THREE.SphereGeometry( 100, 32, 16 );

        	const textureCube = new THREE.CubeTextureLoader().load([require('../../three/px.jpg'),require('../../three/nx.jpg'),require('../../three/py.jpg'),require('../../three/ny.jpg'),require('../../three/pz.jpg'),require('../../three/nz.jpg')]);


        	textureCube.mapping = THREE.CubeRefractionMapping;

        	const material = new THREE.MeshBasicMaterial( { color: 0xffffff, envMap: textureCube, refractionRatio: 0.95 } );
			//const material = new THREE.MeshBasicMaterial( { color: 0xffffff} );
			let gui = new GUI();
			gui.add(material, 'refractionRatio', 0.5, 0.95);
        	for ( let i = 0; i < 1000; i ++ ) {

            	const mesh = new THREE.Mesh( geometry, material );
            	mesh.position.x = Math.random() * 15000 - 7500;
            	mesh.position.y = Math.random() * 15000 - 7500;
            	mesh.position.z = Math.random() * 15000 - 7500;
            	mesh.scale.x = mesh.scale.y = mesh.scale.z = Math.random() * 3 + 1;
            	scene.add( mesh );

            	spheres.push( mesh );

        	}
        	renderer = new THREE.WebGLRenderer({canvas: container});
        	renderer.setPixelRatio( window.devicePixelRatio );
        	renderer.setSize(window.innerWidth, window.innerHeight);

        	window.addEventListener( 'resize', onWindowResize );
        	function onWindowResize() {

        		camera.aspect = window.innerWidth / window.innerHeight;
        		camera.updateProjectionMatrix();
        	}
			function onDocumentMouseMove( event ) {
        		mouseX = ( event.clientX - window.innerWidth ) * 5;
        		mouseY = ( event.clientY - window.innerHeight ) * 5;
    		}

    		function animate() {

        		requestAnimationFrame( animate );

        		render();

    		}

    		function render() {

        		const timer = 0.0001 * Date.now();

        		camera.position.x += ( mouseX - camera.position.x ) * .025;
	        	camera.position.y += ( - mouseY - camera.position.y ) * .025;
	
    		    camera.lookAt( scene.position );

        		for ( let i = 0, il = spheres.length; i < il; i ++ ) {

            		const sphere = spheres[ i ];

            		sphere.position.x = 5000 * Math.cos( timer + i );
           	 		sphere.position.y = 5000 * Math.sin( timer + i * 1.1 );

        		}

        		renderer.render( scene, camera );

    		}
    		animate();

    	}
	},
    mounted() {
   		this.init();
  	}
}
</script>
