<template>
  <v-app>
    <v-navigation-drawer
      expand-on-hover
      permanent
      rail
      rail-width="70"
      location="right"
      @mouseover="showList = true"
      @mouseleave="showList = false"
      v-if="user"
      color="#104475"
    >
      <v-list dense>
        <v-list-item title="Tu Carrito" color="#fff" class="text-white">
          <template v-slot:prepend>
            <v-icon icon="mdi-cart " color="#fff"></v-icon>
          </template>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <div v-show="showList">
        <v-list lines="three">
          <v-list-item
            v-for="item in detailCart"
            :key="item.id"
            class="ma-4 cart-list rounded text-blue-grey-darken-4"
          >
            <template v-slot:append>
              <v-avatar rounded="sm" size="50">
                <v-img :src="item.image"></v-img>
              </v-avatar>
              <v-btn
                icon="mdi-delete"
                variant="text"
                color="blue-grey-darken-4"
                @click="cartStore.deleteProduct(item.id)"
              ></v-btn>
            </template>

            <v-list-item-title class="font-weight-bold">{{ item.title }}</v-list-item-title>
            <v-list-item-subtitle class="text-blue-grey-darken-3">
              Precio: ${{ item.price }} <br />
              Cantidad: {{ item.quantity }}
            </v-list-item-subtitle>
          </v-list-item>
        </v-list>
        <div class="d-flex justify-center ma-2">
          <v-btn block class="ma-2" color="#f8962c" @click="router.push('/payment')">
            Comprar
          </v-btn>
        </div>
      </div>
    </v-navigation-drawer>
    <v-app-bar :elevation="2" color="#104475">
      <v-app-bar-title> <v-btn @click="router.push('/')">Am Commerce</v-btn></v-app-bar-title>

      <template v-slot:append>
        <v-btn v-if="!user" icon="mdi-account" @click="router.push('/login')"></v-btn>
        <v-btn icon="mdi-magnify"></v-btn>
        <v-btn v-if="user" icon="mdi-export" @click="authStore.logOut()"></v-btn>
      </template>
    </v-app-bar>
    <v-main class="products-container">
      <v-container>
        <router-view />
      </v-container>
    </v-main>
    <!-- <v-footer class="d-flex flex-column" color="teal" rounded="lg">
      <div class="d-flex w-100 align-center px-4 py-2">
        <strong>Get connected with us on social networks!</strong>

        <div class="d-flex ga-2 ms-auto">
          <v-btn
            v-for="icon in icons"
            :key="icon"
            :icon="icon"
            size="small"
            variant="plain"
          ></v-btn>
        </div>
      </div>

      <div class="px-4 py-2 bg-surface-variant text-center w-100 rounded-lg">
        {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
      </div>
    </v-footer> -->
  </v-app>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useCartStore } from '../stores/cartStore'
import { useAuthStore } from '../stores/authStore'
import { ref } from 'vue'

const authStore = useAuthStore()
const cartStore = useCartStore()

const { user } = storeToRefs(authStore)
const { detailCart } = storeToRefs(cartStore)

const showList = ref(false)
const router = useRouter()
</script>

<style>
.products-container {
  background-color: #fcecf6;
}

.cart-list {
  background-color: #fcecf6 !important;
}
</style>
