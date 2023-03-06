<template>
  <div v-if="dataMovie" class="w-full min-h-screen relative">
    <!-- <div class="">
      <img
        :src="`https://image.tmdb.org/t/p/original/${dataMovie.backdrop_path}`"
        :alt="dataMovie.original_title"
        class="h-[470px] w-full"
        style="top: -64px; position: absolute; opacity: 0.8; z-index: 30"
      />
    </div> -->
    <div
      class="h-[470px] w-full bg-no-repeat bg-cover bg-center relative"
      :style="`background-image: url(https://image.tmdb.org/t/p/original/${dataMovie.backdrop_path})`"
    >
      <div style="bottom: -120px; z-index: 30" class="pl-[124px] absolute">
        <img
          :src="`https://image.tmdb.org/t/p/w300/${dataMovie.poster_path}`"
          :alt="dataMovie.original_title"
          class="h-[341px]"
        />
      </div>
      <div class="absolute bottom-0 w-full">
        <div class="pl-[377px] py-4">
          <p class="text-xl text-white font-medium">
            {{ dataMovie.release_date.slice(0, 4) }}
          </p>
          <p class="text-4xl text-white font-semibold">
            {{ dataMovie.original_title }}
          </p>
          <div>
            <span
              v-for="(item, idx) in dataMovie.genres"
              :key="item.id"
              class="text-sm text-white font-medium"
            >
              {{ item.name
              }}<span v-if="idx !== dataMovie.genres.length - 1">, </span>
            </span>
          </div>
        </div>
        <div class="w-20 py-4 bg-[#161a1e] w-full flex pl-[377px] gap-20">
          <div class="flex gap-4 items-center">
            <p>
              <img
                src="~/assets/icons/star.svg"
                alt="star"
                width="32"
                height="32"
              />
            </p>
            <p class="text-2xl text-white">
              {{ dataMovie.vote_average.toFixed(1) }}
            </p>
          </div>
          <div>
            <p class="text-detail">USER SCORE</p>
            <p class="text-subdetail">{{ dataMovie.vote_count }} VOTES</p>
          </div>
          <div>
            <p class="text-detail">STATUS</p>
            <p class="text-subdetail">{{ dataMovie.status }}</p>
          </div>
          <div>
            <p class="text-detail">LANGUANGE</p>
            <p class="text-subdetail">{{ dataMovie.original_language }}</p>
          </div>
          <div>
            <p class="text-detail">BUDGET</p>
            <p class="text-subdetail">
              ${{ formatThousand(dataMovie.budget) }}
            </p>
          </div>
          <div>
            <p class="text-detail">PRODUCTION</p>
            <p class="text-subdetail">
              {{ dataMovie.production_companies[0].name }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-8 px-[377px]">
      <p class="text-sm text-[#FF0000] font-semibold">OVERVIEW</p>
      <p
        class="mt-2"
        style="font-size: 14px; line-height: 200%; color: #000000"
      >
        {{ dataMovie.overview }}
      </p>
    </div>
    <div class="mt-10 mb-14 px-[124px]">
      <p class="text-sm text-[#FF0000] font-semibold">REVIEWS</p>
      <div class="mt-6 flex gap-10">
        <div
          v-for="item in dataReview.slice(0, 2)"
          :key="item.id"
          class="h-[300px] w-[580px] box-review p-6"
        >
          <div class="flex justify-between items-center">
            <div>
              <p class="text-sm text-[#1E232A] font-bold">{{ item.author }}</p>
              <p class="text-xs text-[#666666] mt-1">
                {{ convertDate(item.created_at) }}
              </p>
            </div>
            <div
              class="py-1.5 px-2 gap-2 flex justify-center"
              style="background: rgba(196, 196, 196, 0.28); border-radius: 7px"
            >
              <div class="mt-1">
                <img
                  src="~/assets/icons/star.svg"
                  alt="star"
                  width="16"
                  height="16"
                />
              </div>
              <p class="font-semibold text-4xl">
                {{
                  item.author_details.rating
                    ? item.author_details.rating.toFixed(1)
                    : "0.0"
                }}
              </p>
            </div>
          </div>
          <p
            class="line-clamp-9 mt-6"
            style="
              font-weight: 400;
              font-size: 13px;
              line-height: 150%;
              color: #000000;
            "
          >
            {{ item.content }}
          </p>
        </div>
      </div>
    </div>
    <div class="py-10 w-full bg-[#1e232a] px-[124px]">
      <p class="text-sm font-semibold text-white mb-9">RECOMMENDATION MOVIES</p>
      <div class="grid grid-cols-5 gap-4">
        <div
          v-for="item in dataRecom.slice(0, 5)"
          :key="item.id"
          class="mt-2 cursor-pointer"
        >
          <div
            class="relative"
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
                :src="`https://image.tmdb.org/t/p/w300/${item.poster_path}`"
                :alt="item.original_title"
                class="h-[341px]"
              />
            </div>

            <div class="mt-2">
              <p class="font-semibold text-[#E5E5E5]">
                {{ item.original_title }}
              </p>
            </div>
            <div class="mt-2">
              <p class="text-sm text-[#929292]">
                {{ item.release_date.slice(0, 4) }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { GENRE } from "../../../config//contants";
export default {
  layout: "Home",
  data() {
    return {
      dataMovie: null,
      dataReview: [],
      dataRecom: [],
      hover: {
        id: 0,
        status: false,
      },
      listGenre: GENRE,
    };
  },
  mounted() {
    this.fetchDetail();
  },
  methods: {
    fetchDetail() {
      const unwatch = this.$store.watch(
        (state) => state.Movie,
        () => {
          const { success, error, movie } = this.$store.state.Movie;
          if (success) {
            unwatch();
            this.$store.dispatch("Movie/resetState");
            this.fetchReview();
            this.dataMovie = movie;
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
        id: Number(this.$route.params.slug),
      };
      this.$store.dispatch("Movie/fetchDetailMovies", payload);
    },
    fetchReview() {
      const unwatch = this.$store.watch(
        (state) => state.Movie,
        () => {
          const { success, error, reviews } = this.$store.state.Movie;
          if (success) {
            unwatch();
            this.$store.dispatch("Movie/resetState");
            this.dataReview = reviews;
            this.fetchRecommendation();
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
        id: Number(this.$route.params.slug),
      };
      this.$store.dispatch("Movie/fetchReviewMovies", payload);
    },
    fetchRecommendation() {
      const unwatch = this.$store.watch(
        (state) => state.Movie,
        () => {
          const { success, error, recommendations } = this.$store.state.Movie;
          if (success) {
            unwatch();
            this.$store.dispatch("Movie/resetState");
            this.dataRecom = recommendations;
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
        id: Number(this.$route.params.slug),
      };
      this.$store.dispatch("Movie/fetchRecommendationMovies", payload);
    },
    convertDate(value) {
      let date = new Date(value);
      const day = date.toLocaleString("default", { day: "2-digit" });
      const month = date.toLocaleString("default", { month: "long" });
      const year = date.toLocaleString("default", { year: "numeric" });
      return month + " " + day + ", " + year;
    },
    formatThousand(value) {
      const rounded = Math.round(value * 100) / 100;
      return rounded
        .toString()
        .replace(",", ".")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
      this.$router.push(`/movies/detail/${id}`);
    },
  },
};
</script>

<style>
.text-detail {
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 5px;
}
.text-subdetail {
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
  text-transform: uppercase;
  color: #ffffff;
}
.box-review {
  background: #f9f9f9;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  border-radius: 14px;
}
</style>
