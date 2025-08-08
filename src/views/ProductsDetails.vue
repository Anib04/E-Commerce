<template>
  <template v-if="error">
    <p>
      {{ error }}
    </p>
  </template>
  <v-card class="mx-auto" max-width="500" :disabled="loading" :loading="loading">
    <template v-slot:loader="{ isActive }">
      <v-progress-linear :active="isActive" color="deep-purple" height="4" indeterminate>
      </v-progress-linear>
    </template>

    <v-img class="align-end text-white" height="200" :src="product.image" cover>
      <v-card-title>{{ product.title }}</v-card-title>
    </v-img>

    <v-card-subtitle class="pt-4"> {{ product.price }} </v-card-subtitle>

    <v-card-text>
      <p>{{ product.description }}</p>
    </v-card-text>
    <v-card-text>
      {{ product.category }}
    </v-card-text>
  </v-card>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useProductStore } from '../stores/ProductStore.js'

const productStore = useProductStore()
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
