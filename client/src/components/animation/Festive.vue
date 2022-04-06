<template>
  <v-vanta ref="vanta" effect='birds' :options=options :key="refresh"></v-vanta>
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
        scale: 1.00,
        birdSize: 1.50,
        scaleMobile: 1.00,
        backgroundColor: 0xffffff,
        color2: 0xff6000,
        wingSpan: 20.00,
        speedLimit: 7.00,
        separation: 49.00,
        alignment: 1.00,
        cohesion: 1.00
      }
    }
  },
  methods: {
    init: function (){
      let that = this;
      var controls = new function(){
        this.size = 1.50;
        this.speed = 7.00;
		this.backgroundColor = 0xffffff;
      }
      var gui = new GUI();
      gui.add(controls, 'size', 0.5, 3);
      gui.add(controls, 'speed', 0, 10);
	  gui.addColor(controls, 'backgroundColor');
      function copyObj(obj){
        var newobj = {};
        for ( var key in obj) {
          newobj[key] = obj[key ];
        }
        return newobj;
      }
      that.$refs.vanta.options.birdSize=controls.size;
      that.$refs.vanta.options.speedLimit=controls.speed;
	  that.$refs.vanta.options.backgroundColor=controls.backgroundColor;
      var old_options = copyObj(this.$refs.vanta.options);
      var tick = 0;
      function animate(){
        tick+=1;
        requestAnimationFrame(animate);
        that.$refs.vanta.options.birdSize=controls.size;
        that.$refs.vanta.options.speedLimit=controls.speed;
		that.$refs.vanta.options.backgroundColor=controls.backgroundColor;
        if(tick%100===0){
          console.log(tick);
          if(old_options.backgroundColor!==that.$refs.vanta.options.backgroundColor||old_options.birdSize!==that.$refs.vanta.options.birdSize||old_options.speedLimit!==that.$refs.vanta.options.speedLimit){
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
