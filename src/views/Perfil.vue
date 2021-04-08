<template>
  <div v-if="isAuthenticated">
    <h1>Ruta protegida</h1>
    <hr>
    <pre>Bienvenido: {{user}}</pre>
  </div>
</template>

<script setup>
import {useAuth} from '@vueuse/firebase'
const {user, isAuthenticated} = useAuth()
</script>