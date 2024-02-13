<template>
  <div>
    <li v-for="item in recipes" :key="item">
      <a :href="href" @click="this.$router.push('/recipe/' + item.id);">{{ item.title }}</a>
    </li>
    
  </div>
</template>
<script>
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/index"

export default {
  data() {
    return {
      recipes: []
    }
  },
  async created() {
    const recipes = await getDocs(collection(db, "recipes"));
    this.recipes = []
    console.log(recipes)

    recipes.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      var row = doc.data()
      row.id = doc.id
      this.recipes.push(row);
    });

    console.log(this.recipes)
  },
};
</script>

<style>
.txt_box {
display: flex;
width: 95%;
height: 90vh;
}
</style>