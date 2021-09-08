// axios
import axios from 'axios'

export const saveDrawing = async (roomId, coordinates) => {
    const line = {
        line: coordinates
    }
    try {
        const {data} = await axios.post(`http://localhost:8080/api/v1/rooms/${roomId}/save-drawing`, line);
        return data;
    } catch(err) {
        console.log(err)
    }
}