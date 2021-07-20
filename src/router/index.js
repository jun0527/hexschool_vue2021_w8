import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: () => import('@/views/Front.vue'),
    children: [
      {
        path: '',
        component: () => import('@/views/front/Index.vue'),
      },
      {
        path: 'products',
        component: () => import('@/views/front/Products.vue'),
      },
      {
        path: 'product/:id',
        component: () => import('@/views/front/Product.vue'),
        props: (route) => ({
          id: route.params.id,
        }),
      },
      {
        path: 'customization',
        component: () => import('@/views/front/Customization.vue'),
      },
      {
        path: 'cart',
        component: () => import('@/views/front/Cart.vue'),
      },
      {
        path: 'createOrder',
        component: () => import('@/views/front/CreateOrder.vue'),
      },
      {
        path: 'payment/:id',
        component: () => import('@/views/front/Payment.vue'),
        props: (route) => ({
          id: route.params.id,
        }),
      },
      {
        path: 'signIn',
        component: () => import('@/views/SignIn.vue'),
      },
      {
        path: '/:pathMatch(.*)*',
        component: () => import('@/views/NotFound.vue'),
      },
    ],
  },
  {
    path: '/admin',
    component: () => import('@/views/Admin.vue'),
    children: [
      {
        path: '',
        component: () => import('@/views/admin/ProductsAdmin.vue'),
      },
      {
        path: 'orders',
        component: () => import('@/views/admin/Orders.vue'),
      },
      {
        path: 'coupon',
        component: () => import('@/views/admin/Coupon.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkExactActiveClass: 'linkActive',
  scrollBehavior() {
    return {
      top: 0,
    };
  },
});

export default router;
