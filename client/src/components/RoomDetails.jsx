import RoomIDContainer from "./RoomIDContainer"
import RoomMembersContainer from "./RoomMembersContainer"

function RoomDetails() {
    return (
        <div className='border mr-1'>
            <div className='card-body p-2'>
                <RoomIDContainer />
                <RoomMembersContainer />
            </div>
        </div>
    )
}

export default RoomDetails