import { auth, firebase } from "../firebase/config"
import {useRouter} from 'vue-router'

export const useAuthHook = () => {

    const router = useRouter()
    
    const signIn = async() => {
        try {
            const provider = new firebase.auth.GoogleAuthProvider()
            await auth.signInWithPopup(provider)
            await router.push('/perfil')
        } catch (error) {
            console.log(error)
        }
    }

    const signOut = async() => {
        await auth.signOut()
        await router.push('/')
    }
    
    return {signIn, signOut}

}