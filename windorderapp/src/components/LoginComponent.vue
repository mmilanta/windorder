<template>
    <div>
      <div v-if="logged_in">Logged in as {{ user_name }}</div>
      <button v-if="logged_in" @click="logout">Logout</button>
      <button v-else @click="login">Login</button>
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
