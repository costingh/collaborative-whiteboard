// axios
import axios from 'axios'
import BASE_URL from './baseUrl'

export const saveDrawing = async (roomId, coordinates) => {
    const line = {
        line: coordinates
    }
    try {
        const {data} = await axios.post(BASE_URL + `/api/v1/rooms/${roomId}/save-drawing`, line);
        return data;
    } catch(err) {
        console.log(err)
    }
}