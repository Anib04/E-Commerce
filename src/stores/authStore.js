/* import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useUserStore = defineStore('user', () => {
  const users = ref([])
  const loading = ref(false)
  const error = ref(null)


  const fetchAllUsers = async () => {
    users.value = []
    error.value = null
    loading.value = true

    try {
      const response = await axios.get('https://fakestoreapi.com/users')
      users.value = response.data
    } catch (err) {
      error.value = 'No se pudieron cargar los usuarios.'
      console.error(err)
    } finally {
      loading.value = false
    }
  },
  const fetchUserById = async (id) => {

  }
  return {
    users,
    loading,
    error,

    fetchAllUsers,
  }
})

useUserStore.fetchAllUsers()
 */
