// axios
import axios from 'axios'

export const getRoom = async (id) => {
    try {
        const {data} = await axios.get(`http://localhost:8080/api/v1/rooms/${id}`);
        return data;
    } catch(err) {
        console.log(err)
    }
}