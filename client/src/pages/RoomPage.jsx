import Navbar from '../components/Navbar'
import RoomCanvas from '../components/RoomCanvas'
import RoomDetailsAndChat from '../components/RoomDetailsAndChat'

function RoomPage() {
	return (
		<div className='h-screen flex flex-col w-screen'>
			<div className="flex">
				<Navbar />
			</div>
			<div className="flex flex-grow">
				<RoomCanvas />
				<RoomDetailsAndChat />
			</div>
		</div>
	)
}

export default RoomPage