import HomeView from '@/views/HomeView.vue'
import MainLayout from '@/layouts/MainLayout.vue'
import { createRouter, createWebHistory } from 'vue-router'
import ProductsDetails from '@/views/ProductsDetails.vue'
import LoginView from '@/views/LoginView.vue'
import PaymentView from '@/views/PaymentView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: MainLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: HomeView,
        },
        {
          path: '/products-details/:id',
          name: 'products-details',
          component: ProductsDetails,
        },
      ],
    },
    { path: '/login', name: 'login', component: LoginView },
    { path: '/payment', name: 'pay', component: PaymentView },
  ],
})

export default router
