import { useEffect } from "react"
import * as WebRTCHandler from '../utils/WebRTCHandler'
import { useSelector } from 'react-redux'
import { useRef } from "react";

function MembersVideos() {

	const vidRef = useRef(null);
	const room = useSelector(state => state.room);
	const streamIDs = room.streamIDs;
	const members = room.members;
	const getUsername = (socketID) => {
		let member = members.find(member => member.socketID === socketID)
		return member.username;
	}

	useEffect(() => {
		WebRTCHandler.getLocalPreviewAndInitRoomConnection(room.isUserHost, room.username, room.roomID)
			.then(stream => {
				vidRef.current.srcObject = stream;
			})
	}, []);

	return (
		<div className='flex m-4 [--gap:1rem] [--items:4] gap-[var(--gap)] [&>*]:w-[calc(100%/var(--items)-var(--gap)/var(--items)*(var(--items)-1))] [&>*]:flex-shrink-0 [&>*]:aspect-video max-w-full overflow-auto snap-x [&>*]:snap-start [&>*:first-child]:ml-auto [&>*:last-child]:mr-auto'>
			<div>
				<div className="rounded overflow-hidden">
					<video ref={vidRef} autoPlay className="inline-block snap-start" muted />
				</div>
				<h1 className="font-bold mb-2 text-center">{room.username}</h1>
			</div>
			{streamIDs?.map((streamID) => (
				<div>
					<div className="rounded overflow-hidden">
						<Stream stream={WebRTCHandler.streams.get(streamID)} />
					</div>
					<h1 className="font-bold mb-2 text-center">{getUsername(streamID)}</h1>
				</div>
			))}
		</div>
	)
}

function Stream({ stream }) {
	const vidRef = useRef(null);

	useEffect(() => {
		vidRef.current.srcObject = stream;
	}, []);

	return <video ref={vidRef} autoPlay className="inline-block snap-start" />
}

export default MembersVideos