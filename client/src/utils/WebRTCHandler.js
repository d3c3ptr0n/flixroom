import * as wss from './wss';
import Peer from 'simple-peer'
import store from '../app/store';
import { setStreams, removeStream } from '../features/roomSlice';

const defaultConstraints = {
	audio: true,
	video: true
}

let localStream;
export const getLocalPreviewAndInitRoomConnection = (
	isUserHost,
	username,
	roomID = null
) => {
	return navigator.mediaDevices.getUserMedia(defaultConstraints)
		.then(stream => {
			localStream = stream;
			isUserHost ? wss.createNewRoom(username) : wss.joinRoom(username, roomID);
			return localStream;
		}).catch(err => {
			console.log(err);
		})
}

let peers = {};
export let streams = new Map();
const getConfiguration = () => {
	return {
		iceServers: [
			{
				urls: 'stun:stun.l.google.com:19302'
			}
		]
	}
};

export const prepareNewPeerConnection = (connectedUserSocketID, isInitiator) => {
	const configuration = getConfiguration();
	peers[connectedUserSocketID] = new Peer({
		initiator: isInitiator,
		config: configuration,
		stream: localStream,
	});

	peers[connectedUserSocketID].on('signal', (data) => {
		const signalData = {
			signal: data,
			connectedUserSocketID: connectedUserSocketID
		};
		wss.signalPeerData(signalData);
	});

	peers[connectedUserSocketID].on('stream', (stream) => {
		streams.set(connectedUserSocketID, stream);
		store.dispatch(setStreams({ connectedUserSocketID }));
	});
}

export const removePeerConnection = (data) => {
	const { socketID } = data;
	store.dispatch(removeStream({ socketID }));
	streams.delete(socketID);
	if (peers[socketID]) {
		peers[socketID].destroy();
	}
	delete peers[socketID];
}

export const handleSignalingData = (data) => {
	peers[data.connectedUserSocketID].signal(data.signal);
};

export const toggleMic = (isMuted) => {
	localStream.getAudioTracks()[0].enabled = isMuted ? true : false;
};

export const toggleCamera = (isDisabled) => {
	localStream.getVideoTracks()[0].enabled = isDisabled ? true : false;
};