<template>
  <nav class="navbar navbar-dark bg-primary">
    <div class="container">
      <router-link to="/" class="navbar-brand">{{titulo}}</router-link>
      <div>
        <button class="btn btn-dark mx-1" @click="signIn" v-if="!isAuthenticated">Acceder</button>
        <div v-else>
          <button class="btn btn-sm btn-danger mx-1" @click="signOut">Salir</button>
          <router-link class="btn btn-sm btn-dark mx-1" to="/crud">CRUD</router-link>
          <router-link class="btn btn-sm btn-dark mx-1" to="/perfil">Perfil</router-link>
        </div>
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
