<template>
  <div class="">
    <SliderImage :dataMovie="popularMovie.results" />
    <DiscoverMovies @fetchData="fetchData" :dataMovie="discMovies.results" />
  </div>
</template>

<script>
import SliderImage from "../components/Home/SliderImage.vue";
import DiscoverMovies from "../components/Home/DiscoverMovies.vue";
export default {
  layout: "Home",
  components: {
    SliderImage,
    DiscoverMovies,
  },
  name: "IndexPage",
  data() {
    return {
      discMovies: {},
      popularMovie: {},
      page: 1,
      sort: "popularity.desc",
    };
  },
  mounted() {
    this.fetchMovie();
  },
  methods: {
    fetchData(val) {
      if (val === 1) {
        this.sort = "popularity.desc";
      } else {
        this.sort = "release_date.desc";
      }
      this.fetchMovie();
    },
    fetchMovie() {
      const unwatch = this.$store.watch(
        (state) => state.Movie,
        () => {
          const { success, error, movies } = this.$store.state.Movie;
          if (success) {
            unwatch();
            this.discMovies = movies;
            this.fetchPopularMovie();
          }

          if (error) {
            unwatch();
          }
        },
        {
          deep: true,
        }
      );
      const payload = {
        page: this.page,
        sort_by: this.sort,
        genres: "",
      };
      this.$store.dispatch("Movie/fetchDiscoverMovies", payload);
    },
    fetchPopularMovie() {
      const unwatch = this.$store.watch(
        (state) => state.Movie,
        () => {
          const { success, error, popularMovies } = this.$store.state.Movie;
          if (success) {
            unwatch();
            this.popularMovie = popularMovies;
          }

          if (error) {
            unwatch();
          }
        },
        {
          deep: true,
        }
      );

      this.$store.dispatch("Movie/fetchAllMovies");
    },
  },
};
</script>
