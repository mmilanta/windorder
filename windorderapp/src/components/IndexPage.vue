<script setup>
import LoginComponent from "./LoginComponent.vue";
</script>
<template>
  <div>
    <LoginComponent/>
    <h1>Le Ricette di Nonna Aua</h1>
    <ul>
    <li v-for="(recipes_of_kind, category) in recipes" :key="category">
      <h2 v-html="category.split('_').join(' ')"/>
      <ul>
      <li v-for="recipe in recipes_of_kind" :key="recipe.id">
        <a @click="this.$router.push('/recipe/' + recipe.id);">{{ recipe.title }}</a>
      </li>
      </ul>
    </li>
    </ul>
  </div>
</template>
<script>
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/index";
export default {
  data() {
    return {
      recipes: {},
      logged_in: false,
      user_name: ''
    }
  },
  async created() {
    const recipes = await getDocs(collection(db, "recipes"));
    this.recipes = {}

    recipes.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      var row = doc.data()
      if (!(row.category in this.recipes)){
        this.recipes[row.category] = []
      }
      this.recipes[row.category].push({
        title: row.title,
        id: doc.id
      })
    });
    for (const key of Object.keys(this.recipes)) {
      this.recipes[key].sort((a, b) => a.title.localeCompare(b.title))
    }

  },
};
</script>
