import axios from 'axios'
import i18n from '@/i18n'
export const myAxios = axios.create({
    baseURL: 'https://http-vue-3f9db-default-rtdb.firebaseio.com/',
})

const interceptorsResponse = myAxios.interceptors.response
const interceptorsRequest = myAxios.interceptors.request

interceptorsResponse.use(
    (res) => {
        if (res && res.status && res.status !== 200) {
            console.log('ERROR STATUS: ', res.status)
        }
        return res
    },
    (error) => {
        console.error('res: ', error)
        return Promise.reject(error)
    }
)

interceptorsRequest.use(
    (response) => {
        console.log('req: ', response)
        return response
    },
    (error) => {
        console.log('res: ', error)
        return Promise.reject(error)
    }
)
