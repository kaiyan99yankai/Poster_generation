<template>
  <div>
    <b-carousel
        id="carousel-1"
        v-model="slide"
        :interval="4000"
        background="#ababab"
        controls
        fade
        img-height="480"
        img-width="1024"
        indicators
        style="text-shadow: 1px 1px 2px #333;"
        @sliding-start="onSlideStart"
        @sliding-end="onSlideEnd"
    >
      <!-- Text slides with image -->
      <b-carousel-slide
          caption="Poster 1"
          text="Put your smartphone aside and let's celebrate the Chinese New Year with families!"
          >
        <template #img>
          <img
              alt="image slot"
              class="d-block img-fluid w-100"
              height="480"
              src="../assets/poster1.jpg"
              width="1024"
          >
        </template>
      </b-carousel-slide>
      <b-carousel-slide
          caption="Poster 2"
          text="Huawei Watch GT price starting from 150 USD along with battery life of up 14 days"
          >
        <template #img>
          <img
              alt="image slot"
              class="d-block img-fluid w-100"
              height="480"
              src="../assets/poster2.jpg"
              width="1024"
          >
        </template>
      </b-carousel-slide>
        <b-carousel-slide
          caption="Poster 3"
          text="The next generation sports car is under development."
          >
          <template #img>
            <img
                alt="image slot"
                class="d-block img-fluid w-100"
                height="480"
                src="../assets/poster3.jpg"
                width="1024"
            >
        </template>
      </b-carousel-slide>
    </b-carousel>
  </div>
</template>

<script>
export default {
  name: 'my_carousel',

  data() {
    return {
      slide: 0,
      sliding: null,
    };
  },
  methods: {
    onSlideStart(slide) {
      this.sliding = true;
    },
    onSlideEnd(slide) {
      this.sliding = false;
    },
  },
};
</script>
