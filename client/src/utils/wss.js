import io from 'socket.io-client';
import store from '../app/store';
import { setRoomID, setMembers } from '../features/roomSlice';
import * as webRTCHandler from './WebRTCHandler'

const SERVER = 'http://localhost:5000'
let socket = null;

export const connectToSocketIOServer = () => {
	socket = io(SERVER);

	socket.on('connect', () => {
		console.log('Succesfully connected SocketIO Server');
	});

	socket.on('room-id', (data) => {
		const roomIDInput = data;
		store.dispatch(setRoomID({roomIDInput}));
	});

	socket.on('room-update', (data) => {
		const connectedUsers = data.connectedUsers;
		store.dispatch(setMembers({ connectedUsers }));
	});

	socket.on('prepare-connection', (data) => {
		const { connectedUserSocketID } = data;
		webRTCHandler.prepareNewPeerConnection(connectedUserSocketID, false);

		socket.emit('connection-init', {connectedUserSocketID: connectedUserSocketID });
	});

	socket.on('connection-signal', (data) => {
		webRTCHandler.handleSignalingData(data);
	});

	socket.on('connection-init', (data) => {
		const { connectedUserSocketID } = data;
		webRTCHandler.prepareNewPeerConnection(connectedUserSocketID, true);
	});

	socket.on('user-disconnected', (data) => {
		webRTCHandler.removePeerConnection(data);
	});
};

export const createNewRoom = (username) => {
	const data = {
		username
	};
	socket.emit('create-new-room', data);
};

export const joinRoom = (username, roomID) => {
	const data = {
		roomID,
		username
	};
	socket.emit('join-room', data);	
};

export const signalPeerData = (data) => {
	socket.emit('connection-signal', data); 
}