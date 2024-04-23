<script setup>
import LoginComponent from "./LoginComponent.vue";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/index";
</script>
<template>
  <div class="bg-orange-50 min-h-screen">
    <div class="container flex flex-col px-5 mx-auto xs:space-y-10 md:space-y-5 space-y-3">
      <p class="xl:text-8xl mb-10 lg:text-7xl md:text-6xl sm:text-5xl text-4xl mt-10 font-serif">Le Ricette di Nonna Aua</p>
      <div v-for="(recipes_of_kind, category) in recipes" :key="category" class="container flex flex-col px-5 mx-auto space-y-0">
        <div class="container  xl:space-y-5 md:space-y-2 space-y-1">
          <p class="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl" style="text-transform: capitalize" v-html="category.split('_').join(' ')"></p>
          <div class="container px-5 xl:space-y-2 md:space-y-1 ">
            <div v-for="recipe in recipes_of_kind" :key="recipe.id">
              <p @click="navigate_to_recipe_page(recipe.id);" class="font-serif text-md hover:underline sm:text-lg md:text-xl lg:text-2xl">{{ recipe.title }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="h-5"></div>
      <div v-if="Object.keys(recipes).length !== 0" class="flex flex-row">
        <button v-if="logged_in" class="bg-emerald-500 hover:bg-emerald-700 text-white py-2 px-4 mx-4 rounded w-fit" @click="create_recipe">
          New Recipe
        </button>
        <LoginComponent></LoginComponent>
      </div>
      <div class="h-5"></div>
    </div>
  </div>
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
    onAuthStateChanged(auth, (user) => {
      if (user){
        this.logged_in = true;
        console.log(user.email)
        this.user_name = user.email
      } else {
        this.logged_in = false;
      }
    })
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
