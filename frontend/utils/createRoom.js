// axios
import axios from 'axios'
import BASE_URL from './baseUrl'

export const createRoom = async (name, description, participants) => {
    try {
        const {data} = await axios.post(BASE_URL + '/api/v1/rooms', {name, description, participants});
        return data;
    } catch(err) {
        console.log(err)
    }
}