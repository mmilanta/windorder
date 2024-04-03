<script setup>
</script>
<template>
  <div class="flex flex-row">
    <button v-if="logged_in" class="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded w-fit" @click="logout">Logout</button>
    <button v-else @click="login" class="bg-emerald-500 hover:bg-emerald-700 text-white py-2 px-4 rounded w-fit">Login</button>
    <div class="flex ml-4">
      <p class="m-auto" v-if="logged_in">Logged in as {{ user_name }}</p>
    </div>
  </div>
</template>

<script>
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/index";


export default {
  data() {
    return {
      logged_in: false,
      user_name: ''
    }
  },
  async created() {
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
    login() {
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider)
        .then((result) => {
        console.log(result);
      })
    },
    logout() {
      signOut(auth)
    },
  }
};
</script>
