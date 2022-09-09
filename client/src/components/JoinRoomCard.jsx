import { Toaster, toast } from 'react-hot-toast'
import RoomIDInput from './RoomIDInput'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { setUsername, setRoomID } from '../features/roomSlice'
import { checkRoomExists } from '../utils/api'

function JoinRoomCard(props) {

	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [usernameInput, setUsernameInput] = useState('');
	const [roomIDInput, setRoomIDInput] = useState('');
	const isUserHost = props.isUserHost

	const handleUsernameChange = (event) => {
		setUsernameInput(event.target.value);
	};
	const handleGotoRoom = async () => {
		if(usernameInput.length > 0) {
			if(isUserHost) {
				dispatch(setUsername({usernameInput}));
				navigate('/room');
			} else {
				if(roomIDInput.length > 0) {
					const response = await checkRoomExists(roomIDInput);
					const roomExists = { response };

					if(roomExists.response.roomExists) {
						dispatch(setUsername({usernameInput}));
						dispatch(setRoomID({roomIDInput}));
						navigate('/room');
					} else {
						toast.error('Room not found!', {
							icon: '❌🔍️',
							style: {
								borderRadius: '0px',
							}
						})
					}
				} else {
					toast.error('Please enter a Room ID!', {
						icon: '🙅‍♂️',
						style: {
							borderRadius: '0px',
						}
					})
				}
			}
		} else {
			toast.error('Name field cannot be empty!', {
				icon: '✋❗',
				style: {
					borderRadius: '0px',
				}
			})
		}
	};
	const handleCancelButton = () => {
		navigate('/');
	};
    return (
        <div>
			<Toaster />
			<div className="p-10">
				<div className="overflow-hidden shadow-lg card bg-neutral text-base-100 w-full">
					<div className="card-body items-center text-center">
						{isUserHost && <h2 className="card-title text-4xl font-Gilroy">Host a Room 🚪</h2>}
						{!isUserHost && <h2 className="card-title text-4xl font-Gilroy">Join a Room 🔑</h2>}
						<div className="form-control w-full max-w-xs">
							<label className="label">
								<span className="label-text text-base-100">What is your name?</span>
							</label>
							<input type="text" placeholder="Example: Yug Khatri" className="input input-bordered w-full max-w-xs text-neutral" onChange={handleUsernameChange} />
							{!isUserHost && <RoomIDInput onChange={(value) => setRoomIDInput(value)}/>}					
						</div>
						<div className="card-actions justify-end pt-5">
							<button className="btn btn-primary normal-case" onClick={handleGotoRoom}>Let's Go 🍻</button>
							<button className="btn btn-error normal-case text-base-100" onClick={handleCancelButton}>Cancel</button>
						</div>
					</div>
				</div>
			</div>
        </div>
    )
}

export default JoinRoomCard