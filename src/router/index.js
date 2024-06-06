import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
    history:createWebHistory(import.meta.env.BASE_URL),
    routes:[
        {   
            path:'/',
            name:'home',
            component: HomeView
        },        
        {
            path:'/listbet',
            name:'listbet',
            component: ()=> import ('../views/Clientes/Index.vue')
        },
        {
            path:'/transactions',
            name:'transactions',
            component: ()=> import ('../views/Transacciones/Index.vue')
        },
        {
            path:'/maptinbet',
            name:'maptinbet',
            component: ()=> import ('../views/Maps/MapTinbet.vue')
        },
        {
            path:'/mapbetgana',
            name:'mapbetgana',
            component: ()=> import ('../views/Maps/MapBetgana.vue')
        },
        {
            path:'/powerbi',
            name:'powerbi',
            component: ()=> import ('../views/Powerbi/Index.vue')
        }
        
        
    ]
})

            //console.log(router.options.routes);
            //aqui con esto evitamos que ingresen a rutas en las que no esten autorizados o no hayan echo login
            // router.beforeEach(async (to)=>{
            //     const publicPages = ['/login','/register']
            //     const authRequired = !publicPages.includes(to.path)
            //     const auth = useAuthStore()
            //     if(authRequired && !auth.user){
            //         auth.returnUrl = to.fullpath
            //         return'/login'
            //     }
            // })

export default router