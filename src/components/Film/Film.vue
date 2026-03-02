<template>
    <div class="w3-row-padding d-flex">
        <div class="banner">
            <h1 class="banner-title">Movie</h1>
        </div>
        <div class="w3-col-25 w3-container  sticky">
            <div class="w3-margin-bottom">
                <div class="search-bar">
                    <button @click="searchFilm" class="search-icon"><i class="fa fa-search"></i></button>
                    <input v-model="query" @keyup.enter="debouncedFetchmovie" type="text" placeholder="Tìm kiếm phim..." />
                </div> 
            </div>
        </div> 
        <div class="w3-col-75 w3-container">
            <div class="music-section w3-margin-bottom">       
                <div class="music-suggestions"  >
                    <h2>Kết quả tìm kiếm: {{  query }}</h2>
                    <div class="songs-list" v-if="movieList.length">
                        <div class="song-item" v-for="(movie,index) in movieList" :key="movie.id" 
                        :class="{ 'active': currentVideoId === movie.id }">
                            <router-link :to="`/phim/${movie.id}`">
                                <img :src="movie.cover" :alt="movie.title">
                                <div class="song-info">
                                    <p class="song-title">{{ movie.title }}</p>
                                    <p class="song-artist">{{ movie.description ? movie.description.slice(0, 100) + '...' : '...' }}</p>
                                </div>
                            </router-link>
                        </div>
                    </div>
                    <div class="songs-list empty-search" v-else>{{ textEmpty }}</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { debounce } from 'lodash';
import axios from 'axios';
import { buildImageMovieUrl } from '@/utils/imageHelper';
export default {
    data() {
        return {
            query: '',
            movieList: [],
            isSearch:  false,
            textEmpty: 'Nhập từ khóa để tìm phim !!',
        };
    }, 
    watch: {
        query () {
            this.textEmpty = 'Đang tìm kiếm phim.....';
            this.debouncedFetchmovie();
        }
    },
    methods: {
        async searchFilm() {
            if (!this.query) {
                this.textEmpty = 'Nhập từ khóa để tìm phim !!';
                this.movieList = [];
                return;
            }

            this.textEmpty = 'Đang tìm kiếm phim...';
            this.movieList = [];

            const url = `https://ophim1.com/v1/api/tim-kiem?keyword=${encodeURIComponent(this.query)}`;

            try {
                const response = await axios.get(url);

                const items = response.data?.data?.items || [];
                const imageDomain = response.data?.data?.APP_DOMAIN_CDN_IMAGE || '';

                if (!items.length) {
                    this.textEmpty = 'Không tìm thấy phim theo yêu cầu!';
                    return;
                }
                this.movieList = items.map(item => ({
                    id: item.slug,
                    cover: buildImageMovieUrl(imageDomain, item.thumb_url || item.poster_url),
                    title: item.name,
                    description: item.origin_name || item.year 
                }));

            } catch (error) {
                console.error('Lỗi khi gọi API:', error);
                this.textEmpty = 'Có lỗi xảy ra khi tìm kiếm!';
            }
        },
        debouncedFetchmovie: debounce(async function() {
            await this.searchFilm();
        }, 1000)
    },
    mounted() {
        
    },
}
</script> 
<style>

</style>