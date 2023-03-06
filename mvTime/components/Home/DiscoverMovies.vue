<template>
  <div class="w-full bg-[#292e35] p-[120px]">
    <div class="flex items-center justify-between mb-10">
      <p class="text-[#E5E5E5] font-semibold text-2xl">Discovery Movies</p>
      <div class="flex gap-4">
        <div
          class="flex justify-center items-center px-4 py-2 rounded-3xl cursor-pointer"
          :class="tabActive === 1 ? 'bg-[#FF0000]' : 'bg-[#161a1e]'"
          @click="changeTab(1)"
        >
          <p class="text-sm text-[#E5E5E5]">Popularity</p>
        </div>
        <div
          class="flex justify-center items-center px-4 py-2 rounded-3xl cursor-pointer"
          :class="tabActive === 2 ? 'bg-[#FF0000]' : 'bg-[#161a1e]'"
          @click="changeTab(2)"
        >
          <p class="text-sm text-[#E5E5E5]">Release Date</p>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-5 gap-4">
      <div v-for="item in dataMovie" :key="item.id" class="mt-2 cursor-pointer">
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
</template>

<script>
import { GENRE } from "../../config/contants";

export default {
  props: {
    dataMovie: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      tabActive: 1,
      hover: {
        id: 0,
        status: false,
      },
      listGenre: GENRE,
    };
  },
  methods: {
    changeTab(val) {
      this.tabActive = val;
      this.$emit("fetchData", val);
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
