// axios
import axios from 'axios'

export const getDrawings = async (roomId) => {
    try {
        const {data} = await axios.get(`http://localhost:8080/api/v1/rooms/${roomId}/get-drawings`);
        return data;
    } catch(err) {
        console.log(err)
    }
}