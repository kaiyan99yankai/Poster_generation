<template>
  <v-vanta ref="vanta" effect="clouds" :options=options :key="refresh"></v-vanta>
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
		speed: 1.00,
		skyColor: 0x68b8d7,
		cloudColor: 0xadc1de
      }
    }
  },
  methods: {
    init: function (){
      let that = this;
      var controls = new function(){
        this.speed = 1.00;
		this.skyColor = 0x68b8d7;
		this.cloudColor = 0xadc1de;
      }
      var gui = new GUI();
      gui.add(controls, 'speed', 0, 3);
	  gui.addColor(controls, 'skyColor');
	  gui.addColor(controls, 'cloudColor');
      function copyObj(obj){
        var newobj = {};
        for ( var key in obj) {
          newobj[key] = obj[key ];
        }
        return newobj;
      }
      that.$refs.vanta.options.speed=controls.speed;
	  that.$refs.vanta.options.skyColor=controls.skyColor;
	  that.$refs.vanta.options.cloudColor=controls.cloudColor;
      var old_options = copyObj(this.$refs.vanta.options);
      var tick = 0;
      function animate(){
        tick+=1;
        requestAnimationFrame(animate);
        that.$refs.vanta.options.speed=controls.speed;
		that.$refs.vanta.options.skyColor=controls.skyColor;
      	that.$refs.vanta.options.cloudColor=controls.cloudColor;
        if(tick%100===0){
          console.log(tick);
          if(old_options.skyColor!==that.$refs.vanta.options.skyColor||old_options.cloudColor!==that.$refs.vanta.options.cloudColor||old_options.speed!==that.$refs.vanta.options.speed){
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
