<template>
  <v-sheet v-if="loading">Cargando productos...</v-sheet>

  <v-sheet v-else-if="error" style="color: red">
    {{ error }}
  </v-sheet>

  <v-sheet v-else>
    <v-container fluid class="pa-0 products-container">
      <v-row>
        <v-col v-for="product in products" :key="product.id" cols="12" sm="6" md="4">
          <v-card class="ma-4 product-card border-sm" height="400px">
            <v-img :src="product.image" height="200px" cover> </v-img>

            <v-card-item>
              <p class="text-sm mb-1 product-title">{{ product.title }}</p>
              <p class="text-caption">${{ product.price }}</p>
            </v-card-item>

            <v-card-actions>
              <v-row>
                <v-col cols="12">
                  <v-btn
                    @click="addToCart(product)"
                    class="text-blue-grey-darken-4 product-btn"
                    block
                    >Add to cart
                  </v-btn>
                </v-col>

                <v-col cols="12">
                  <router-link :to="{ name: 'products-details', params: { id: product.id } }">
                    <v-btn
                      class="text-blue-grey-darken-4 product-btn"
                      prepend-icon="mdi-format-list-bulleted-square"
                      block
                    >
                      Detalles</v-btn
                    >
                  </router-link>
                </v-col>
              </v-row>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
</template>
<script setup>
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useProductStore } from '@/stores/ProductStore.js'
import { useCartStore } from '../stores/cartStore'

const productStore = useProductStore()
const cartStore = useCartStore()

const { products, loading, error } = storeToRefs(productStore)

const addToCart = (product) => {
  cartStore.addProductToCart(product)
}

onMounted(() => {
  productStore.fetchAllProducts()
})
</script>

<style>
.products.container {
  background-color: #fcecf6 !important;
}
.product-title {
  width: 400px; /* Ancho máximo del contenedor */
  white-space: nowrap; /* Evita que el texto salte de línea */
  overflow: hidden; /* Oculta el texto que desborda */
  text-overflow: ellipsis; /* Muestra puntos suspensivos (...) para el texto recortado */
}

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
