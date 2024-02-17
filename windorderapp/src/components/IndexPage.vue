<script setup>
import LoginComponent from "./LoginComponent.vue";
import { NList, NListItem, NSpace, NButton } from 'naive-ui';
</script>
<template>
  <n-space vertical style="padding: 10px 20px 10px 20px">
    <h1>Le Ricette di Nonna Aua</h1>
    <div v-for="(recipes_of_kind, category) in recipes" :key="category">
      <h2 v-html="category.split('_').join(' ')" style="text-transform: capitalize"/>
      <NList hoverable clickable>
        <div v-for="recipe in recipes_of_kind" :key="recipe.id">
          <NListItem @click="navigate_to_recipe_page(recipe.id);" style="height: 14px">
            {{ recipe.title }}
          </NListItem>
        </div>
      </NList>
    </div>
    <NButton @click="create_recipe">
      Nuova Ricetta
    </NButton>
    <LoginComponent/>
  </n-space>
</template>
<script>

import router from "@/router";
import { collection, getDocs, addDoc } from "firebase/firestore";
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
  methods: {
    navigate_to_recipe_page(recipe_id){
      router.push('/recipe/' + recipe_id)
    },
    async create_recipe(){
      const new_recipe = await addDoc(collection(db, "recipes"), {
        title: "title",
        category: "category",
        ingredients: "ingredients",
        steps: "steps",
        notes: "notes"
      })
      router.push('/recipe/' + new_recipe.id)
    }
  }
};
</script>
