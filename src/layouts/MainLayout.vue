<template>
  <v-app>
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
import { useAuthStore } from '../stores/authStore'

const authStore = useAuthStore()

const { user } = storeToRefs(authStore)

const icons = ['mdi-facebook', 'mdi-twitter', 'mdi-linkedin', 'mdi-instagram']

const router = useRouter()
</script>

<style></style>
