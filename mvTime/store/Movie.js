export const state = () => ({
  success: false,
  error: false,
  loading: false,
  message: "",
  movies: {},
  movie: {},
  reviews: [],
  recommendations: [],
  searchData: [],
  categoryFromHeader: "",
  popularMovies: {},
});

const APIKEY = "01e9b5f13bb06804a131b93996cf2cd2";

export const actions = {
  fetchAllMovies({ commit }) {
    commit("LOADING_GENERAL");
    this.$axios
      .get(`/trending/movie/day?api_key=${APIKEY}&page=1`)
      .then((response) => {
        commit("SUCCESS_FETCH_POPULAR_MOVIES", response.data);
      })
      .catch((error) => {
        const message = apiHelper.handleError(error);
        commit("ERROR_GENERAL", message);
      });
  },
  fetchDiscoverMovies({ commit }, data) {
    commit("LOADING_GENERAL");
    this.$axios
      .get(
        `/discover/movie?api_key=${APIKEY}&language=en-US&sort_by=${data.sort_by}&page=${data.page}&with_genres=${data.genres}`
      )
      .then((response) => {
        commit("SUCCESS_FETCH_MOVIES", response.data);
      })
      .catch((error) => {
        const message = apiHelper.handleError(error);
        commit("ERROR_GENERAL", message);
      });
  },
  fetchDetailMovies({ commit }, data) {
    commit("LOADING_GENERAL");
    this.$axios
      .get(`/movie/${data.id}?api_key=${APIKEY}&language=en-US`)
      .then((response) => {
        commit("SUCCESS_FETCH_DETAIL_MOVIE", response.data);
      })
      .catch((error) => {
        const message = apiHelper.handleError(error);
        commit("ERROR_GENERAL", message);
      });
  },
  fetchReviewMovies({ commit }, data) {
    commit("LOADING_GENERAL");
    this.$axios
      .get(`/movie/${data.id}/reviews?api_key=${APIKEY}&language=en-US`)
      .then((response) => {
        commit("SUCCESS_FETCH_REVIEW_MOVIE", response.data.results);
      })
      .catch((error) => {
        const message = apiHelper.handleError(error);
        commit("ERROR_GENERAL", message);
      });
  },
  fetchRecommendationMovies({ commit }, data) {
    commit("LOADING_GENERAL");
    this.$axios
      .get(`/movie/${data.id}/recommendations?api_key=${APIKEY}&language=en-US`)
      .then((response) => {
        commit("SUCCESS_FETCH_RECOM_MOVIE", response.data.results);
      })
      .catch((error) => {
        const message = apiHelper.handleError(error);
        commit("ERROR_GENERAL", message);
      });
  },
  fetchSearchKeyword({ commit }, data) {
    commit("LOADING_GENERAL");
    this.$axios
      .get(`/search/movie?api_key=${APIKEY}&query=${data}&page=1`)
      .then((response) => {
        commit("SUCCESS_FETCH_SEARCH", response.data.results);
      })
      .catch((error) => {
        const message = apiHelper.handleError(error);
        commit("ERROR_GENERAL", message);
      });
  },

  fetchDiscoverTV({ commit }, data) {
    commit("LOADING_GENERAL");
    this.$axios
      .get(
        `/discover/tv?api_key=${APIKEY}&language=en-US&sort_by=${data.sort_by}&page=${data.page}&with_genres=${data.genres}`
      )
      .then((response) => {
        commit("SUCCESS_FETCH_MOVIES", response.data);
      })
      .catch((error) => {
        const message = apiHelper.handleError(error);
        commit("ERROR_GENERAL", message);
      });
  },
  fetchDetailTV({ commit }, data) {
    commit("LOADING_GENERAL");
    this.$axios
      .get(`/tv/${data.id}?api_key=${APIKEY}&language=en-US`)
      .then((response) => {
        commit("SUCCESS_FETCH_DETAIL_MOVIE", response.data);
      })
      .catch((error) => {
        const message = apiHelper.handleError(error);
        commit("ERROR_GENERAL", message);
      });
  },
  fetchReviewTV({ commit }, data) {
    commit("LOADING_GENERAL");
    this.$axios
      .get(`/tv/${data.id}/reviews?api_key=${APIKEY}&language=en-US`)
      .then((response) => {
        commit("SUCCESS_FETCH_REVIEW_MOVIE", response.data.results);
      })
      .catch((error) => {
        const message = apiHelper.handleError(error);
        commit("ERROR_GENERAL", message);
      });
  },
  fetchRecommendationTV({ commit }, data) {
    commit("LOADING_GENERAL");
    this.$axios
      .get(`/tv/${data.id}/recommendations?api_key=${APIKEY}&language=en-US`)
      .then((response) => {
        commit("SUCCESS_FETCH_RECOM_MOVIE", response.data.results);
      })
      .catch((error) => {
        const message = apiHelper.handleError(error);
        commit("ERROR_GENERAL", message);
      });
  },
  changeCategory({ commit }, data) {
    commit("CHANGE_CATEGORY", data);
  },
  resetState({ commit }) {
    commit("RESET_STATE_GENERAL");
  },
};

export const mutations = {
  SUCCESS_GENERAL(state) {
    state.success = true;
    state.error = false;
    state.loading = false;
    state.message = "";
  },
  SUCCESS_FETCH_MOVIES(state, data) {
    state.success = true;
    state.error = false;
    state.loading = false;
    state.message = "";
    state.movies = data;
  },
  SUCCESS_FETCH_POPULAR_MOVIES(state, data) {
    state.success = true;
    state.error = false;
    state.loading = false;
    state.message = "";
    state.popularMovies = data;
  },
  SUCCESS_FETCH_DETAIL_MOVIE(state, data) {
    state.success = true;
    state.error = false;
    state.loading = false;
    state.message = "";
    state.movie = data;
  },
  SUCCESS_FETCH_REVIEW_MOVIE(state, data) {
    state.success = true;
    state.error = false;
    state.loading = false;
    state.message = "";
    state.reviews = data;
  },
  SUCCESS_FETCH_RECOM_MOVIE(state, data) {
    state.success = true;
    state.error = false;
    state.loading = false;
    state.message = "";
    state.recommendations = data;
  },
  SUCCESS_FETCH_SEARCH(state, data) {
    state.success = true;
    state.error = false;
    state.loading = false;
    state.message = "";
    state.searchData = data;
  },
  ERROR_GENERAL(state, message) {
    state.success = false;
    state.error = true;
    state.loading = false;
    state.message = message;
  },
  LOADING_GENERAL(state) {
    state.success = false;
    state.error = false;
    state.loading = true;
    state.message = "";
  },
  RESET_STATE_GENERAL(state) {
    state.success = false;
    state.error = false;
    state.loading = false;
    state.message = "";
  },
  CHANGE_CATEGORY(state, data) {
    state.categoryFromHeader = data;
  },
};
