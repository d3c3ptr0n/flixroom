import toast, { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux'
function RoomIDContainer() {

    const roomID = useSelector((state) => state.room.roomID)
    const handleRoomIDCopy = () => {
        navigator.clipboard.writeText(roomID)
        toast.success('Room ID copied!', {
            style: {
                borderRadius: '0px',
            }
        })
    }
    return (
        <div>
            <Toaster />
            <h3 className="card-title text-neutral">Room ID:</h3>
            <p>
                {roomID}
                <button className="btn btn-sm btn-square border-none btn-outline" onClick={handleRoomIDCopy}>
                    <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 7h6v16h-16v-6h-6v-16h16v6zm5 1h-14v14h14v-14zm-6-1v-5h-14v14h5v-9h9z"/></svg>
                </button>
            </p>
        </div>
    );
}

export default RoomIDContainer;
