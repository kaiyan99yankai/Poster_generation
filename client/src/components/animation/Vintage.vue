<template>
  <v-vanta ref="vanta" effect="fog" :options=options :key="refresh"></v-vanta>
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
        highlightColor: 0x888877,
        midtoneColor: 0x886500,
        lowlightColor: 0x727272,
        baseColor: 0xffffff,
        blurFactor: 0.66,
        zoom: 1.50,
		speed: 1.00
      }
    }
  },
  methods: {
    init: function (){
      let that = this;
      var controls = new function(){
        this.zoom = 1.50;
        this.blur = 0.66;
        this.speed = 1.00;
      }
      var gui = new GUI();
      gui.add(controls, 'blur', 0.5, 0.9);
      gui.add(controls, 'speed', 0, 5);
      gui.add(controls, 'zoom', 1, 3);
      function copyObj(obj){
        var newobj = {};
        for ( var key in obj) {
          newobj[key] = obj[key ];
        }
        return newobj;
      }
      that.$refs.vanta.options.zoom=controls.zoom;
      that.$refs.vanta.options.blurFactor=controls.blur;
      that.$refs.vanta.options.speed=controls.speed;
      var old_options = copyObj(this.$refs.vanta.options);
      var tick = 0;
      function animate(){
        tick+=1;
        requestAnimationFrame(animate);
        that.$refs.vanta.options.zoom=controls.zoom;
        that.$refs.vanta.options.blurFactor=controls.blur;
        that.$refs.vanta.options.speed=controls.speed;
        if(tick%100===0){
          console.log(tick);
          if(old_options.zoom!==that.$refs.vanta.options.zoom||old_options.blurFactor!==that.$refs.vanta.options.blurFactor||old_options.speed!==that.$refs.vanta.options.speed){
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
