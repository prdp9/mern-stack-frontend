import { useAuth } from './auth'
import axios from 'axios'

const useRefresh = () => {

    const { setAccessToken,setIsAuthenticated } = useAuth()

    const getNewAccessToken = async () => {
        try {
            const response = await axios.get("http://localhost:8080/auth/getNewAccessToken", {
                withCredentials: true
            })
            setAccessToken(response.data?.accessToken)
            setIsAuthenticated(true)

            return response.data?.accessToken
        } catch (error) {
            console.log("error ", error)
            return null
        }
    }
    return getNewAccessToken
}

export default useRefresh