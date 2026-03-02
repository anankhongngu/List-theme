<template>
    <header id="portfolio">
        <a href="#" @click="sidebar_open">
            <img src="./../../assets/image/avatar/avatar_1.PNG" class="w3-circle w3-right w3-margin-8 w3-hide-large w3-hover-opacity" style="width: 55px;" alt="My protfolio">
        </a>
        <span class="icon-color w3-button w3-hide-large w3-xxlarge w3-hover-text-grey" @click="sidebar_open">
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
</template> 
<script>  

import Theme from '../Theme/Theme.vue'; 
import Video from '../Video/Video.vue'; 
import Manga from '../Manga/Manga.vue'; 
    export default {
        data() { 
            return {
                activeTab: 'manga'
            };
        },
        components: {
            Theme,
            Video,
            Manga
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


