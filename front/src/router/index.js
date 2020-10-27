import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import CallTicket from '../views/CallTicket.vue';
import GetTicket from '../views/GetTicket.vue';

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/callTicket',
    name: 'CallTicket',
    component: CallTicket
  },
  {
    path: '/getTicket',
    name: 'GetTicket',
    component: GetTicket
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
