import { http } from "@/services/axios"


export default {
    listAllCountries: async () => {
       return await http.get('/all?fields=name,flags')
    },
    viewCountry: async (name: string) => {
        return await http.get(`/name/${name}`)
    }
}