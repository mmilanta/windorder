
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
        <button @click="editRecipe">Edit</button>
      </div>
      <div v-else>
        <textarea class="txt_box" v-model="editableContent"></textarea>
        <button @click="saveChanges">Save</button>
        <button @click="discardChanges">Discard</button>
      </div>
    </div>
  </template>
  
  <script>
  import MarkdownIt from "markdown-it";
  import { collection, query, where, getDocs } from 'firebase/firestore';

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
      const recipesCollectionRef = collection(db, 'recipes');
      console.log("id: " + this.id)
      const q = query(recipesCollectionRef, where('id', '==', parseInt(this.id)));
  
      try {
        // Execute the query
        const querySnapshot = await getDocs(q);

        // Check if we got any documents
        if (querySnapshot.empty) {
          console.log('No matching documents.');
          return;
        }
        // Iterate through the documents
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          this.recipe = doc.data()
          console.log(doc.id, ' => ', this.recipe);
          // Process the data as needed
        });
        this.recipe_parsed = {
          title: this.recipe.title,
          ingredients: markdown.render(this.recipe.ingredients),
          steps: markdown.render(this.recipe.steps),
          notes: markdown.render(this.recipe.notes),
        }
      } catch (error) {
        console.error('Error getting documents: ', error);
      }

    },
    methods: {
      fetchRecipe() {
        fetch(`http://127.0.0.1:8000/recipe/${this.id}`)
          .then(response => response.json())
          .then(data => {
            this.editableContent = data.content; // Initialize editable content
            this.viewableContent = markdown.render(this.editableContent); // Initialize editable content
          })
          .catch(error => console.error('Error:', error));
      },
      editRecipe() {
        this.isEditing = true;
      },
      saveChanges() {
        const updatedRecipe = { content: this.editableContent, recipe_id: this.id};
        console.log(updatedRecipe)
        fetch(`http://127.0.0.1:8000/recipe/${this.id}`, {
          method: 'POST', // Or 'PUT' if your server requires it
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedRecipe),
        })
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error('Network response was not ok.');
        })
        .catch(error => console.error('Error:', error));
        this.isEditing = false;
        this.fetchRecipe(); // Reset changes
      },
      discardChanges() {
        this.fetchRecipe(); // Reset changes
        this.isEditing = false;
      }
    }
  }
  </script>
  <style>
.txt_box {
  display: flex;
  width: 95%;
  height: 90vh;
}
</style>