import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useProductStore = defineStore(
  'products',
  () => {
    // --- ESTADO ---
    // Un array para guardar la lista de productos
    const products = ref([])
    // Una variable para el estado de carga
    const loading = ref(false)
    // Una variable para los errores
    const error = ref(null)

    const product = ref({})

    // --- ACCIONES ---
    // Una acción clara y específica para obtener todos los productos
    const fetchAllProducts = async () => {
      // Reseteamos el estado antes de empezar
      products.value = []
      error.value = null
      loading.value = true

      try {
        const response = await axios.get('https://fakestoreapi.com/products')
        products.value = response.data
      } catch (err) {
        error.value = 'No se pudieron cargar los productos.'
        console.error(err)
      } finally {
        loading.value = false
      }
    }

    const fetchProductById = async (id) => {
      error.value = null
      loading.value = true
      product.value = {}

      try {
        const response = await axios.get(`https://fakestoreapi.com/products/${id}`)
        product.value = response.data
      } catch (err) {
        error.value = 'No se pudo cargar el producto.'
        console.error(err)
      } finally {
        loading.value = false
      }
    }

    return {
      // State
      products,
      product,
      loading,
      error,

      // Actions
      fetchAllProducts,
      fetchProductById,
    }
  },
  { persist: true },
)
