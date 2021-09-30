// axios
import axios from 'axios'
import BASE_URL from './baseUrl'

export const getRoom = async (id) => {
    await axios.get(BASE_URL + `/api/v1/rooms/${id}`)
        .then(response => {
            return response;
        });
}