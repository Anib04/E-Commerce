import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useCartStore = defineStore('cart', () => {
  // --- ESTADO ---
  // Guardará el carrito activo del usuario. Inicia en null.
  const cart = ref(null)
  const loading = ref(false)
  const error = ref(null)

  // --- ACCIÓN PRINCIPAL ---
  // Esta es la única acción que tu componente necesitará llamar.
  const addProductToCart = async (product, userId = 1) => {
    error.value = null
    loading.value = true

    try {
      // CASO 1: El usuario ya tiene un carrito. Debemos ACTUALIZARLO.
      if (cart.value && cart.value.id) {
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

      console.log('Carrito actualizado:', cart.value)
    } catch (err) {
      error.value = 'No se pudo actualizar el carrito.'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  return {
    cart,
    loading,
    error,
    addProductToCart,
  }
})
