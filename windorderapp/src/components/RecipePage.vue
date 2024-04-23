<script setup>
import LoginComponent from "./LoginComponent.vue";
import EditRecipeForm from "./EditRecipeForm.vue";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/index";

</script>
<template>
  <div class="bg-orange-50 min-h-screen">
    <div v-if="!isEditing && recipe_parsed" class="container flex flex-col px-5 mx-auto xs:space-y-10 md:space-y-5 space-y-3">
      <p v-html="recipe_parsed.title" class="xl:text-8xl mb-10 lg:text-7xl md:text-6xl sm:text-5xl text-4xl mt-10 font-serif"></p>
      <p class="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl">Ingredienti</p>
      <p class="font-serif text-lg" v-html="recipe_parsed.ingredients"/>
      <p class="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl">Ricetta</p>
      <p class="font-serif text-lg" v-html="recipe_parsed.steps"/>
      <p class="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl" v-if="recipe_parsed.notes">Note</p>
      <p class="font-serif text-lg" v-html="recipe_parsed.notes"/>      
      <div class="flex flex-row">
        <button v-if="logged_in" class="bg-yellow-500 hover:bg-yellow-700 text-white py-2 px-4 mr-4 rounded"  type="error" @click="isEditing = true" color="#63e2b7">
          Edit
        </button>      
        <button v-if="logged_in" class="bg-red-500 hover:bg-red-700 text-white py-2 px-4 mr-4 rounded"  type="error" @click="deleteRecipe" color="#63e2b7">
          Delete
        </button>
        <LoginComponent></LoginComponent>
      </div>
    </div>
    <div v-if="isEditing && recipe_parsed">
      <EditRecipeForm v-if="recipe" @SaveRecipe="saveChanges" @DiscardRecipe="discardChanges" :recipe="recipe"/>
    </div>
    <div class="h-5"></div>
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
      logged_in: false,
      recipe: {
        title: "test",
        category: "test",
        ingredients: "test",
        steps: "test",
        notes: "test"
      },
      recipe_parsed: '',
    }
  },
  async created() {
    await this.fetchRecipe()
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
      if(confirm("Do you really want to delete this recipe? There is no coming back")){
        const docRef = doc(db, "recipes", this.id);
        await deleteDoc(docRef);
        router.push('/')
      }
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
