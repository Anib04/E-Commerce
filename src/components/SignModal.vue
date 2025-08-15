<template>
  <v-dialog
    width="auto"
    :model-value="props.modelValue"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <v-card max-width="400" prepend-icon="mdi-update" title="Ingresar">
      <v-sheet class="mx-auto" width="300">
        <v-form @submit.prevent @submit="signUpForm">
          <v-text-field v-model="userEmail" label="Email" style="margin: 0px 5px"></v-text-field>
          <v-text-field
            v-model="userPassword"
            label="Password"
            style="margin: 0px 5px"
          ></v-text-field>
          <v-btn class="mt-2" type="submit" block>Submit</v-btn>
        </v-form>
      </v-sheet>
      <v-card-actions style="margin: 0px 10px !important">
        <v-btn class="ms-auto" text="Cancel" @click="emit('update:modelValue', false)"></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script setup>
import { ref } from 'vue'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/fireBaseConfig'
// import { useAuthStore } from '@/stores/authStore'

// const authStore = useAuthStore()
const userEmail = ref('')
const userPassword = ref('')
// Propiedad para recibir el valor del v-model del componente padre
const props = defineProps({
  modelValue: Boolean,
})

const signUpForm = async () => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      userEmail.value,
      userPassword.value,
    )
    const user = userCredential.user
    console.log('Usuario registrado:', user)
    userEmail.value = ''
    userPassword.value = ''
    emit('update:modelValue', false)
  } catch (error) {
    const errorCode = error.code
    const errorMessage = error.message
    console.error('Error de registro:', errorCode, errorMessage)
  }
}
// Emisor para notificar al componente padre de los cambios
const emit = defineEmits(['update:modelValue'])
</script>
