<template>
  <div class="h-[760px] bg-[#1e232a] w-screen">
    <vueper-slides
      class="no-shadow py-10"
      :visible-slides="3"
      slide-multiple
      :gap="3"
      :slide-ratio="1 / 4"
      :dragging-distance="200"
      :breakpoints="{ 800: { visibleSlides: 2, slideMultiple: 2 } }"
      fixedHeight="650px"
      :arrows-outside="false"
    >
      <vueper-slide
        v-for="(slide, i) in dataMovie"
        :key="i"
        :image="`https://image.tmdb.org/t/p/original/${slide.poster_path}`"
        @click.native="$router.push(`/movies/detail/${slide.id}`)"
      />
    </vueper-slides>
  </div>
</template>

<script>
import { VueperSlides, VueperSlide } from "vueperslides";
import "vueperslides/dist/vueperslides.css";

export default {
  props: {
    dataMovie: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    VueperSlides,
    VueperSlide,
  },
};
</script>
