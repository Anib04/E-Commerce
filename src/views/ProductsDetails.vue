<template>
  <template v-if="error">
    <p>
      {{ error }}
    </p>
  </template>
  <v-card class="mx-auto product-card" max-width="500" :disabled="loading" :loading="loading">
    <template v-slot:loader="{ isActive }">
      <v-progress-linear :active="isActive" color="deep-purple" height="4" indeterminate>
      </v-progress-linear>
    </template>

    <v-img class="text-center text-white" height="200" :src="product.image">
      <v-card-title>{{ product.title }}</v-card-title>
    </v-img>

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
</template>

<script setup>
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useProductStore } from '../stores/ProductStore.js'
import { useCartStore } from '../stores/cartStore.js'

const productStore = useProductStore()
const cartStore = useCartStore()
// Extraemos las propiedades reactivas que vamos a usar
const { product, loading, error } = storeToRefs(productStore)

// 5. Instanciamos useRoute para acceder a los parámetros de la ruta
const route = useRoute()

onMounted(() => {
  // 6. Obtenemos el 'id' de la URL y llamamos a la acción del store
  const productId = route.params.id
  // (Necesitarías crear esta acción en tu store)
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
