<template>
  <v-vanta ref="vanta" effect="net" :options=options :key="refresh"></v-vanta>
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
        color: 0x3f9dff,
        backgroundColor: 0x0,
        points: 20.00,
		spacing: 15.00,
		maxDistance: 20.00
      }
    }
  },
  methods: {
    init: function (){
      let that = this;
      var controls = new function(){
        this.points = 20.00;
        this.spacing = 15.00;
        this.distance = 20.00;
      }
      var gui = new GUI();
      gui.add(controls, 'points', 10, 20);
      gui.add(controls, 'spacing', 10, 20);
      gui.add(controls, 'distance', 10, 40);
      function copyObj(obj){
        var newobj = {};
        for ( var key in obj) {
          newobj[key] = obj[key ];
        }
        return newobj;
      }
      that.$refs.vanta.options.points=controls.points;
      that.$refs.vanta.options.spacing=controls.spacing;
      that.$refs.vanta.options.maxDistance=controls.distance;
      var old_options = copyObj(this.$refs.vanta.options);
      var tick = 0;
      function animate(){
        tick+=1;
        requestAnimationFrame(animate);
        that.$refs.vanta.options.points=controls.points;
        that.$refs.vanta.options.spacing=controls.spacing;
        that.$refs.vanta.options.maxDistance=controls.distance;
        if(tick%100===0){
          console.log(tick);
          if(old_options.points!==that.$refs.vanta.options.points||old_options.spacing!==that.$refs.vanta.options.spacing||old_options.maxDistance!==that.$refs.vanta.options.maxDistance){
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
