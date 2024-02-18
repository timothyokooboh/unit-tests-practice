import { ref } from 'vue'
import { countriesApi } from '@/api'

export const useListCountries = () => {
  const isLoading = ref<boolean>(false)
  const countries = ref<Record<string, any>>([])

  const listCountries: () => Promise<void> = async () => {
    isLoading.value = true
    try {
      const res = await countriesApi.listAllCountries()
      countries.value = res.data
    } catch (err) {
      console.log(err)
    } finally {
      isLoading.value = false
    }
  }

  return {
    isLoading,
    countries,
    listCountries
  }
}
