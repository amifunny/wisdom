import axios from 'axios'

const baseUrl = 'http://localhost:5000'

const axiosClient = axios.create({
    baseURL: baseUrl,
})

// send stored token with every request
axiosClient.interceptors.request.use(async config => {
	const token = localStorage.getItem('token')
    return {
        ...config,
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
        }
    }
})

axiosClient.interceptors.response.use(
    // seperate data value from response
    response => {
        if (response && response.data){ 
            return response.data 
        }
        return response
    }, 
    err => {
        if (!err.response) {
            return alert(err)
        }
        throw err.response
    }
)

export default axiosClient;
