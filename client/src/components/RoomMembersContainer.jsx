import { useSelector } from 'react-redux'

function RoomMembersContainer() {
    const members = useSelector((state) => state.room.members)
    const membersStr = members.map(item => item.username).join(', ');

    return (
        <div >
            <h3 className="card-title text-neutral">Members:</h3>
            <p>{membersStr}</p>
        </div>
    )
}

export default RoomMembersContainer