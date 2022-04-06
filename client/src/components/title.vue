<template>
  <div class="hello">
    <br>
    <h2>
      Intelligent Poster Generator.
    </h2>
    <br>
    <h1>
      Make an awesome poster
      <br>
      from any image
    </h1>
    <br>
    <my_carousel></my_carousel>
    <br>
    <uploader/>
    <div>The result is: {{label0}}, {{label1}}, {{label2}}</div>
    <br>
    <p>All user photo are automatically deleted
      <br>
      after being processed
    </p>
    <button type='button' class="btn btn-primary btn-lg" @click="getResult()">
    Generate animation effects
    </button>
    <table class="table table-hover">
      <thead>
      Results
      </thead>
      <gallery ref="gallery" :resultArr="resultArr" :key="refresh"></gallery>
      <!-- <tbody>
      <tr v-for="(c, index) in result" :key="index">
        <td>
          {{c}}
        </td>
      </tr>
      </tbody> -->
    </table>
  </div>
</template>

<script>
import axios from 'axios';
import my_carousel from './carousel';
import uploader from './uploader';
import Gallery from './gallery.vue';

export default {
  name: 'Title',
  data() {
    return {
	    refresh: 0,
      result: [],
	    resultArr: [9,9,9],
      label0: "Pending",
      label1: "Pending",
      label2: "Pending",
      label_to_txt: {
        0: "Heartwarming", //wenxin
        1: "Tech", //keji
        2: "Simple", //jianyue
        3: "Festive", //xiqing
        4: "Fresh", //qingxin
        5: "Vintage", //fugu
        6: "Business", //shangwu
        7: "Cool", //xuanku
        8: "Dreamlike", //menghuan
        9: "Pending",
      },
    };
  },
  components: {
    my_carousel,
    uploader,
    Gallery,
  },
  methods: {
    getResult() {
      // console.log('1111');
      const path = 'http://localhost:5000/algorithm';
      axios.get(path)
        .then((res) => {
          this.result = res.data.result;
          this.resultArr = this.result.split(",");
          // console.log(this.resultArr[0])
          this.label0 = this.label_to_txt[this.resultArr[0]];
          this.label1 = this.label_to_txt[this.resultArr[1]];
          this.label2 = this.label_to_txt[this.resultArr[2]];
		      this.$refs.gallery.init(this.resultArr[0], this.resultArr[1], this.resultArr[2]);
          
          
      
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
        });
    },
    // show() {
    //   const routeData = this.$router.resolve({ path: '/gallery' });
    //   window.open(routeData.href, '_blank');
    // },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Knewave&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Crete+Round&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Merriweather&display=swap');

h1 {
  font-family: 'Merriweather', serif;
  font-size: 70px
}

h2 {
  font-family: 'Merriweather', serif;
  font-size: 30px
}

h3 {
  font-family: 'Poppins', sans-serif;
  font-size: 25px;
  color: #5cb85c;
}

p {
  color: #808080
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

</style>
