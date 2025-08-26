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
    >
      <v-list>
        <v-list-item prepend-icon="mdi-cart" title="Tu Carrito"></v-list-item>
      </v-list>

      <v-divider></v-divider>

      <div class="cartList" v-show="showList">
        <v-list lines="three">
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

        <v-btn block class="ma-2" @click="router.push('/payment')"> Comprar </v-btn>
      </div>
    </v-navigation-drawer>
    <v-app-bar :elevation="2">
      <v-app-bar-title>Am Commerce</v-app-bar-title>

      <template v-slot:append>
        <v-btn v-if="user" icon="mdi-account"></v-btn>
        <v-btn v-else icon="mdi-login" @click="router.push('/login')"></v-btn>
        <v-btn icon="mdi-magnify"></v-btn>
        <v-btn v-if="user" icon="mdi-export" @click="authStore.logOut()"></v-btn>
      </template>
    </v-app-bar>
    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
    <v-footer class="d-flex flex-column" color="teal" rounded="lg">
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
    </v-footer>
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
const icons = ['mdi-facebook', 'mdi-twitter', 'mdi-linkedin', 'mdi-instagram']

const router = useRouter()
</script>

<style></style>
