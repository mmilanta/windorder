<template>
  <div>
    <div v-if="!isEditing">
      <h1 v-html="recipe_parsed.title"/>
      <h2>Ingredienti</h2>
      <p v-html="recipe_parsed.ingredients"/>
      <h2>Ricetta</h2>
      <p v-html="recipe_parsed.steps"/>
      <h2>Note</h2>
      <p v-html="recipe_parsed.notes"/>
      <p class="card-text" v-html="viewableContent"/>
      <button @click="isEditing = true">Edit</button>
    </div>
    <div v-else>
      <textarea v-model="recipe.title"/>
      <h2>Ingredienti</h2>
      <textarea v-model="recipe.ingredients"/>
      <h2>Ricetta</h2>
      <textarea v-model="recipe.steps"/>
      <h2>Note</h2>
      <textarea v-model="recipe.notes"/>
      <button @click="saveChanges">Save</button>
      <button @click="discardChanges">Discard</button>
    </div>
  </div>
</template>

<script>
import MarkdownIt from "markdown-it";
import { doc, getDoc, updateDoc } from 'firebase/firestore';

import { db } from "../firebase/index"
const markdown = new MarkdownIt();


export default {
  props: ['id'],
  data() {
    return {
      isEditing: false,
      recipe: '',
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

      console.log(this.id, ' => ', this.recipe);
      this.recipe_parsed = {
        title: this.recipe.title,
        ingredients: markdown.render(this.recipe.ingredients),
        steps: markdown.render(this.recipe.steps),
        notes: markdown.render(this.recipe.notes),
      }
    },
    async saveChanges() {
      const docRef = doc(db, "recipes", this.id);
      await updateDoc(docRef, this.recipe);

      console.log("About to edit:")
      console.log(this.recipe)
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
  }
}
</script>
<style>
textarea {
display: flex;
width: 95%;
height: 20vh;
}
</style>