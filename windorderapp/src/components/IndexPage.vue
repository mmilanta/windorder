<template>
  <div>
    <li v-for="item in recipes" :key="item.id">
      {{ item.title }}
    </li>
  </div>
</template>
<script>
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/index"

export default {
  setup() {
    return {
      waitingList: {},
    };
  },
  async created() {
    this.recipes = await getDocs(collection(db, "recipes"));

    this.recipes.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.title, " => ", doc.data());
    });

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