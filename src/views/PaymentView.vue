<template>
  <v-container>
    <v-row justify-center>
      <v-col cols="12">
        <h1 class="text-center mb-6">Pagina de pago</h1>
        <v-list>
          <v-list-item v-for="item in detailCart" :key="item.id" class="mb-4">
            <template v-slot:append>
              <v-avatar rounded="0" size="50">
                <v-img :src="item.image"></v-img>
              </v-avatar>
              <v-btn
                icon="mdi-delete"
                variant="text"
                color="grey"
                @click="cartStore.deleteProduct(item.id)"
              ></v-btn>
              <v-btn
                icon="mdi-plus"
                variant="text"
                color="grey"
                @click="cartStore.addProductToCart(item)"
              ></v-btn>
            </template>

            <v-list-item-title class="font-weight-bold">{{ item.title }}</v-list-item-title>
            <v-list-item-subtitle>
              Precio: ${{ item.price }} Cantidad: {{ item.quantity }}
            </v-list-item-subtitle>
          </v-list-item>
        </v-list>
        <p class="text-center text-bold">Total a pagar: {{ total.toFixed(2) }}</p>
        <v-btn block class="ma-2" color="#f8962c" @click="redirectToCheckout"> Pagar </v-btn>
      </v-col>
    </v-row>
  </v-container>
  <v-snackbar
    :timeout="4000"
    :color="error ? 'error' : 'success'"
    rounded="pill"
    v-model="snackBarOpen"
  >
    {{ msg }}
  </v-snackbar>
</template>
<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useCartStore } from '@/stores/cartStore'

const cartStore = useCartStore()
const { detailCart, loading, error, msg, snackBarOpen } = storeToRefs(cartStore)

const total = ref(0)

const paymentLinkUrl = 'https://buy.stripe.com/test_7sY8wP2Wp4nR2271qr3Ru00'

for (const product of detailCart.value) {
  total.value += product.price * product.quantity
}

const redirectToCheckout = () => {
  loading.value = true
  msg.value = 'Redirigiendo a la pasarela de pago...'
  snackBarOpen.value = true
  // Esta simple línea redirige al usuario a la página de pago de Stripe
  // La pagina de pago solamente contiene un product de prueba, ya que la idea era iniciar en el conocimiento de una pasarela de pago y no crear un sistema de pagos completo

  setTimeout(() => {
    window.location.href = paymentLinkUrl
  }, 2000)
}
</script>

<style scoped></style>
