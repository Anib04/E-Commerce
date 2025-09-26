<template>
  <v-skeleton-loader v-if="loading" :elevation="24" boilerplate type="card"></v-skeleton-loader>
  <v-card v-else class="mx-auto product-card" max-width="500">
    <v-card-title class="text-center text-blue-grey-darken-3"
      >{{ product.title }}
      <v-img class="" height="200" :src="product.image"> </v-img>
    </v-card-title>

    <v-card-subtitle class="pt-4"> ${{ product.price }} </v-card-subtitle>

    <v-card-text>
      <p>{{ product.description }}</p>
    </v-card-text>
    <v-card-text>
      <v-icon icon="mdi-tag"></v-icon>
      {{ product.category }}
    </v-card-text>
    <v-card-actions>
      <v-btn
        @click="cartStore.addProductToCart(product)"
        class="text-blue-grey-darken-4 product-btn"
        block
        >Add to cart
      </v-btn>
    </v-card-actions>
  </v-card>
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
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useProductStore } from '@/stores/ProductStore.js'
import { useCartStore } from '@/stores/cartStore.js'

const productStore = useProductStore()
const cartStore = useCartStore()
const route = useRoute()

const { product, loading, error } = storeToRefs(productStore)
const { msg, snackBarOpen } = storeToRefs(cartStore)

onMounted(() => {
  // 6. Obtenemos el 'id' de la URL y llamamos a la acción del store
  const productId = route.params.id
  productStore.fetchProductById(productId)
})
</script>

<style>
.product-card {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1) !important;
  border-radius: 15px !important;
  transition: transform 0.2s ease-in-out !important;
}
.product-btn {
  background-color: #f8962c !important;
  text-decoration: none !important;
}
</style>
