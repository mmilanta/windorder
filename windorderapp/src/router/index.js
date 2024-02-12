import { createRouter, createWebHistory } from 'vue-router';
import RecipeComponent from '../components/RecipeComponent.vue'; // This component will display the recipe
import HomePage from '../components/HomePage.vue'; // This component will display the recipe

const routes = [
  {
    path: '/recipe/:id',
    name: 'Recipe',
    component: RecipeComponent,
    props: true
  },
  {
    path: '/',
    name: 'Index',
    component: HomePage,
    props: true
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
