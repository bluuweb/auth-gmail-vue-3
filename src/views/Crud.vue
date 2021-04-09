<template>
  <div v-if="isAuthenticated">
    <h1>Crud</h1>
    <hr />
    <div v-if="cargando">
        <Cargando />
    </div>
    <div v-else>
        <Error v-if="pintarError" />
        <TodoForm />
        <Todo 
            v-for="todo in todos" :key="todo.id" :todo="todo"
        />
    </div>
  </div>
</template>

<script setup>
    import Cargando from "../components/Cargando";
    import TodoForm from "../components/TodoForm";
    import Error from "../components/Error";
    import Todo from "../components/Todo"

    import { useAuth } from "@vueuse/firebase";
    import { useGetTodosHook } from "../composables/useGetTodosHook";
    import {onMounted, provide, ref, watchEffect, computed} from 'vue'

    const { isAuthenticated } = useAuth();
    const { getTodos, cargando } = useGetTodosHook();
    const todos = ref([]);

    const error = ref(null);

    const pintarError = computed(() => error.value ? true : false)

    provide('todos', todos)
    provide('error', error)

    onMounted(async() => {
        todos.value = await getTodos()
        if(todos.value.error){
            error.value = todos.value.res
        }
    })
</script>