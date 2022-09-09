import JoinRoomCard from '../components/JoinRoomCard';
import Navbar from '../components/Navbar';

import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'

import { setUserAsHost } from '../features/roomSlice'

function JoinRoomPage() {
	const search = useLocation().search;
	let isUserHost = (new URLSearchParams(search).get('host') === 'true');

	const dispatch = useDispatch();
	if(isUserHost) {
		dispatch(setUserAsHost({ isUserHost }));
	}
	
	isUserHost = useSelector((state) => state.room.isUserHost)
	return (
		<>
			<Navbar />
			<div className="flex justify-center items-center pt-36">
				<JoinRoomCard isUserHost={isUserHost}/>
			</div>
		</>
	)	
}

export default JoinRoomPage