import Axios from 'axios'

const PEXELS_API_KEY = '6yTdRsmJqalBzXM5zOxSXJYQgayK3k4kSm23Fg9dJwqO7fPL90xxdoVB'
const PEXELS_URL = 'https://api.pexels.com/v1/search'

const axiosInstance = Axios.create()

export const pexelsService = {
    getToyImage
}

async function getToyImage(toyName) {
    try {
        const res = await axiosInstance.get(PEXELS_URL, {
            headers: {
                'Authorization': PEXELS_API_KEY
            },
            params: {
                query: toyName,
                per_page: 1
            }
        })
        if (res.data.photos.length) return res.data.photos[0].src.medium
        return null
    } catch (err) {
        console.error('Error fetching image from Pexels:', err)
        throw err
    }
}