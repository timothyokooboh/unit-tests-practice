import { ref } from 'vue' 
import { countriesApi } from '@/api'

export const useViewCountry = () => {
    const isLoading = ref(false)
    const country = ref({})

    const viewCountry = async (name: string) => {
        console.log(name)
        isLoading.value = true
        try {
            const res = await countriesApi.viewCountry(name)
            console.log(res.data)
            country.value = res.data[0]
        } catch(err) {
            throw new Error(err.message)
        }
        finally {
            isLoading.value = false
        }
    }

    return {
        isLoading,
        country,
        viewCountry
    }
}