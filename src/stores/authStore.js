import { defineStore } from 'pinia'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/fireBaseConfig.js' // <-- Importas la instancia de auth

export const useAuthStore = defineStore('auth', () => {
  // ...
  const signUp = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user
      console.log('Usuario registrado:', user)
    } catch (error) {
      const errorCode = error.code
      const errorMessage = error.message
      console.error('Error de registro:', errorCode, errorMessage)
    }
  }
  return signUp
})
