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
          <v-card color="#fcecf6 " min-height="400" width="85%">
            <v-card-title class="text-h5 font-weight-bold text-center">
              {{ !areLogin ? 'Crea tu cuenta' : 'Ingresa tu cuenta' }}
            </v-card-title>
            <p class="text-subtitle-1 mb-4 text-blue-grey-darken-4 text-center">
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
              <div class="d-flex justify-center mt-2">
                <v-btn
                  v-if="!areLogin"
                  width="50%"
                  class="align-center"
                  color="#f8962c"
                  type="submit"
                  >Crear</v-btn
                >
                <v-btn
                  v-else
                  width="50%"
                  class="align-center"
                  color="#f8962c"
                  type="button"
                  @click="handleSignIn"
                  >Ingresar</v-btn
                >
              </div>
            </v-form>
          </v-card>
          <v-btn class="mt-4 align-center" @click="areLogin = !areLogin" color="#f8962c">
            {{ !areLogin ? 'Ya tienes cuenta? Ingresa' : 'No tienes cuenta? Crea una' }}
          </v-btn>
        </v-sheet>
      </v-col>

      <v-col cols="12" md="5">
        <v-sheet
          color="#104475"
          height="100%"
          min-height="400"
          rounded="xl"
          class="d-flex flex-column justify-space-around align-center pa-8"
        >
          <h4 class="text-overline font-weight-bold text-white" style="font-size: 1.2em">
            E-COMMERCE
          </h4>
          <v-img :src="imageLogin" class="my-4" width="80%" max-width="450px"></v-img>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
  <v-snackbar :timeout="4000" color="red-darken-1" rounded="pill" v-model="snackBarOpen">
    {{ errorMessage }}
  </v-snackbar>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore.js'
import imageLogin from '@/assets/loginImage.jpg'

const router = useRouter()
const authStore = useAuthStore()
const snackBarOpen = ref(false)
const errorMessage = ref('')
const userEmail = ref('')
const userPassword = ref('')
const isLoading = ref(false)
const areLogin = ref(false)

const handleSignUp = async () => {
  if (!userEmail.value || !userPassword.value) {
    errorMessage.value = 'Por favor, ingresa email y contraseña.'
    snackBarOpen.value = true
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
    errorMessage.value = `Error al registrar: ${error.message}`
    snackBarOpen.value = true
  } finally {
    isLoading.value = false
  }
}
const handleSignIn = async () => {
  if (!userEmail.value || !userPassword.value) {
    errorMessage.value = 'Por favor, ingresa email y contraseña.'
    snackBarOpen.value = true
    return
  }

  isLoading.value = true
  try {
    // ¡Llamamos a la acción de la tienda y listo!
    await authStore.signIn(userEmail.value, userPassword.value)

    // Limpiamos el formulario después de un registro exitoso
    userEmail.value = ''
    userPassword.value = ''

    // Aquí podrías redirigir al usuario a otra página
    router.push('/')
  } catch (error) {
    // Si la tienda lanzó un error, aquí lo podemos atrapar para mostrar un mensaje
    errorMessage.value = `Error al loguear: ${error.message}`
    snackBarOpen.value = true
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped></style>
