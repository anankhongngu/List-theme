<template>
    <header id="portfolio">
      
        <span class="icon-color w3-button w3-hide-large w3-xxlarge w3-hover-text-grey" @click="sidebarOpen">
            <i class ="fa fa-bars"></i>
        </span>
        <div class="w3-container">
            <h1><b>My Project</b></h1>
            <div class="w3-section w3-bottombar w3-padding-16">
                <span class="w3-margin-right text-slogan">Category:</span>
                <button @click="activeTab='theme'" :class="{ active: activeTab === 'theme' }" class="w3-button text-cate">
                    <i class="fa fa-diamond w3-margin-right"></i>Theme
                </button>
                <button @click="activeTab='video'" :class="{ active: activeTab === 'video' }" class="w3-button text-cate">
                    <i class="fa fa-youtube w3-margin-right"></i>Video
                </button>
                <button @click="activeTab='manga'" :class="{ active: activeTab === 'manga' }" class="w3-button text-cate">
                    <i class="fa fa-photo w3-margin-right"></i>Manga
                </button>
                <button @click="activeTab='film'" :class="{ active: activeTab === 'film' }" class="w3-button text-cate">
                    <i class="fa fa-play w3-margin-right"></i>Film
                </button>
            </div>
        </div>  
    </header>
    <div v-if="activeTab === 'theme'" class="tab-content">
        <Theme/>
    </div>
    <div v-if="activeTab === 'video'" class="tab-content">
        <Video/>        
    </div>
    <div v-if="activeTab === 'manga'" class="tab-content">
        <Manga/>    
    </div>
    <div v-if="activeTab === 'film'" class="tab-content">
        <Film/>    
    </div> 
</template> 
<script>  

import Theme from '../Theme/Theme.vue'; 
import Video from '../Video/Video.vue'; 
import Manga from '../Manga/Manga.vue'; 
import Film from '../Film/Film.vue'; 
    export default {
        data() { 
            return {
                activeTab: 'theme'
            };
        },
        components: {
            Theme,
            Video, 
            Manga,
            Film
        },
        methods: {
            sidebarOpen() {
                document.getElementById("mySidebar").style.display = "block";
                document.getElementById("myOverlay").style.display = "block";
            },
            sidebarClose() {
                document.getElementById("mySidebar").style.display = "none";
                document.getElementById("myOverlay").style.display = "none";
            },
        }
    }
</script>

<style>
.music-section {
    background-color: var(--white);
    color: var(--text-black);
    padding: 12px;
    font-family: Arial, sans-serif;
}

.banner {
    position: relative;
    margin-bottom: 20px;
    display: inline-block;
    width: 100%;
    text-align: center;
}


.banner-title {
    font-size: 36px;
    font-weight: bold;
    color: var(--text-black);
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.6);
    margin-top: 0;
}

.music-suggestions h2 {
    font-size: 20px;
    margin-bottom: 15px;font-weight: bold;
    margin-top: 0;
}

.songs-list {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
}

.song-item {
    display: flex;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.1);
    padding: 10px;
    border-radius: 6px;
    width: 48%;
    transition: background-color 0.3s;
    cursor: pointer;
}
.song-item > a{
    display: flex;
    align-items: center;
    width: 100%;
}

.song-item.active {
    background-color: rgba(255, 255, 255, 0.2);
}

.song-item img {
    width: 50px;
    height: 50px;
    border-radius: 4px;
    object-fit: cover;
    margin-right: 10px;
}

.song-info {
    display: flex;
    flex-direction: column;
}

.song-title {
    font-weight: bold;
    margin: 0;
    font-size: 14px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 180px;
    color: var(--text-black);
}

.song-artist {
    margin: 0;
    font-size: 12px;
    color: var(--text-black);
}
@media (max-width: 767px){
    .song-item {
        flex: 0 0 100%;
        width: 100%;
    } 
}

.cd {
    display: flex;
    margin: auto;
    width: 200px;
}

.cd-thumb {
    width: 100%;
    padding-top: 100%;
    border-radius: 50%;
    background-color: #333;
    background-size: cover;
    margin: auto;
}


/* CONTROL */

.control {
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 18px 0 8px 0;
}

.control .btn {
    color: var(--text-black);
    padding: 18px;
    font-size: 18px;
}

.control .btn.active {
    color: var(--icon-green);
}

.control .btn-toggle-play {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    font-size: 24px;
    color: var(--black);
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--icon-green);
}

.progress-bar {
    width: 100%;
    -webkit-appearance: none;
    height: 6px;
    background: #d3d3d3;
    outline: none;
    -webkit-transition: 0.2s;
    transition: opacity 0.2s;
    overflow: hidden;
    border-radius: 5px;
}
.progress {
  height: 100%;
  background: var(--icon-green);
  transition: width 0.2s;
}
.wapper-player {
    padding: 12px;
}
.search-bar {
    display: flex;
    align-items: center;
    background-color: var(--white);
    border-radius: 0;
    padding: 10px 15px;
    width: 100%;
    max-width: 400px;
    color: var(--black);
}

.search-icon {
    font-size: 18px;
    margin-right: 10px;
    opacity: 0.7;
    outline: 0;
    background: transparent;
    border: 0;
    color: var(--black);;
}

.search-bar input {
    background: transparent;
    border: none;
    outline: none;
    color: var(--black);
    font-size: 14px;
    width: 100%;
}
.search-bar input::placeholder {
    color: var(--black);
}
.title {
    text-align: center;
    margin-bottom: 10px;
    overflow: hidden;
}
.title h4 {
    color: var(--icon-green);
    font-size: 12px;
    font-weight: bold;
}
.title h2 {
    color: var(--black);
    font-size: 16px;
    font-weight: bold;
}
.chapter li a {
    color: var(--text-black);
    cursor: pointer;
}
.chapter li {
    margin-bottom: 5px;
}
.manga-detail img {
    margin: 0 auto;
    display: block;
    width: 100%;
    height: auto;
}
.chapter ul {
    max-height: 250px;
    overflow-y: auto;
}
@media (min-width: 992px) {
    .sticky {
        position: sticky;
        height: max-content;
        top: 20px;
    }
}
</style> 