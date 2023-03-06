<template>
  <div class="pt-20 bg-[#292e35] w-full min-h-screen relative px-[110px]">
    <p class="text-4xl font-semibold text-[#E5E5E5]">Movies</p>
    <div class="py-14 flex gap-6">
      <div class="w-64 mt-1">
        <FilterMovie @fetchFilter="fetchFilter" />
      </div>
      <div class="grid grid-cols-4 gap-4">
        <div
          v-for="item in dataMovie"
          :key="item.id"
          class="mt-2 cursor-pointer"
        >
          <div
            class="relative w-[220px]"
            @mouseover="hoverCard('over', item.id)"
            @mouseleave="hoverCard('leave', item.id)"
            @click="gotoDetail(item.id)"
          >
            <div
              v-if="hover.status && hover.id === item.id"
              class="h-[341px] bg-[#1e232a] flex items-center justify-center"
            >
              <div>
                <div class="flex gap-4">
                  <p>
                    <img
                      src="~/assets/icons/star.svg"
                      alt="star"
                      width="32"
                      height="32"
                    />
                  </p>
                  <p class="text-2xl text-white">
                    {{ item.vote_average.toFixed(1) }}
                  </p>
                </div>
                <p class="my-12 text-center text-white text-xl font-semibold">
                  {{
                    listGenre.get(item.genre_ids[0])
                      ? listGenre.get(item.genre_ids[0]).name
                      : listGenre.get("Other").name
                  }}
                </p>
                <div
                  class="bg-[#FF0000] rounded-[32px] py-2 flex justify-center items-center"
                >
                  <p class="font-bold text-sm text-[#E5E5E5]">VIEW</p>
                </div>
              </div>
            </div>
            <div class="" v-else>
              <div
                class="absolute top-0 opacity-80 right-0 bg-[#1e232a] px-3 py-2"
              >
                <p class="text-lg font-bold text-[#E5E5E5]">
                  {{ item.vote_average.toFixed(1) }}
                </p>
              </div>
              <img
                :src="`https://image.tmdb.org/t/p/original/${item.poster_path}`"
                :alt="item.original_title"
                class="h-[341px] w-[220px]"
              />
            </div>

            <div class="mt-2">
              <p class="font-semibold text-[#E5E5E5]">
                {{ item.original_title }}
              </p>
            </div>
            <div class="mt-2">
              <p class="text-sm text-[#929292]">
                {{ item.first_air_date.slice(0, 4) }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="px-[110px] pb-20">
      <div class="pl-[100px] flex justify-center">
        <p
          @click="fetchMoreData"
          class="cursor-pointer rounded-[32px] bg-[#FF0000] py-2 text-center w-40 text-[#E5E5E5] font-semibold"
        >
          Load More
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { GENRE } from "../../config/contants";
import FilterMovie from "../../components/Filter.vue";

export default {
  layout: "Home",
  components: {
    FilterMovie,
  },
  data() {
    return {
      tabActive: 1,
      hover: {
        id: 0,
        status: false,
      },
      dataMovie: [],
      listGenre: GENRE,
      page: 1,
      sort: "popularity.desc",
      genres: "",
      isLoadMore: false,
    };
  },
  mounted() {
    this.fetchMovie();
  },
  methods: {
    fetchMoreData() {
      this.isLoadMore = true;
      this.page += 1;
      this.fetchMovie();
    },
    fetchFilter(val) {
      this.isLoadMore = false;
      this.page = 1;
      this.sort = val.sort;
      this.genres = val.genres;
      this.fetchMovie();
    },
    fetchMovie() {
      const unwatch = this.$store.watch(
        (state) => state.Movie,
        () => {
          const { success, error, movies } = this.$store.state.Movie;
          if (success) {
            unwatch();
            if (this.isLoadMore) {
              this.dataMovie.push(...movies.results);
            } else {
              this.dataMovie = movies.results;
            }
            this.isLoadMore = false;
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
        genres: this.genres,
      };
      this.$store.dispatch("Movie/fetchDiscoverTV", payload);
    },
    hoverCard(type, id) {
      if (type === "leave") {
        this.hover.id = 0;
        this.hover.status = false;
      } else {
        this.hover.id = id;
        this.hover.status = true;
      }
    },
    gotoDetail(id) {
      this.$router.push(`/tvshows/detail/${id}`);
    },
  },
};
</script>
