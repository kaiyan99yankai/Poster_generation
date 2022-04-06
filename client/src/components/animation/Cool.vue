<template>
  <v-vanta ref="vanta" effect="rings" :options=options :key="refresh"></v-vanta>
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
		backgroundAlpha: 1.00,
		color: 0x88ff00,
		backgroundColor: 0x202428
      }
    }
  },
  methods: {
    init: function (){
      let that = this;
      var controls = new function(){
        this.alpha = 1.00;
		this.color = 0x88ff00;
		this.backgroundColor = 0x202428;
      }
      var gui = new GUI();
      gui.add(controls, 'alpha', 0, 1);
	  gui.addColor(controls, 'color');
	  gui.addColor(controls, 'backgroundColor');
      function copyObj(obj){
        var newobj = {};
        for ( var key in obj) {
          newobj[key] = obj[key ];
        }
        return newobj;
      }
      that.$refs.vanta.options.backgroundAlpha=controls.alpha;
	  that.$refs.vanta.options.backgroundColor=controls.backgroundColor;
	  that.$refs.vanta.options.color=controls.color;
      var old_options = copyObj(this.$refs.vanta.options);
      var tick = 0;
      function animate(){
        tick+=1;
        requestAnimationFrame(animate);
        that.$refs.vanta.options.backgroundAlpha=controls.alpha;
		that.$refs.vanta.options.backgroundColor=controls.backgroundColor;
		that.$refs.vanta.options.color=controls.color;
        if(tick%100===0){
          console.log(tick);
          if(old_options.color!==that.$refs.vanta.options.color||old_options.backgroundColor!==that.$refs.vanta.options.backgroundColor||old_options.backgroundAlpha!==that.$refs.vanta.options.backgroundAlpha){
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
