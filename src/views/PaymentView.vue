<template>
  <v-container>
    <v-row justify-center>
      <v-col cols="12" md="6">
        <h1 class="text-center mb-6">Pagina de pago</h1>
        <v-list>
          <v-list-item v-for="item in detailCart" :key="item.id" class="mb-4">
            <template v-slot:append>
              <v-avatar rounded="0" size="50">
                <v-img :src="item.image"></v-img>
              </v-avatar>
              <v-btn icon="mdi-delete" variant="text" color="grey"></v-btn>
            </template>

            <v-list-item-title class="font-weight-bold">{{ item.title }}</v-list-item-title>
            <v-list-item-subtitle>
              Precio: ${{ item.price }} <br />
              Cantidad: {{ item.quantity }}
            </v-list-item-subtitle>
          </v-list-item>
        </v-list>
        <p class="text-center text-bold">Total a pagar: {{ total.toFixed(2) }}</p>
      </v-col>
    </v-row>
  </v-container>
  <v-container>
    <Elements v-if="clientSecret" :stripe="stripePromise" :options="{ clientSecret }">
      <v-form @submit.prevent="handleSubmit">
        <v-text-field
          v-model="name"
          label="Nombre en la tarjeta"
          variant="outlined"
          class="mb-4"
        ></v-text-field>

        <v-text-field
          v-model="email"
          label="Correo Electrónico"
          variant="outlined"
          class="mb-4"
        ></v-text-field>

        <label>Datos de la Tarjeta</label>
        <CardElement :options="cardOptions" class="stripe-card-element mb-4" />

        <v-alert v-if="paymentError" type="error" dense class="mb-4">
          {{ paymentError }}
        </v-alert>

        <v-btn
          :loading="loading"
          :disabled="loading"
          type="submit"
          color="primary"
          block
          size="large"
        >
          Pagar ${{ (cartTotal / 100).toFixed(2) }}
        </v-btn>
      </v-form>
    </Elements>
  </v-container>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, CardElement, useStripe, useElements } from 'vue-stripe'

// --- Estado del Componente ---
const loading = ref(false)
const paymentError = ref(null)
const name = ref('')
const email = ref('')
const clientSecret = ref('')
const cartTotal = ref(4999)

import { storeToRefs } from 'pinia'
import { useCartStore } from '../stores/cartStore'

const total = ref(0)
const cartStore = useCartStore()
const { detailCart } = storeToRefs(cartStore)

for (const product of detailCart.value) {
  total.value += product.price * product.quantity
}

// --- Configuración de Stripe ---
// Reemplaza con tu clave publicable
const stripePromise = loadStripe(
  'pk_test_51RzU4tHbCqxAH7fQCO55TlG402Ok2g3lmctNoyhIAU5ltl2ldGyfS6j8LYjjtcH5SjErAzmiHlc6BRxM20vGC2Cn00OzhBaIor',
)

const cardOptions = {
  style: {
    base: {
      color: '#32325d',
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': {
        color: '#aab7c4',
      },
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a',
    },
  },
}

// --- Lógica del Flujo de Pago ---

// 1. Al cargar la página, obtenemos el clientSecret del backend
onMounted(async () => {
  try {
    const response = await axios.post('http://localhost:4242/create-payment-intent', {
      amount: total.value,
    })
    clientSecret.value = response.data.clientSecret
  } catch (error) {
    paymentError.value = 'Error al conectar con la pasarela de pago.'
    console.error(error)
  }
})

// 2. Al enviar el formulario, confirmamos el pago
const handleSubmit = async () => {
  loading.value = true
  paymentError.value = null

  const stripe = useStripe()
  const elements = useElements()

  if (!stripe || !elements) {
    // Stripe.js no ha cargado todavía.
    loading.value = false
    return
  }

  const cardElement = elements.getElement(CardElement)

  // 3. Llamada final a Stripe para confirmar el pago
  const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret.value, {
    payment_method: {
      card: cardElement,
      billing_details: {
        name: name.value,
        email: email.value,
      },
    },
  })

  if (error) {
    // Muestra el error al usuario
    paymentError.value = error.message
  } else {
    // El pago fue exitoso
    console.log('PaymentIntent:', paymentIntent)
    if (paymentIntent.status === 'succeeded') {
      alert('¡Pago exitoso!')
      // Aquí deberías:
      // 1. Guardar la orden en tu base de datos (Firestore).
      // 2. Vaciar el carrito de compras.
      // 3. Redirigir al usuario a una página de "Gracias".
    }
  }

  loading.value = false
}
</script>

<style scoped>
/* Estilos para el campo de tarjeta de Stripe */
.stripe-card-element {
  border: 1px solid #ced4da;
  padding: 12px;
  border-radius: 4px;
  background-color: white;
}
</style>
