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
                @clic="cartStore.deleteProduct(item.id)"
              ></v-btn>
              <v-btn
                icon="mdi-plus"
                variant="text"
                color="grey"
                @clic="cartStore.addProductToCart(item)"
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
</template>
<script setup>
import { ref } from 'vue'

import { storeToRefs } from 'pinia'
import { useCartStore } from '../stores/cartStore'

const total = ref(0)
const cartStore = useCartStore()
const { detailCart, loading } = storeToRefs(cartStore)

for (const product of detailCart.value) {
  total.value += product.price * product.quantity
}

const paymentLinkUrl = 'https://buy.stripe.com/test_7sY8wP2Wp4nR2271qr3Ru00'

const redirectToCheckout = () => {
  loading.value = true
  // Esta simple línea redirige al usuario a la página de pago de Stripe
  window.location.href = paymentLinkUrl
}
</script>

<style scoped></style>
