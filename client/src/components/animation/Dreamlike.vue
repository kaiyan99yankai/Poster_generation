<template>
  <v-vanta ref="vanta" effect="halo" :options=options :key="refresh"></v-vanta>
</template>

<script>
import VVanta from 'vue-vanta/src/Vanta.vue';
import {GUI} from '../../../node_modules/three/examples/jsm/libs/dat.gui.module.js'
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
        baseColor: 0x1e1e77,
        backgroundColor: 0x0,
        amplitudeFactor: 1.50,
        size: 1.60
      }
    }
  },
  methods: {
    init: function (){
      let that = this;
      var controls = new function(){
        this.size = 1.60;
        this.amplitude = 1.50;
		this.color = 0x0;
      }
      var gui = new GUI();
      gui.add(controls, 'size', 0.1, 3);
      gui.add(controls, 'amplitude', 0, 3);
	  gui.addColor(controls, 'color');
      function copyObj(obj){
        var newobj = {};
        for ( var key in obj) {
          newobj[key] = obj[key ];
        }
        return newobj;
      }
      that.$refs.vanta.options.size=controls.size;
      that.$refs.vanta.options.amplitudeFactor=controls.amplitude;
	  that.$refs.vanta.options.backgroundColor=controls.color;
      var old_options = copyObj(this.$refs.vanta.options);
      var tick = 0;
      function animate(){
        tick+=1;
        requestAnimationFrame(animate);
        that.$refs.vanta.options.size=controls.size;
        that.$refs.vanta.options.amplitudeFactor=controls.amplitude;
		that.$refs.vanta.options.backgroundColor=controls.color;
        if(tick%100===0){
          console.log(tick);
          if(old_options.backgroundColor!==that.$refs.vanta.options.backgroundColor||old_options.size!==that.$refs.vanta.options.size||old_options.amplitudeFactor!==that.$refs.vanta.options.amplitudeFactor){
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
