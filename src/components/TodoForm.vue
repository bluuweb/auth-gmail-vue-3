<template>
    <form @submit.prevent="procesarFormulario">
        <input 
            type="text"
            placeholder="Enter para agregar Tarea"
            class="form-control my-3"
            v-model.trim="texto"
        >
  </form>
</template>

<script setup>
    import { inject, ref } from "vue";
    import {useGetTodosHook} from '../composables/useGetTodosHook'

    const todos = inject('todos')
    const error = inject('error')

    const {agregarTodo} = useGetTodosHook()
    const texto = ref('')

    const procesarFormulario = async() => {
        error.value = null
        if(!texto.value.trim()){
            error.value = 'Texto vacío'
            return console.log("texto vacio")
        }

        const todo = await agregarTodo(texto.value)
        
        if(todo.error){
            error.value = todo.res
            texto.value = ''
            return
        }

        console.log(todo)
        todos.value = [...todos.value, todo]
        texto.value = ''
    }

</script>