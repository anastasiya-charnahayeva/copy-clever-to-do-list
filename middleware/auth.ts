import {useAuthStore} from '@/stores/useAuth'
export default defineNuxtRouteMiddleware((to) => {
    const authStore = useAuthStore();
    const allowedRoutes = ['/register', '/login']

    if (allowedRoutes.includes(to.path)
    && authStore.user) {
      return navigateTo('/todos')
    }
    if (!authStore.user && !allowedRoutes.includes(to.path)) {
      return navigateTo('/login')
    }    
  })