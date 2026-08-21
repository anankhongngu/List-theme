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
            <button 
            class="play-btn"
            @click="playFirstEpisode"
            :disabled="isPlaying || !episodes.length"
            :class="{ disabled: isPlaying || !episodes.length }"
            >
            ▶ {{ isPlaying ? 'Đang phát' : 'Phát ngay' }}
            </button>
          </div>

          <p class="description" v-html="movie.content"></p>
        </div>
      </div>
    </div>

    <div class="loading" v-if="loading">Đang tải phim...</div>
    <div class="error" v-if="error">{{ error }}</div>

    <!-- PLAYER -->
    <div class="player-wrapper" v-if="currentEpisode">
      <p class="now-playing">Đang phát: {{ currentEpisode.name }}</p>

      <video
        v-if="playerMode === 'hls'"
        ref="videoPlayer"
        controls
        autoplay
        playsinline
        class="video-player"
      ></video>

      <iframe
        v-else-if="playerMode === 'embed'"
        :src="embedSrc"
        class="video-player embed-player"
        allowfullscreen
        allow="autoplay; encrypted-media; picture-in-picture"
        frameborder="0"
      ></iframe>

      <p class="player-error" v-if="playerError">{{ playerError }}</p>
    </div>

    <!-- SERVER SELECTOR -->
    <div class="servers" v-if="servers.length > 1">
      <h2>Server phát</h2>
      <div class="server-row">
        <button
          v-for="(server, index) in servers"
          :key="server.server_name"
          class="server-btn"
          :class="{ active: selectedServerIndex === index }"
          @click="selectServer(index)"
        >
          {{ server.server_name }}
        </button>
      </div>
    </div>

    <!-- EPISODES -->
    <div class="episodes" v-if="episodes.length">
        <h2>Danh sách tập</h2>
        <div class="episode-row"> 
            <div
                v-for="ep in episodes"
                :key="ep.slug"
                class="episode-card"
                :class="{ active: currentEpisode?.slug === ep.slug }"
                @click="selectEpisode(ep)"
                >
                <div class="episode-number">
                    {{ ep.name }}
                </div>
            </div>
        </div>
    </div>

  </div>
</template>
<script>
import axios from "axios";
import Hls from "hls.js";
import { buildImageMovieUrl } from '@/utils/imageHelper';
import { movieApi } from '@/config/movieApi';
import { getProxiedHlsUrl, getEmbedUrl } from '@/utils/streamHelper';

export default {
    data() {
        return {
            movie: null,
            servers: [],
            selectedServerIndex: 0,
            episodes: [],
            currentEpisode: null,
            playerMode: 'hls',
            hls: null,
            loading: false,
            error: null,
            playerError: null,
            onVideoEnded: null,
            embedSrc: '',
        };
    },
    computed: {
        isPlaying() {
            return !!this.currentEpisode;
        }
    },
    watch: {
        '$route.params.slug'() {
            this.resetPlayer();
            this.fetchMovie();
        }
    },
    methods: {
        resetPlayer() {
            this.cleanupPlayer();
            this.currentEpisode = null;
            this.playerError = null;
            this.playerMode = 'hls';
            this.embedSrc = '';
        },

        cleanupPlayer() {
            const video = this.$refs.videoPlayer;
            if (video && this.onVideoEnded) {
                video.removeEventListener('ended', this.onVideoEnded);
            }
            if (this.hls) {
                this.hls.destroy();
                this.hls = null;
            }
        },

        async fetchMovie() {
            const slug = this.$route.params.slug;
            this.loading = true;
            this.error = null;

            try {
                const response = await axios.get(movieApi.detail(slug));
                const { movie, episodes } = response.data;

                if (!movie) {
                    this.error = 'Không tìm thấy phim.';
                    return;
                }

                this.movie = {
                    name: movie.name,
                    content: movie.content,
                    year: movie.year,
                    time: movie.time,
                    episode_current: movie.episode_current,
                    poster: buildImageMovieUrl('', movie.thumb_url || movie.poster_url)
                };

                this.servers = episodes || [];
                this.selectedServerIndex = 0;
                this.episodes = this.servers[0]?.server_data || [];
            } catch (err) {
                console.error('Lỗi khi tải phim:', err);
                this.error = 'Không thể tải thông tin phim. Vui lòng thử lại.';
            } finally {
                this.loading = false;
            }
        },

        selectServer(index) {
            if (this.selectedServerIndex === index) return;

            this.selectedServerIndex = index;
            this.episodes = this.servers[index]?.server_data || [];
            this.resetPlayer();
        },

        playFirstEpisode() {
            if (this.episodes.length) {
                this.selectEpisode(this.episodes[0]);
            }
        },

        switchToEmbed(ep) {
            this.cleanupPlayer();
            this.playerMode = 'embed';
            this.embedSrc = getEmbedUrl(ep);
            this.playerError = this.embedSrc ? null : 'Không có link phát cho tập này.';
        },

        loadVideo(ep) {
            this.cleanupPlayer();
            this.playerError = null;
            this.embedSrc = '';

            const m3u8Url = ep.link_m3u8;
            const embedUrl = getEmbedUrl(ep);

            if (!m3u8Url && embedUrl) {
                this.playerMode = 'embed';
                this.embedSrc = embedUrl;
                return;
            }

            if (!m3u8Url) {
                this.playerError = 'Tập phim này chưa có link phát.';
                return;
            }

            this.playerMode = 'hls';
            const proxiedUrl = getProxiedHlsUrl(m3u8Url);

            this.$nextTick(() => {
                const video = this.$refs.videoPlayer;
                if (!video) return;

                this.onVideoEnded = () => this.playNextEpisode();
                video.addEventListener('ended', this.onVideoEnded);

                const fallbackToEmbed = () => {
                    if (embedUrl) {
                        this.switchToEmbed(ep);
                    } else {
                        this.playerError = 'Không thể phát video. Vui lòng thử server khác.';
                    }
                };

                if (video.canPlayType('application/vnd.apple.mpegurl')) {
                    video.src = proxiedUrl;
                    video.play().catch(fallbackToEmbed);
                    video.onerror = fallbackToEmbed;
                    return;
                }

                if (Hls.isSupported()) {
                    this.hls = new Hls({
                        enableWorker: true,
                    });

                    this.hls.loadSource(proxiedUrl);
                    this.hls.attachMedia(video);

                    this.hls.on(Hls.Events.MANIFEST_PARSED, () => {
                        video.play().catch(fallbackToEmbed);
                    });

                    this.hls.on(Hls.Events.ERROR, (_, data) => {
                        if (data.fatal) {
                            fallbackToEmbed();
                        }
                    });
                    return;
                }

                if (embedUrl) {
                    this.switchToEmbed(ep);
                } else {
                    this.playerError = 'Trình duyệt không hỗ trợ phát video này.';
                }
            });
        },

        playNextEpisode() {
            const currentIndex = this.episodes.findIndex(
                ep => ep.slug === this.currentEpisode.slug
            );

            const nextEpisode = this.episodes[currentIndex + 1];

            if (nextEpisode) {
                this.selectEpisode(nextEpisode);
            }
        },

        selectEpisode(ep) {
            if (this.currentEpisode?.slug === ep.slug && this.playerMode) return;

            this.currentEpisode = ep;
            this.loadVideo(ep);
        }
    },

    mounted() {
        this.fetchMovie();
    },

    beforeUnmount() {
        this.cleanupPlayer();
    }
};
</script>
<style scoped>
.netflix {
  background: #141414;
  color: white;
  min-height: 100vh;
}

.loading,
.error {
  padding: 20px 50px;
}

.error {
  color: #ff6b6b;
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

.play-btn.disabled {
  background: #555;
  color: #aaa;
  cursor: not-allowed;
}

/* PLAYER */
.player-wrapper {
  padding: 30px 50px;
}

.now-playing {
  margin-bottom: 12px;
  color: #ccc;
}

.video-player {
  width: 100%;
  max-height: 70vh;
  background: black;
  border-radius: 8px;
}

.embed-player {
  min-height: 60vh;
  border: none;
}

.player-error {
  margin-top: 12px;
  color: #ff6b6b;
}

/* SERVERS */
.servers {
  padding: 0 50px 10px;
}

.server-row {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
}

.server-btn {
  background: #333;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 20px;
  cursor: pointer;
}

.server-btn.active,
.server-btn:hover {
  background: #e50914;
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

.episode-card.active {
  background: #e50914;
  transform: scale(1.05);
  box-shadow: 0 0 10px rgba(229, 9, 20, 0.7);
}
</style>
