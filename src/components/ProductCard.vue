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
              <p class="text-sm mb-1 product-title">{{ product.title }}</p>
              <p class="text-caption">${{ product.price }}</p>
            </v-card-item>

            <v-card-actions>
              <v-row>
                <v-col cols="11">
                  <v-btn
                    @click="addToCart(product)"
                    class="text-blue-grey-darken-4 product-btn"
                    block
                    >Add to cart
                  </v-btn>
                </v-col>

                <v-col cols="11">
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
  </div>
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
.product-btn {
  background-color: #f8962c;
}

.product-title {
  width: 400px; /* Ancho máximo del contenedor */
  white-space: nowrap; /* Evita que el texto salte de línea */
  overflow: hidden; /* Oculta el texto que desborda */
  text-overflow: ellipsis; /* Muestra puntos suspensivos (...) para el texto recortado */
}
</style>
