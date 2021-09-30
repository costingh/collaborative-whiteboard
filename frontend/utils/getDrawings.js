// axios
import axios from 'axios'
import BASE_URL from './baseUrl'

export const getDrawings = async (roomId) => {
    try {
        const {data} = await axios.get(BASE_URL + `/api/v1/rooms/${roomId}/get-drawings`);
        return data;
    } catch(err) {
        console.log(err)
    }
}