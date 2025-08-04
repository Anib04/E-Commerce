import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export const useGlobalStore = defineStore('global', () => {
  const isloading = ref(false)
  const loadingMessage = ref('Cargando..')
  const loadingCounter = ref(0)

  const showLoader = (message = 'Cargando') => {
    loadingCounter.value++
    isloading.value = true
    loadingMessage.value = message
  }

  const hideLoader = () => {
    loadingCounter.value = Math.max(0, loadingCounter.value - 1)
    if (loadingCounter.value === 0) {
      isloading.value = false
    }
  }
  const resetLoader = () => {
    loadingCounter.value = 0
    isloading.value = false
  }

  const loaderStatus = computed(() => isloading.value)
  return {
    //State
    isloading,
    loadingMessage,
    loadingCounter,

    //Actions
    showLoader,
    hideLoader,
    resetLoader,

    //Getters
    loaderStatus,
  }
})
