import { createRouter, createWebHistory } from 'vue-router'
import InfoMain from '../components/Main/InfoMain.vue'
import MangaInfo from '../views/MangaInfo.vue'
import MangaDetail from '../views/MangaDetail.vue'
import Resume from '../views/Resume.vue'
import SendMail from '../views/SendMail.vue'
import MovieDetail from '../views/MovieDetail.vue'

const routes = [
    { path: '/', component: InfoMain },
    { path: '/manga', component: MangaInfo },
    { path: '/manga/:id', component: MangaDetail, props: true },
    { path: '/resume', component: Resume },
    { path: '/sendmail', component: SendMail },
    { path: '/phim/:slug', component: MovieDetail }
]
 
const router = createRouter({ 
    history: createWebHistory(),
    routes
})

export default router 