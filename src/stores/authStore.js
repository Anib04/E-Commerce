import { ref } from 'vue'
import { defineStore } from 'pinia'
import { createUserWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '@/fireBaseConfig.js' // Asegúrate de que la ruta sea correcta

export const useAuthStore = defineStore('auth', () => {
  // STATE: Aquí guardamos la información del usuario logueado.
  const user = ref(null)

  // ACTION: Función para registrar un nuevo usuario.
  const signUp = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      user.value = userCredential.user
      console.log('✅ Usuario registrado exitosamente:', user.value.email)
    } catch (error) {
      console.error('❌ Error de registro:', error.message)
      // Re-lanzamos el error para poder manejarlo en el componente si es necesario (ej. mostrar un mensaje al usuario)
      throw error
    }
  }

  // ACTION: Función para cerrar sesión.
  const logOut = async () => {
    try {
      await signOut(auth)
      user.value = null
    } catch (error) {
      console.error('❌ Error al cerrar sesión:', error)
    }
  }

  // LISTENER: Este se encarga de mantener el estado 'user' actualizado automáticamente.
  // Firebase nos avisará cada vez que el estado de autenticación cambie (login, logout).
  onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) {
      user.value = currentUser
      console.log('Usuario autenticado:', currentUser.email)
    } else {
      user.value = null
      console.log('No hay usuario autenticado.')
    }
  })

  // Exponemos solo lo que los componentes necesitan usar.
  return {
    user,
    signUp,
    logOut,
  }
})
