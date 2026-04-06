<template>
    <nav class="w3-sidebar w3-collapse w3-animate-left" style="z-index:3;width:300px;" id="mySidebar">
        <br>

        <div class="w3-container">
            <a href="#" @click="sidebarClose()" class="icon-close icon-color w3-hide-large w3-right w3-padding w3-hover-grey" title="close menu">
                <i class="fa fa-remove"></i>
            </a>
           
            <h4 class="title--n"><b>LÊ TRƯỜNG AN</b></h4>
            <p class="text-slogan hidden">khongbaogionhanminhngu</p>
        </div>  

        <div class="w3-bar-block">
            <router-link :to="`/`" :class="{ active: $route.path === '/' }" class="text-nav w3-bar-item w3-button w3-padding">    
                <i class="fa fa-home fa-fw w3-margin-right"></i>HOME
            </router-link>
            <!-- <router-link :to="`/resume`" :class="{ active: $route.path === '/resume' }" class="text-nav w3-bar-item w3-button w3-padding">    
                <i class="fa fa-address-card-o fa-fw w3-margin-right"></i>RESUME
            </router-link> -->
 
            <a href="mailto:truongan2700@gmail.com" class="text-nav w3-bar-item w3-button w3-padding">
                <i class="fa fa-envelope w3-margin-right"></i>CONTACT
            </a>
            <!--
            <router-link :to="`/sendmail`" :class="{ active: $route.path === '/sendmail' }" class="text-nav w3-bar-item w3-button w3-padding">    
                <i class="fa fa-envelope fa-fw w3-margin-right"></i>SEND MAIL
            </router-link>
            
            <router-link :to="`/manga/search`" v-if="isActive('/manga')" :class="{ active: isActive('/manga') }" class="text-nav w3-bar-item w3-button w3-padding">    
                <i class="fa fa-book fa-fw w3-margin-right"></i>MANGA
            </router-link>
            -->
            
        </div>   

        <div class="w3-panel w3-large">
            <a href="https://github.com/anankhongngu/" class="w3-margin-right icon-color">
                <i class="fa fa-github w3-hover-opacity"></i>
            </a>
            <a href="https://fb.com/truongan15" class="w3-margin-right icon-color">
                <i class="fa fa-facebook-official w3-hover-opacity"></i>
            </a>  
        </div>
        <div class="w3-panel hidden">
            <div class="header-action header-action_lang">							
                <div class="header-action_text">
                    <ul class="list-lang">
                        <li class="btn-language-vi" title="ngôn ngữ">
                            <a href="#" class="lang-vi btn_change_lang" style="background-position:-200px -400px;">
                                <svg width="800px" height="800px" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--twemoji" preserveAspectRatio="xMidYMid meet"><path fill="#DA251D" d="M32 5H4a4 4 0 0 0-4 4v18a4 4 0 0 0 4 4h28a4 4 0 0 0 4-4V9a4 4 0 0 0-4-4z"></path><path fill="#FF0" d="M19.753 16.037L18 10.642l-1.753 5.395h-5.672l4.589 3.333l-1.753 5.395L18 21.431l4.589 3.334l-1.753-5.395l4.589-3.333z"></path></svg>
                            </a>	
                        </li>
                        <li class="btn-language-en" title="ngôn ngữ">
                            <a href="#" class="lang-en btn_change_lang" style="background-position:-0px -0px; ">
                                <svg width="800px" height="800px" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--twemoji" preserveAspectRatio="xMidYMid meet"><path fill="#00247D" d="M0 9.059V13h5.628zM4.664 31H13v-5.837zM23 25.164V31h8.335zM0 23v3.941L5.63 23zM31.337 5H23v5.837zM36 26.942V23h-5.631zM36 13V9.059L30.371 13zM13 5H4.664L13 10.837z"></path><path fill="#CF1B2B" d="M25.14 23l9.712 6.801a3.977 3.977 0 0 0 .99-1.749L28.627 23H25.14zM13 23h-2.141l-9.711 6.8c.521.53 1.189.909 1.938 1.085L13 23.943V23zm10-10h2.141l9.711-6.8a3.988 3.988 0 0 0-1.937-1.085L23 12.057V13zm-12.141 0L1.148 6.2a3.994 3.994 0 0 0-.991 1.749L7.372 13h3.487z"></path><path fill="#EEE" d="M36 21H21v10h2v-5.836L31.335 31H32a3.99 3.99 0 0 0 2.852-1.199L25.14 23h3.487l7.215 5.052c.093-.337.158-.686.158-1.052v-.058L30.369 23H36v-2zM0 21v2h5.63L0 26.941V27c0 1.091.439 2.078 1.148 2.8l9.711-6.8H13v.943l-9.914 6.941c.294.07.598.116.914.116h.664L13 25.163V31h2V21H0zM36 9a3.983 3.983 0 0 0-1.148-2.8L25.141 13H23v-.943l9.915-6.942A4.001 4.001 0 0 0 32 5h-.663L23 10.837V5h-2v10h15v-2h-5.629L36 9.059V9zM13 5v5.837L4.664 5H4a3.985 3.985 0 0 0-2.852 1.2l9.711 6.8H7.372L.157 7.949A3.968 3.968 0 0 0 0 9v.059L5.628 13H0v2h15V5h-2z"></path><path fill="#CF1B2B" d="M21 15V5h-6v10H0v6h15v10h6V21h15v-6z"></path></svg>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="theme-switch-wrapper">
            <label for="checkbox" class="theme-switch">
                <input @change="switchTheme" :class="current" type="checkbox" id="checkbox">
                <div class="slider-cb round"></div>
            </label>
        </div> 
    </nav> 
    <div class="w3-overlay w3-hide-large w3-animate-opacity" @click="sidebarClose()" style="cursor:pointer; display: none;" title="close side menu" id="myOverlay"></div>
</template>

<script>
    export default {
        data() {
            return {
                current: localStorage.getItem('theme') || 'dark'
            }
        },       
        setup() {
            //const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
            const currentTheme = localStorage.getItem('theme');
            if (currentTheme) {
                document.documentElement.setAttribute('data-theme', currentTheme);
            }   
        },
        methods: {           
            switchTheme(e) {
                if (e.target.classList.contains('dark')) {
                    document.documentElement.setAttribute('data-theme', 'light');
                    localStorage.setItem('theme', 'light');
                    this.current = 'light';
                } else {
                    document.documentElement.setAttribute('data-theme', 'dark');
                    localStorage.setItem('theme', 'dark');
                    this.current = 'dark';
                } 
            },
            sidebarOpen() {
                document.getElementById("mySidebar").style.display = "block";
                document.getElementById("myOverlay").style.display = "block";
            },
            sidebarClose() {
                document.getElementById("mySidebar").style.display = "none";
                document.getElementById("myOverlay").style.display = "none";
            },
            isActive(route) {
                //console.log(this.$route.path.startsWith(route))
                return this.$route.path.startsWith(route);
            },
        }            
    }
</script>

<style>
    .text-nav {
        color: var(--text-black);
    }
    .active.text-nav {
        color: var(--icon-green);
        font-weight: bold;
    }
    ul.list-lang a svg {
        width: 30px;
        height: 30px;
    }
    .list-lang {
        display: flex;
        align-items: center;
        margin: 0;
        gap: 10px;
    }
    .icon-close  {
        font-size: 25px;
    }
</style>