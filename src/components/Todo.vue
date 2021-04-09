<template>
  <div class="card shadow-sm mb-2">
    <div class="card-body">
      <p class="m-0" :class="{'text-decoration-line-through': todo.estado }">{{ todo.texto }}</p>
      <div class="mt-2">
        <button
          class="btn btn-sm me-2"
          :class="todo.estado ? 'btn-success' : 'btn-warning'"
          @click="modificar(todo)"
        >
          {{ todo.estado ? "Finalizada" : "Pendiente" }}
        </button>
        <button class="btn btn-sm btn-danger" @click="eliminar(todo.id)">
          Eliminar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
    import { defineProps, inject } from "vue";
    import { useGetTodosHook } from '../composables/useGetTodosHook'

    const todos = inject('todos')
    const error = inject('error')
    const {eliminarTodo, modificarTodo} = useGetTodosHook()

    const props = defineProps({
        todo: Object
    })

    const modificar = async (todo) => {
        const res = await modificarTodo(todo)
        if(res.error){
            error.value = res.res
            return
        }
        todos.value = todos.value.map((item) =>
          item.id === todo.id ? { ...item, estado: !todo.estado } : item
        );
    }

    const eliminar = async (id) => {

        const res = await eliminarTodo(id)
        console.log(res)
        
        if(res.error){
            error.value = res.res
            return
        }

        todos.value = todos.value.filter(item => item.id !== id)
    }

</script>


