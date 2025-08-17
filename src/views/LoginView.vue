<template>
  <v-container fluid class="bg-grey-lighten-4 pa-8">
    <v-row>
      <v-col cols="12" md="7">
        <v-sheet
          color="#104475"
          height="100%"
          min-height="400"
          rounded="xl"
          class="d-flex flex-column justify-space-around align-center pa-8"
        >
          <v-card color="#2f5aa8" min-height="400" width="85%">
            <v-card-title class="text-h5 font-weight-bold text-center">
              {{ !areLogin ? 'Crea tu cuenta' : 'Ingresa tu cuenta' }}
            </v-card-title>
            <p class="text-subtitle-1 mb-4">
              {{ !areLogin ? 'Empieza a comprar' : 'Continua comprando' }}
            </p>
            <v-form @submit.prevent @submit="handleSignUp">
              <v-text-field
                v-model="userEmail"
                label="Email"
                style="margin: 0px 5px"
              ></v-text-field>
              <v-text-field
                v-model="userPassword"
                label="Password"
                style="margin: 0px 5px"
              ></v-text-field>
              <v-btn v-if="!areLogin" class="mt-2" type="submit" block>Crear</v-btn>
              <v-btn v-else class="mt-2" type="button" block @click="areLogin = !areLogin"
                >Ingresar</v-btn
              >
            </v-form>
          </v-card>
        </v-sheet>
      </v-col>

      <v-col cols="12" md="5">
        <v-sheet
          color="purple-lighten-5"
          height="100%"
          min-height="400"
          rounded="xl"
          class="d-flex flex-column justify-space-around align-center pa-8"
        >
          <h4 class="text-overline font-weight-bold text-purple-darken-2" style="font-size: 1.2em">
            E-COMMERCE
          </h4>
          <v-img
            src="../../public/images/marcus-loke-xXJ6utyoSw0-unsplash.jpg"
            class="my-4"
            width="80%"
            max-width="450px"
          ></v-img>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/authStore.js' // Revisa la ruta a tu store
import { useRouter } from 'vue-router'

const router = useRouter()
const authStore = useAuthStore()

const userEmail = ref('')
const userPassword = ref('')
const isLoading = ref(false) // Extra: para deshabilitar el botón mientras se registra

const handleSignUp = async () => {
  if (!userEmail.value || !userPassword.value) {
    alert('Por favor, ingresa email y contraseña.')
    return
  }

  isLoading.value = true
  try {
    // ¡Llamamos a la acción de la tienda y listo!
    await authStore.signUp(userEmail.value, userPassword.value)

    // Limpiamos el formulario después de un registro exitoso
    userEmail.value = ''
    userPassword.value = ''

    // Aquí podrías redirigir al usuario a otra página
    router.push('/')
  } catch (error) {
    // Si la tienda lanzó un error, aquí lo podemos atrapar para mostrar un mensaje
    alert(`Error al registrar: ${error.message}`)
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
/* Opcional: Estilos personalizados si los necesitas */
h3,
h4,
p {
  text-align: center;
}
</style>
