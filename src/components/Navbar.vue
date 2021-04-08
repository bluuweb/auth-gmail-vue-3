<template>
  <nav class="navbar navbar-dark bg-primary">
    <div class="container">
      <router-link to="/" class="navbar-brand">{{titulo}}</router-link>
      <div>
        <button class="btn btn-dark" @click="signIn" v-if="!isAuthenticated">Acceder</button>
        <button class="btn btn-danger" @click="signOut" v-else>Salir</button>
      </div>
    </div>
  </nav>
</template>

<script setup>
import {computed} from 'vue'
import { useAuthHook } from "../composables/useAuthHook";
import { useAuth } from "@vueuse/firebase";

const { signIn, signOut } = useAuthHook();
const { user, isAuthenticated } = useAuth();

const titulo = computed(() => {
  return isAuthenticated.value ? user.value.displayName : "Firestore";
});
</script>
