<template>
  <div v-if="loading">Cargando productos...</div>

  <div v-else-if="error" style="color: red">
    {{ error }}
  </div>

  <div v-else>
    <v-container>
      <v-row>
        <v-col v-for="product in products" :key="product.id" cols="12" sm="6" md="4">
          <v-card color="white" class="ma-4" height="400px">
            <v-img :src="product.image" height="200px" cover>
              <v-card-title class="align-end text-white">
                {{ product.title }}
              </v-card-title>
            </v-img>

            <v-card-item>
              <div class="text-h6 mb-1">{{ product.title }}</div>
              <div class="text-caption">${{ product.price }}</div>
            </v-card-item>

            <v-card-actions>
              <v-btn size="x-large">Add to cart</v-btn>
              <router-link :to="{ name: 'products-details', params: { id: product.id } }">
                <v-btn prepend-icon="mdi-format-list-bulleted-square" size="x-large">
                  Detalles</v-btn
                >
              </router-link>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script setup>
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useProductStore } from '@/stores/ProductStore.js'

const productStore = useProductStore()

const { products, loading, error } = storeToRefs(productStore)

onMounted(() => {
  productStore.fetchAllProducts()
})
</script>
