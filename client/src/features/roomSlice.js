import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    username: '',
    isUserHost: false,
    roomID: null,
    members: [],
    streamIDs: []

};

export const roomSlice = createSlice({
    name: 'room',
    initialState,
    reducers: {
        setUserAsHost: (state, action) => {
            state.isUserHost = action.payload.isUserHost
        },
        setUsername: (state, action) => {
            state.username = action.payload.usernameInput
        },
        setRoomID: (state, action) => {
            state.roomID = action.payload.roomIDInput
        },
        setMembers: (state, action) => {
            state.members = action.payload.connectedUsers
        },
        setStreams: (state, action) => {
            state.streamIDs.push(action.payload.connectedUserSocketID);
        },
        removeStream: (state, action) => {
            state.streamIDs = state.streamIDs.filter(socketID => socketID !== action.payload.socketID);
        },
        resetState: (state) => {
            state.username = ''
            state.isUserHost = false
            state.roomID = null
            state.members = []
            state.streamIDs = []
        }
    }
});

export const { setUserAsHost, setUsername, setRoomID, setMembers, setStreams, removeStream, resetState } = roomSlice.actions;
export default roomSlice.reducer;