// axios
import axios from 'axios';

export const sendMessage = async (message) => {
    await axios.post('http://localhost:8080/send/room1', {message})
}