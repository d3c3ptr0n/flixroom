import axios from "axios";

const serverAPI = 'http://localhost:5000/api';

export const checkRoomExists = async (roomID) => {
    const response = await axios.get(`${serverAPI}/room-exists/${roomID}`);
    return response.data;
};




