// axios
import axios from 'axios'

export const createRoom = async (name, description, participants) => {
    try {
        const {data} = await axios.post('http://localhost:8080/api/v1/rooms', {name, description, participants});
        return data;
    } catch(err) {
        console.log(err)
    }
}