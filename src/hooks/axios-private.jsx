import { useEffect } from "react"
import { axiosPrivate } from "../api/axios"
import useRefresh from "./refresh"
import { useAuth } from "./auth"

const useAxiosPrivate = () => {

    // interceptor axios advanced - refresh token

    // request interceptor - middleware
    // response interceptor - middleware

    const { isAuthenticated, accessToken } = useAuth()

    const refresh = useRefresh()


    useEffect(() => {


        // before sending request, add access token to header
        const requestIntercept = axiosPrivate.interceptors.request.use(
            config => {
                if (!config.headers["Authorization"]) {
                    config.headers["Authorization"] = `Bearer ${accessToken}`
                }
                return config
            },
            (error) => Promise.reject(error)
        )


        // response interceptor after receiving response from backend or server
        // if status code is 403, refresh token - get new access token
        // add new access token to header and send request again
        const responseIntercept = axiosPrivate.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config

                // same status code as in backend authGuard middleware (access token invalid or deneied status code)
                if (error?.response?.status === 403 && !prevRequest.sent) {
                    prevRequest.sent = true

                    const newAccessToken = await refresh()
                    console.log("accessToken", newAccessToken)

                    prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`
                    return axiosPrivate(prevRequest)
                }

                return Promise.reject(error)
            }
        )

        return () => {
            axiosPrivate.interceptors.response.eject(responseIntercept)
            axiosPrivate.interceptors.request.eject(requestIntercept)
        }

    }, [isAuthenticated, refresh])



    return axiosPrivate
}

export default useAxiosPrivate

// access token and refresh token





// genereate access token with long expiry date 1 month 3 month 1 week

// backend just access return

// frontend save it in local storage  (for long term)
// or session storage (for short term until browser is closed)



// request headers = localStorage.getIem("accessToken")