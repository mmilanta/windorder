import { createRouter, createWebHistory } from 'vue-router';
import RecipePage from '../components/RecipePage.vue'; // This component will display the recipe
import IndexPage from '../components/IndexPage.vue'; // This component will display the recipe
import EditRecipeForm from '../components/EditRecipeForm.vue'; // This component will display the recipe

const routes = [
  {
    path: '/recipe/:id',
    name: 'Recipe',
    component: RecipePage,
    props: true
  },
  {
    path: '/',
    name: 'Index',
    component: IndexPage,
    props: true
  },
  {
    path: '/edit',
    name: 'Edit',
    component: EditRecipeForm,
    props: true
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
