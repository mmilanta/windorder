<script setup>
import LoginComponent from "./LoginComponent.vue";
import EditRecipeForm from "./EditRecipeForm.vue";
import { NButton, NSpace } from 'naive-ui';
</script>
<template>
  <div class="bg-orange-50 min-h-screen">
    <div v-if="!isEditing" class="container flex flex-col px-5 mx-auto xs:space-y-10 md:space-y-5 space-y-3">
      <p v-html="recipe_parsed.title" class="xl:text-8xl mb-10 lg:text-7xl md:text-6xl sm:text-5xl text-4xl mt-10 font-serif"></p>
      <p class="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl">Ingredienti</p>
      <p class="font-serif text-lg" v-html="recipe_parsed.ingredients"/>
      <p class="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl">Ricetta</p>
      <p class="font-serif text-lg" v-html="recipe_parsed.steps"/>
      <p class="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl" v-if="recipe_parsed.notes">Note</p>
      <p class="font-serif text-lg" v-html="recipe_parsed.notes"/>      
      <NSpace>
      <NButton type="warning" @click="isEditing = true">Edit</NButton>
      <NButton type="error" @click="deleteRecipe">Delete</NButton>
      <LoginComponent></LoginComponent>
    </NSpace>
    </div>
    <div v-else>
      <EditRecipeForm v-if="recipe" @SaveRecipe="saveChanges" @DiscardRecipe="discardChanges" :recipe="recipe"/>
    </div>
  </div>
</template>

<script>
import router from "@/router";
import MarkdownIt from "markdown-it";
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';

import { db } from "../firebase/index"
const markdown = new MarkdownIt();


export default {
  props: ['id'],
  data() {
    return {
      isEditing: false,
      recipe: {
        title: "test",
        category: "test",
        ingredients: "test",
        steps: "test",
        notes: "test"
      },
      recipe_parsed: ''
    }
  },
  async created() {
    await this.fetchRecipe()
  },
  methods: {
    async fetchRecipe() {
      const docRef = doc(db, "recipes", this.id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        this.recipe = docSnap.data();
      } 
      this.recipe_parsed = {
        title: this.recipe.title,
        ingredients: markdown.render(this.recipe.ingredients),
        steps: markdown.render(this.recipe.steps),
        notes: markdown.render(this.recipe.notes),
      }
    },
    async saveChanges(edited_recipe) {
      const docRef = doc(db, "recipes", this.id);
      await updateDoc(docRef, edited_recipe);
      this.isEditing = false;
      this.fetchRecipe(); // Reset changes
    },
    discardChanges() {
      this.fetchRecipe(); // Reset changes
      this.isEditing = false;
    },
    editRecipe() {
      this.isEditing = true;
    },
    async deleteRecipe() {
      const docRef = doc(db, "recipes", this.id);
      await deleteDoc(docRef);
      router.push('/')
    },
  }
}
</script>
<style>

li {
    display: list-item;
    list-style-type: square;
    list-style-position: inside;
}
</style> 
