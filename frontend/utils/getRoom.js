// axios
import axios from 'axios'

export const getRoom = async (id) => {
    await axios.get(`http://localhost:8080/api/v1/rooms/${id}`)
        .then(response => {
            return response;
        });
}