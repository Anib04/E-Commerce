import { ref, computed, watch } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import axios from 'axios'
import { useProductStore } from '@/stores/ProductStore.js'

import { useAuthStore } from '@/stores/authStore.js'

export const useCartStore = defineStore(
  'cart',
  () => {
    // --- ESTADO ---
    // Guardará el carrito activo del usuario. Inicia en null.
    const STORAGE_KEY = 'my-cart'
    const cart = ref(JSON.parse(localStorage.getItem(STORAGE_KEY)) || [])
    const loading = ref(false)
    const error = ref(null)
    const msg = ref(null)
    const snackBarOpen = ref(false)
    const authStore = useAuthStore()

    //Este es el user logueado para hacer que el flujo sea mas real, sin embargo la FakeStoreAPI necesita un number como user y Firebase regresa como UUID un string
    const { user } = storeToRefs(authStore)
    // --- ACCIONES ---
    // Acción para agregar un producto al carrito.
    // Si el usuario no tiene un carrito, se crea uno nuevo.
    // Si ya tiene un carrito, se actualiza el existente.
    const addProductToCart = async (product, userId = 1) => {
      snackBarOpen.value = false
      msg.value = null
      if (!product || !product.id) {
        error.value = 'Producto inválido.'
        msg.value = 'No se pudo agregar el producto al carrito. Producto inválido.'
        snackBarOpen.value = true
        return
      }
      error.value = null
      loading.value = true

      try {
        if (!user.value) {
          error.value = 'Usuario no autenticado.'
          msg.value = 'Por favor inicia sesión para agregar productos al carrito.'
          snackBarOpen.value = true
          loading.value = false
          return
        }
        // CASO 1: El usuario ya tiene un carrito. Debemos ACTUALIZARLO.
        if (cart.value && cart.value.id && user) {
          const existingProduct = cart.value.products.find((p) => p.productId === product.id)

          let updatedProducts
          if (existingProduct) {
            // Si el producto ya está en el carrito, incrementamos la cantidad
            updatedProducts = cart.value.products.map((p) =>
              p.productId === product.id ? { ...p, quantity: p.quantity + 1 } : p,
            )
          } else {
            // Si es un producto nuevo, lo añadimos al array
            updatedProducts = [
              ...cart.value.products,
              {
                productId: product.id,
                quantity: 1,
                title: product.title,
                price: product.price,
                image: product.image,
              },
            ]
          }

          // Hacemos una petición PUT para actualizar el carrito en la API
          const response = await axios.put(`https://fakestoreapi.com/carts/${cart.value.id}`, {
            userId: cart.value.userId,
            date: cart.value.date,
            products: updatedProducts,
          })

          // Actualizamos nuestro estado local con la respuesta
          cart.value.products = response.data.products
        } else {
          // CASO 2: El usuario no tiene un carrito. Debemos CREAR uno nuevo.
          const newCartData = {
            userId: userId, // Usamos el ID de usuario
            date: new Date().toISOString().slice(0, 10),
            products: [{ productId: product.id, quantity: 1 }],
          }

          // Hacemos una petición POST para crear el carrito
          const response = await axios.post('https://fakestoreapi.com/carts', newCartData)

          // Guardamos el carrito recién creado en nuestro estado local
          cart.value = response.data
        }
        snackBarOpen.value = true
        msg.value = 'Producto añadido al carrito!'
      } catch (err) {
        error.value = 'No se pudo actualizar el carrito.'
        snackBarOpen.value = true
        msg.value = 'Error al agregar el producto al carrito.'
        console.error(err)
      } finally {
        loading.value = false
      }
    }

    // Acción para eliminar un producto del carrito por su ID
    const deleteProduct = (id) => {
      let updatedProducts
      if (cart.value && cart.value.products) {
        updatedProducts = cart.value.products
          .map((item) => (item.productId === id ? { ...item, quantity: item.quantity - 1 } : item))
          .filter((item) => item.quantity > 0) // Filtrar productos con cantidad mayor a 0
      }
      cart.value.products = updatedProducts
      snackBarOpen.value = true
      msg.value = 'Producto eliminado del carrito'
    }
    // --- GETTERS ---
    // Este getter devuelve los detalles completos de los productos en el carrito,
    // combinando la información del carrito con los datos de los productos desde ProductStore.
    // Así tenemos acceso a título, precio, imagen, etc., además de la cantidad.
    const detailCart = computed(() => {
      const ProductStore = useProductStore()
      if (!cart.value || !cart.value.products) {
        return []
      } else {
        return cart.value.products.map((itemCart) => {
          const productData = ProductStore.products.find((p) => p.id === itemCart.productId)
          return {
            ...productData, // Copia todas las propiedades (id, title, price, image...)
            quantity: itemCart.quantity, // Añade la cantidad
          }
        })
      }
    })

    watch(
      cart,
      (newCart) => {
        localStorage.setItem('my-cart', JSON.stringify(newCart))
      },
      { deep: true },
    )

    return {
      //State
      cart,
      loading,
      error,
      msg,
      snackBarOpen,

      //Actions
      addProductToCart,
      deleteProduct,

      //Getter
      detailCart,
    }
  },
  { persist: true },
)
