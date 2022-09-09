function RoomIDInput(props) {
    return (
        <>
            <label className="label">
                <span className="label-text text-base-100">Room ID:</span>
            </label>
            <input type="text" placeholder="Example: 893168d4-486a-4a62-99ac-03dca8534fdb" className="input input-bordered w-full max-w-xs text-neutral" onChange={(event) => props.onChange(event.target.value)}/>
        </>
    )
}

export default RoomIDInput