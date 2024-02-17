<script setup>
import LoginComponent from "./LoginComponent.vue";
import EditRecipeForm from "./EditRecipeForm.vue";
import { NButton, NSpace } from 'naive-ui';
</script>
<template>
  <n-space vertical style="padding: 10px 20px 10px 20px">
    <LoginComponent/>
    <div v-if="!isEditing">
      <h1 v-html="recipe_parsed.title"/>
      <h2>Ingredienti</h2>
      <p v-html="recipe_parsed.ingredients"/>
      <h2>Ricetta</h2>
      <p v-html="recipe_parsed.steps"/>
      <h2>Note</h2>
      <p v-html="recipe_parsed.notes"/>
      <p class="card-text" v-html="viewableContent"/>
      <NSpace>
      <NButton type="warning" @click="isEditing = true">Edit</NButton>
      <NButton type="error" @click="deleteRecipe">Delete</NButton>
    </NSpace>
    </div>
    <div v-else>
      <EditRecipeForm v-if="recipe" @SaveRecipe="saveChanges" @DiscardRecipe="discardChanges" :recipe="recipe"/>
    </div>
  </n-space>
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
.txt_box {
display: flex;
width: 100%;
height: 20vh;
}
</style> 
