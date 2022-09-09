import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Hero() {
	const navigate = useNavigate();
	const pushToJoinRoomAsHost = () => {
		navigate('/join-room?host=true')
	}

	return (
		<div className="hero min-h-screen bg-base-200 normal-case">	
			<div className="hero-content text-center">
			<div className="max-w-4xl">
				<h1 className="text-7xl font-bold font-Gilroy">Stream torrents with frens <span className="text-primary">without installing anything</span>.</h1>
				<p className="py-6">FlixRoom is a Web App that uses WebRTC and Webtor to provide real-time streaming of torrents with friends.</p>
				<button className="btn btn-primary mb-4 normal-case" onClick={pushToJoinRoomAsHost}>Create a Room</button>
				<br />
				<Link className="link" to='/join-room'>Already have a Room ID?</Link>
			</div>
			</div>
		</div>
  	)
}

export default Hero