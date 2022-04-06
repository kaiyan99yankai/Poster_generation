<template>
  <v-vanta ref="vanta" effect="waves" :options=options :key="refresh"></v-vanta>
</template>

<script>
import VVanta from 'vue-vanta/src/Vanta.vue';
import {GUI} from '../../../node_modules/three/examples/jsm/libs/dat.gui.module.js';
export default {
  components: { VVanta },
  data () {
    return {
	  refresh: true,
      options: {
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 1080.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        color: 0x1b5e,
        shininess: 64.00,
        waveHeight: 17.00,
        waveSpeed: 0.85,
        zoom: 1.00
      }
    }
  },
  methods: {
	init: function (){
	  let that = this;
	  var controls = new function(){
	  	this.zoom = 1.00;
		this.shine = 64.00;
		this.height = 17.00;
		this.color = 0x1b5e;
	  }
	  var gui = new GUI();
	  gui.add(controls, 'shine', 0, 100);
	  gui.add(controls, 'height', 0, 30);
	  gui.add(controls, 'zoom', 0.7, 1.8);
	  gui.addColor(controls, 'color');
	  function copyObj(obj){
      	var newobj = {};
      	for ( var key in obj) {
          newobj[key] = obj[key ];
      	}
      	return newobj;
 	  }	
	  that.$refs.vanta.options.zoom=controls.zoom;
      that.$refs.vanta.options.waveHeight=controls.height;
      that.$refs.vanta.options.shininess=controls.shine;
	  that.$refs.vanta.options.color=controls.color;
	  var old_options = copyObj(this.$refs.vanta.options);
	  var tick = 0;
	  function animate(){
		tick+=1;
		requestAnimationFrame(animate);
		that.$refs.vanta.options.zoom=controls.zoom;
		that.$refs.vanta.options.waveHeight=controls.height;
		that.$refs.vanta.options.shininess=controls.shine;
		that.$refs.vanta.options.color=controls.color;
		if(tick%100===0){
		  console.log(tick);
		  if(old_options.color!==that.$refs.vanta.options.color||old_options.zoom!==that.$refs.vanta.options.zoom||old_options.waveHeight!==that.$refs.vanta.options.waveHeight||old_options.shininess!==that.$refs.vanta.options.shininess){
		  	console.log("变化");
		  	that.refresh=!that.refresh;
		  	//that.$destroy();
		  	//that.$refs.vanta.$forceUpdate();
		  	//location.reload();
		  	old_options = copyObj(that.$refs.vanta.options);
		  }
		}
	  }
	  animate();
	}	
  },
  mounted(){
  	this.init();
  }
}
</script>
