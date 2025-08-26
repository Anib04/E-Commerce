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
</template>
<script setup>
import { storeToRefs } from 'pinia'
import { useCartStore } from '../stores/cartStore'
import { ref } from 'vue'

const total = ref(0)
const cartStore = useCartStore()
const { detailCart } = storeToRefs(cartStore)

for (const product of detailCart.value) {
  total.value += product.price * product.quantity
}
</script>
