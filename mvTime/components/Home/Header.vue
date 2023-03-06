<template>
  <div
    :class="changeBackround ? 'bg-[#161a1e]' : 'bg-[#292e35]'"
    class="sticky top-0 z-20 w-full h-16 py-4 px-[120px] justify-center items-center flex gap-6"
  >
    <div class="flex gap-2 cursor-pointer" @click="$router.push('/')">
      <div>
        <img src="~/assets/icons/logo.svg" alt="logo" class="" />
      </div>
      <div>
        <img src="~/assets/icons/text-logo.svg" alt="logo" class="" />
      </div>
    </div>

    <div class="relative">
      <div class="absolute top-1.5 left-2">
        <img src="~/assets/icons/movie.svg" alt="movie" />
      </div>
      <div class="absolute top-2.5 right-2 cursor-pointer">
        <img src="~/assets/icons/search.svg" alt="search" />
      </div>

      <div
        v-if="dataSearch.length > 0"
        class="absolute bg-black px-4 py-2 top-10 left-0 w-[571px] rounded overflow-auto"
        style="max-height: 300px; min-height: min-content"
      >
        <p
          v-for="item in dataSearch"
          :key="item.id"
          class="text-[#E5E5E5] text-sm font-semibold cursor-pointer mt-1"
          @click="gotoMovie(item.id)"
        >
          {{ item.original_title }}
        </p>
      </div>

      <input
        type="text"
        v-model="keyword"
        placeholder="Find movie"
        class="px-10 text-white"
        style="
          background: rgba(0, 0, 0, 0.13);
          border-radius: 4px;
          width: 571px;
          height: 36px;
        "
        @input="debouncedOnChange()"
      />
    </div>

    <div
      class="cursor-pointer relative"
      @mouseover="isHover = true"
      @mouseleave="isHover = false"
    >
      <p class="text-[#E5E5E5] text-sm font-semibold">CATEGORIES</p>
      <div
        v-if="isHover"
        @mouseover="isHover = true"
        @mouseleave="isHover = false"
        class="absolute top-5 left-0 h-min[200px] w-[300px] overflow-auto bg-white rounded-lg"
      >
        <p
          v-for="item in option.genre"
          :key="item.id"
          class="text-xs text-[#1E232B] px-3 py-4 font-semibold bg-white hover:bg-red-100"
          @click="gotoMovieByCategory(item.id)"
        >
          {{ item.name.toUpperCase() }}
        </p>
      </div>
    </div>
    <p
      class="text-[#E5E5E5] text-sm font-semibold cursor-pointer"
      @click="$router.push('/movies')"
    >
      MOVIES
    </p>
    <p
      class="text-[#E5E5E5] text-sm font-semibold cursor-pointer"
      @click="$router.push('/tvshows')"
    >
      TV SHOWS
    </p>
    <p class="text-[#E5E5E5] text-sm font-semibold cursor-pointer">LOGIN</p>
  </div>
</template>

<script>
import _ from "lodash";
export default {
  data() {
    return {
      isHover: false,
      changeBackround: false,
      keyword: "",
      dataSearch: [],
      option: {
        genre: [
          { id: "28", name: "Action" },
          { id: "12", name: "Adventure" },
          { id: "16", name: "Animation" },

          { id: "35", name: "Comedy" },
          { id: "80", name: "Crime" },
          { id: "99", name: "Documentary" },

          { id: "18", name: "Drama" },
          { id: "10751", name: "Family" },
          { id: "14", name: "Fantasy" },

          { id: "36", name: "History" },
          { id: "27", name: "Horror" },
        ],
      },
    };
  },
  mounted() {
    window.addEventListener("scroll", this.onScroll);
  },
  computed: {
    debouncedOnChange() {
      return _.debounce(this.onChangeInputSearch, 1000);
    },
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.onScroll);
  },
  methods: {
    onScroll() {
      if (window.scrollY > 10) {
        this.changeBackround = true;
      } else {
        this.changeBackround = false;
      }
    },
    onChangeInputSearch() {
      const unwatch = this.$store.watch(
        (state) => state.Movie,
        () => {
          const { success, error, searchData } = this.$store.state.Movie;
          if (success) {
            unwatch();
            this.$store.dispatch("Movie/resetState");
            this.dataSearch = searchData;
          }

          if (error) {
            unwatch();
          }
        },
        {
          deep: true,
        }
      );
      this.$store.dispatch("Movie/fetchSearchKeyword", this.keyword);
    },
    gotoMovie(id) {
      this.keyword = "";
      this.dataSearch = [];
      this.$router.push(`/movies/detail/${id}`);
    },
    gotoMovieByCategory(id) {
      this.keyword = "";
      this.dataSearch = [];
      this.$store.dispatch("Movie/changeCategory", id);
      this.$router.push(`/movies`);
    },
  },
};
</script>
