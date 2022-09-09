const express = require('express');
const http = require('http');
const {v4: uuidv4} = require('uuid');
const cors = require('cors');

const PORT = process.env.PORT || 5000;
const app = express();
const server = http.createServer(app);
app.use(cors());

const io = require('socket.io')(server, {
	cors: {
		origin: '*',
		methods: ['GET', 'POST']
	}
});

let connectedUsers = [];
let rooms = [];

app.get('/api/room-exists/:roomID', (req, res) => {
	const { roomID } = req.params;
	const room = rooms.find((room) => room.id === roomID);

	if(room) {
		return res.send({ roomExists: true })
	} else {
		return res.send({ roomExists: false })
	}
});

io.on('connection', (socket) => {
	console.log(`User Connected: ${socket.id}`);

	socket.on('create-new-room', (data) => {
		createNewRoomHandler(data, socket);
	});

	socket.on('join-room', (data) => {
		joinRoomHandler(data, socket);
	});

	socket.on('disconnect', () => {
		disconnectHandler(socket);
	});

	socket.on('connection-signal', data => {
		signalingHandler(data, socket);
	});

	socket.on('connection-init', data => {
		initializeConnectionHandler(data, socket);
	});
});

const createNewRoomHandler = (data, socket) => {
	const { username } = data;
	const roomID = uuidv4();
	const newUser = {
		username,
		id: uuidv4(),
		socketID: socket.id,
		roomID
	};

	connectedUsers = [...connectedUsers, newUser];
	const newRoom = {
		id: roomID,
		connectedUsers: [newUser]
	}

	socket.join(roomID);

	rooms = [...rooms, newRoom];
	socket.emit('room-id', roomID);
	socket.emit('room-update', { connectedUsers: newRoom.connectedUsers }); 
};

const joinRoomHandler = (data, socket) => {
	const {username, roomID} = data;
	const newUser = {
		username,
		id: uuidv4(),
		socketID: socket.id,
		roomID
	};

	const room = rooms.find(room => room.id === roomID);
	room.connectedUsers = [...room.connectedUsers, newUser];
	socket.join(roomID);
	connectedUsers = [...connectedUsers, newUser];

	room.connectedUsers.forEach(user => {
		if(user.socketID !== socket.id) {
			const data = {
				connectedUserSocketID: socket.id
			};
			io.to(user.socketID).emit('prepare-connection', data);
		}
	});
	io.to(roomID).emit('room-update', { connectedUsers: room.connectedUsers });
};

const disconnectHandler = (socket) => {
	const user = connectedUsers.find((user) => user.socketID === socket.id);
	if(user) {
		const room = rooms.find(room => room.id === user.roomID);
		room.connectedUsers = room.connectedUsers.filter((user) => user.socketID !== socket.id);
		socket.leave(user.roomID);
		if(room.connectedUsers.length > 0) {
			io.to(room.id).emit('user-disconnected', { socketID: socket.id });
			io.to(room.id).emit('room-update', { connectedUsers: room.connectedUsers });
		} else {
			rooms = rooms.filter(room => room.id !== room.id);
		}
	}
}

const signalingHandler = (data, socket) => {
	const { connectedUserSocketID, signal } = data;
	const signalingData = {signal, connectedUserSocketID: socket.id };
	io.to(connectedUserSocketID).emit('connection-signal', signalingData);
};

const initializeConnectionHandler = (data, socket) => {
	const {connectedUserSocketID } = data;
	const initData = {connectedUserSocketID: socket.id};
	io.to(connectedUserSocketID).emit('connection-init', initData);
};

server.listen(PORT, () => {
	console.log(`Server is started at PORT:${PORT}`);
});