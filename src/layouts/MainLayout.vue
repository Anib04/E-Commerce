<template>
  <v-app>
    <v-app-bar>
      <v-toolbar>
        <v-toolbar-title> Mi E-Commerce </v-toolbar-title>
        <v-toolbar-items>
          <v-btn icon="mdi-account" color="success" size="small" @click="dialog = true"></v-btn>
        </v-toolbar-items>
      </v-toolbar>
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
  <SignModal v-model="dialog" />
</template>

<script setup>
import { ref } from 'vue'
import SignModal from '@/components/SignModal.vue'
const icons = ['mdi-facebook', 'mdi-twitter', 'mdi-linkedin', 'mdi-instagram']
const dialog = ref(false)
</script>

<style></style>
