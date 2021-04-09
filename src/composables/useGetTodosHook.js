import { useAuth } from '@vueuse/firebase'
import { db, marcaTiempo } from '../firebase/config'
import {ref} from 'vue'

export const useGetTodosHook = () => {
    const { user } = useAuth()
    const cargando = ref(false)
    const reference = db.collection('todos')
    
    const getTodos = async () => {
        try {
            cargando.value = true
            const res = await reference.where("uid", "==", user.value.uid).get()
            return res.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        } catch (error) {
            return {
                error: true,
                res: error
            }
        } finally {
            cargando.value = false
        }
    }

    const agregarTodo = async (texto) => {
        console.log('texto', texto)
        try {
            const todo = {
                texto: texto,
                fecha: marcaTiempo(),
                estado: false,
                uid: user.value.uid
            }
            const res = await reference.add(todo)

            todo.id = res.id

            return todo

        } catch (error) {
            return {
                error: true,
                res: error
            }
        } finally {

        }
    }

    const eliminarTodo = async (id) => {
        try {

            await reference.doc(id).delete(); 

            return {error: false}
            
        } catch (error) {
            return {
                error: true,
                res: error
            } 
        }
    }

    const modificarTodo = async (todo) => {
        try {

            await reference.doc(todo.id).update({
                estado: !todo.estado,
            });

            return {error: false}
            
        } catch (error) {
            return {
                error: true,
                res: error
            }
        }
    }

    return {getTodos, cargando, agregarTodo, eliminarTodo, modificarTodo}
}