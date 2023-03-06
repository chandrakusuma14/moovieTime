<template>
  <div class="w-full bg-[#1e232a] rounded-lg">
    <div class="py-5 pl-4">
      <p class="font-semibold text-[#E5E5E5]">Sort Result By</p>
    </div>
    <hr />
    <div class="py-5 px-4">
      <select
        @change="fetchFilter"
        class="text-white p-2 bg-[#292e35] rounded"
        v-model="search.sort"
      >
        <option value="popularity.asc">Popularity Ascending</option>
        <option value="popularity.desc">Popularity Descending</option>
        <option value="release_date.asc">Release Date Ascending</option>
        <option value="release_date.desc">Release Date Descending</option>
        <option value="vote_average.asc">Rating Ascending</option>
        <option value="vote_average.desc">Rating Descending</option>
      </select>
    </div>
    <div class="py-5 pl-4">
      <p class="font-semibold text-[#E5E5E5]">Genres</p>
    </div>
    <hr />
    <div class="py-5 px-4">
      <div
        v-for="item in option.genre"
        :key="item.id"
        class="flex justify-between mb-2"
      >
        <p :for="item.id" class="text-white">{{ item.name }}</p>
        <input
          type="checkbox"
          :id="item.id"
          :value="item.id"
          v-model="checkboxGenres"
          @input="debouncedOnChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import { mapState } from "vuex";

export default {
  data() {
    return {
      search: {
        sort: "popularity.desc",
        genres: "",
      },
      checkboxGenres: [],
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
  computed: {
    debouncedOnChange() {
      return _.debounce(this.fetchFilter, 700);
    },
    ...mapState("Movie", ["categoryFromHeader"]),
  },
  watch: {
    categoryFromHeader() {
      if (this.categoryFromHeader) {
        this.checkboxGenres = [this.categoryFromHeader];
        this.$store.dispatch("Movie/changeCategory", "");
        this.fetchFilter();
      }
    },
  },
  mounted() {},
  methods: {
    fetchFilter() {
      if (this.checkboxGenres.length > 0) {
        this.search.genres = this.checkboxGenres.join(",");
      } else {
        this.search.genres = "";
      }
      this.$emit("fetchFilter", this.search);
    },
  },
};
</script>
