<template>
  <div class="netflix">

    <!-- HERO SECTION -->
    <div 
      class="hero"
      :style="{ backgroundImage: `url(${movie?.poster})` }"
      v-if="movie"
    >
      <div class="overlay">
        <div class="hero-content">
          <h1>{{ movie.name }}</h1>
          <p class="meta">
            {{ movie.year }} • {{ movie.time }} • {{ movie.episode_current }}
          </p>

          <div class="buttons">
            <button class="play-btn" @click="playFirstEpisode">
              ▶ Phát ngay
            </button>
          </div>

          <p class="description" v-html="movie.content"></p>
        </div>
      </div>
    </div>

    <!-- PLAYER MODAL -->
    <div class="player-wrapper" v-if="currentEpisode">
      <video
        ref="videoPlayer"
        controls
        autoplay
        class="video-player"
      ></video>
    </div>

    <!-- EPISODES -->
    <div class="episodes" v-if="episodes.length">
      <h2>Danh sách tập</h2>

      <div class="episode-row">
        <div
          v-for="ep in episodes"
          :key="ep.slug"
          class="episode-card"
          @click="selectEpisode(ep)"
        >
          <div class="episode-number">{{ ep.name }}</div>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
import axios from "axios";
import Hls from "hls.js";
import { buildImageMovieUrl } from '@/utils/imageHelper';

export default {
  data() {
    return {
      movie: null,
      episodes: [],
      currentEpisode: null,
      hls: null
    };
  },

  methods: {
    async fetchMovie() {
      const slug = this.$route.params.slug;

        const response = await axios.get(
            `https://ophim1.com/v1/api/phim/${slug}`
        );

        const data = response.data.data;
        const imageDomain = response.data?.data?.APP_DOMAIN_CDN_IMAGE || '';

        this.movie = {
            name: data.item.name,
            content: data.item.content,
            year: data.item.year,
            time: data.item.time,
            episode_current: data.item.episode_current,
            poster: buildImageMovieUrl(imageDomain, data.thumb_url || data.poster_url)
        };

      if (data.item.episodes?.length) {
        this.episodes = data.item.episodes[0].server_data;
      }
    },

    playFirstEpisode() {
      if (this.episodes.length) {
        this.selectEpisode(this.episodes[0]);
      }
    },

    selectEpisode(ep) {
      this.currentEpisode = ep;
      this.$nextTick(() => {
        this.loadVideo(ep.link_m3u8);
      });
    },

    loadVideo(url) {
      const video = this.$refs.videoPlayer;

      if (this.hls) {
        this.hls.destroy();
      }

      if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = url;
      } else if (Hls.isSupported()) {
        this.hls = new Hls();
        this.hls.loadSource(url);
        this.hls.attachMedia(video);
      }
    }
  },

  mounted() {
    this.fetchMovie();
  },

  beforeUnmount() {
    if (this.hls) this.hls.destroy();
  }
};
</script>
<style scoped>
.netflix {
  background: #141414;
  color: white;
  min-height: 100vh;
}

/* HERO */
.hero {
  height: 80vh;
  background-size: cover;
  background-position: center;
  position: relative;
}

.overlay {
  background: linear-gradient(to top, #141414 10%, transparent 90%);
  height: 100%;
  display: flex;
  align-items: flex-end;
}

.hero-content {
  padding: 50px;
  max-width: 600px;
}

.hero-content h1 {
  font-size: 48px;
  font-weight: bold;
}

.meta {
  margin: 10px 0;
  color: #ccc;
}

.description {
  margin-top: 15px;
  font-size: 14px;
  color: #ddd;
}

/* BUTTON */
.play-btn {
  background: white;
  color: black;
  padding: 10px 20px;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
}

/* PLAYER */
.player-wrapper {
  padding: 30px 50px;
}

.video-player {
  width: 100%;
  max-height: 70vh;
  background: black;
}

/* EPISODES */
.episodes {
  padding: 20px 50px;
}

.episode-row {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
}

.episode-card {
  min-width: 120px;
  height: 80px;
  background: #222;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: 0.3s;
  border-radius: 6px;
}

.episode-card:hover {
  background: #e50914;
}

.episode-number {
  font-weight: bold;
}
</style>