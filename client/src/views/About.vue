<template>
  <div id="about">
    <div id="wrap" :style="{ height: screenHeight + 'px' }">
        <Navbar />
        <!--    Height = 56-->
      <div id="main" :style="{ top: nowTop + 'px' }">
        <ul id="pageUl" type="circle">
          <li id="pageUlLi1" class="pageUlLi" :class="{'active': curIndex == 1}">&nbsp;</li>
          <li id="pageUlLi2" class="pageUlLi" :class="{'active': curIndex == 2}">&nbsp;</li>
          <li id="pageUlLi3" class="pageUlLi" :class="{'active': curIndex == 3}">&nbsp;</li>
          <li id="pageUlLi4" class="pageUlLi" :class="{'active': curIndex == 4}">&nbsp;</li>
          <li id="pageUlLi5" class="pageUlLi" :class="{'active': curIndex == 5}">&nbsp;</li>
        </ul>
        <div style="background-color: #1b6d85" id="page1" class="page">
          <img class="show" src="../assets/scene.png"
               alt = "pic" width="403" height="302">
        </div>
        <div style="background-color: #5cb85c" id="page2" class="page"></div>
        <div style="background-color: #8a6d3b" id="page3" class="page"></div>
        <div style="background-color: #337ab7" id="page4" class="page"></div>
        <div style="background-color: #66512c" id="page5" class="page"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/navbar.vue';

export default {
  name: 'About',
  components: {
    Navbar,
  },
  data() {
    return {
      screenWidth: 0, // 屏幕宽度
      screenHeight: 0, // 屏幕高度
      index: 1, // 用于判断翻页
      curIndex: 1, // 当前页的index
      startTime: 0, // 翻屏起始时间
      endTime: 0, // 上一次翻屏结束时间
      nowTop: 0, // 翻屏后top的位置
      pageNum: 0, // 一共有多少页
      main: Object,
      obj: Object,
    };
  },
  mounted() {
    this.screenWidth = document.documentElement.clientWidth;
    this.screenHeight = document.documentElement.clientHeight;
    this.main = document.getElementById('main');
    this.obj = document.getElementsByTagName('div');
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < this.obj.length; i++) {
      // eslint-disable-next-line eqeqeq
      if (this.obj[i].className == 'page') {
        this.obj[i].style.height = `${this.screenHeight}px`;
      }
    }
    this.pageNum = document.querySelectorAll('.page').length;

    // 浏览器兼容
    // eslint-disable-next-line eqeqeq
    if ((navigator.userAgent.toLowerCase().indexOf('firefox') != -1)) {
      document.addEventListener('DOMMouseScroll', this.scrollFun, false);
    } else if (document.addEventListener) {
      document.addEventListener('mousewheel', this.scrollFun, false);
    } else if (document.attachEvent) {
      document.attachEvent('onmousewheel', this.scrollFun);
    } else {
      document.onmousewheel = this.scrollFun;
    }
  },
  methods: {
    scrollFun(event) {
      this.startTime = new Date().getTime();
      // mousewheel事件中的 “event.wheelDelta” 属性值：返回的如果是正值说明滚轮是向上滚动
      // DOMMouseScroll事件中的 “event.detail” 属性值：返回的如果是负值说明滚轮是向上滚动
      const delta = event.detail || (-event.wheelDelta);
      // 如果当前滚动开始时间和上次滚动结束时间的差值小于1.5s，则不执行翻页动作，这样做是为了实现类似节流的效果
      if ((this.startTime - this.endTime) > 1500) {
        // eslint-disable-next-line radix
        if (delta > 0 && parseInt(this.main.offsetTop)
            >= -(this.screenHeight * (this.pageNum - 2))) {
          // 向下滚动
          // eslint-disable-next-line no-plusplus
          this.index++;
          this.toPage(this.index);
          // eslint-disable-next-line radix
        } else if (delta < 0 && parseInt(this.main.offsetTop) < 0) {
          // 向上滚动
          // eslint-disable-next-line no-plusplus
          this.index--;
          this.toPage(this.index);
          // eslint-disable-next-line radix
        } else if (delta > 0 && parseInt(this.main.offsetTop)
            < -(this.screenHeight * (this.pageNum - 2))) {
          this.index = 1;
          this.toPage(1);
          // eslint-disable-next-line radix
        } else if (delta < 0 && parseInt(this.main.offsetTop) >= 0) {
          this.index = this.pageNum;
          this.toPage(this.pageNum);
        }
        // 本次翻页结束，记录结束时间，用于下次判断
        this.endTime = new Date().getTime();
      }
    },
    // 翻页
    toPage(index) {
      // eslint-disable-next-line eqeqeq
      if (index != this.curIndex) {
        const delta = index - this.curIndex;
        this.nowTop -= delta * this.screenHeight;
        this.curIndex = index;
      }
    },
  },
};
</script>

<style scoped>
html, body {
  height: 100%;
}

body, ul, li, a, p, div {
  /*慎删*/
  padding: 0;
  margin: 0;
}

#wrap {
  overflow: hidden;
  width: 100%;
}

#main {
  position: relative;
  transition:top 1.5s;
}

.page {
  /*谨删*/
  width: 100%;
  margin: 0;
}

.show{
  display:block;
  margin:0 auto;
}

#pageUl {
  position: fixed;
  right: 10px;
  bottom: 50%;
}

.active{
  color: red;
}
</style>
