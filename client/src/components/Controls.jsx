import { useState } from "react";
import { Toaster, toast } from 'react-hot-toast'
import * as webRTCHandler from "../utils/WebRTCHandler";

function Controls() {
	const handleLeaveRoom = () => {
		const siteUrl = window.location.origin;
		window.location.href = siteUrl;
	};

	const [isMicMuted, setIsMicMuted] = useState(false);
	const handleMicButtonPressed = () => {
		webRTCHandler.toggleMic(isMicMuted);
		if (!isMicMuted) {
			toast.success('Your Mic was turned off', {
				icon: '🎙️❌',
			});
		} else {
			toast.success('Your Mic was turned on', {
				icon: '🎙️✔️',
			});
		}
		setIsMicMuted(!isMicMuted);
	};

	const [isLocalVideoDisabled, setIsLocalVideoDisabled] = useState(false);
	const handleCameraButtonPressed = () => {
		webRTCHandler.toggleCamera(isLocalVideoDisabled);
		if (!isLocalVideoDisabled) {
			toast.success('Your Camera was turned off', {
				icon: '📷❌',
			});
		} else {
			toast.success('Your Camera was turned on', {
				icon: '📷✔️',
			});
		}
		setIsLocalVideoDisabled(!isLocalVideoDisabled);
	};

	return (
		<div className="btn-group flex justify-center">
			<Toaster />
			{isMicMuted && (
				<button className="btn mr-5 btn-sm btn-error" onClick={handleMicButtonPressed}>
					<svg
						width="24px"
						height="24px"
						viewBox="0 0 24 24"
						id="magicoon-Filled"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							id="microphone-slash-Filled-2"
							data-name="microphone-slash-Filled"
							className="cls-1"
							d="M10.275,15.139,9.146,16.268A5.986,5.986,0,0,0,18,11a1,1,0,0,1,2,0,8.008,8.008,0,0,1-7,7.931V20h3a1,1,0,0,1,0,2H8a1,1,0,0,1,0-2h3V18.93a7.972,7.972,0,0,1-3.313-1.2l-2.98,2.98a1,1,0,0,1-1.414-1.414l16-16a1,1,0,1,1,1.414,1.414L16.5,8.914V11A4.505,4.505,0,0,1,12,15.5,4.443,4.443,0,0,1,10.275,15.139ZM7.957,12.38a.507.507,0,0,0,.5-.126l7.179-7.181a.5.5,0,0,0,.058-.637A4.5,4.5,0,0,0,7.5,7v4a4.932,4.932,0,0,0,.11,1A.5.5,0,0,0,7.957,12.38ZM5.781,15.22a.985.985,0,0,0,.461-.114,1,1,0,0,0,.425-1.348A5.983,5.983,0,0,1,6,11a1,1,0,0,0-2,0,8,8,0,0,0,.893,3.682A1,1,0,0,0,5.781,15.22Z"
						/>
					</svg>
				</button>
			)}
			{!isMicMuted && (
				<button className="btn mr-5 btn-sm" onClick={handleMicButtonPressed}>
					<svg
						width="24px"
						height="24px"
						viewBox="0 0 24 24"
						id="magicoon-Filled"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							id="microphone-Filled-2"
							data-name="microphone-Filled"
							className="cls-1"
							d="M7.5,11V7a4.5,4.5,0,0,1,9,0v4a4.5,4.5,0,0,1-9,0ZM20,11a1,1,0,0,0-2,0A6,6,0,0,1,6,11a1,1,0,0,0-2,0,8.008,8.008,0,0,0,7,7.931V20H8a1,1,0,0,0,0,2h8a1,1,0,0,0,0-2H13V18.931A8.008,8.008,0,0,0,20,11Z"
						/>
					</svg>
				</button>
			)}
			{isLocalVideoDisabled && (
				<button className="btn mr-5 btn-sm btn-error" onClick={handleCameraButtonPressed}>
					<svg
						width="24px"
						height="24px"
						viewBox="0 0 24 24"
						id="magicoon-Filled"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							id="video-slash-Filled-2"
							data-name="video-slash-Filled"
							className="cls-1"
							d="M3.134,16.579A4.451,4.451,0,0,1,2.312,14V10a4.505,4.505,0,0,1,4.5-4.5h5a4.278,4.278,0,0,1,1.867.42.5.5,0,0,1,.137.8L3.9,16.644a.505.505,0,0,1-.354.146l-.042,0A.5.5,0,0,1,3.134,16.579ZM20.853,7.85a1.561,1.561,0,0,0-1.608.078l-1.141.76A.377.377,0,0,0,17.937,9v6a.377.377,0,0,0,.167.312l1.14.759a1.572,1.572,0,0,0,2.443-1.311V9.24A1.57,1.57,0,0,0,20.853,7.85ZM20.52,4.707a1,1,0,0,0-1.415-1.414l-16,16A1,1,0,0,0,4.52,20.707l2.215-2.216c.028,0,.05.009.077.009h5a4.5,4.5,0,0,0,4.5-4.5V10a4.507,4.507,0,0,0-.108-.977Z"
						/>
					</svg>
				</button>
			)}
			{!isLocalVideoDisabled && (
				<button className="btn mr-5 btn-sm" onClick={handleCameraButtonPressed}>
					<svg
						width="24px"
						height="24px"
						viewBox="0 0 24 24"
						id="magicoon-Filled"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							id="video-Filled-2"
							data-name="video-Filled"
							className="cls-1"
							d="M16.25,10v4a4.505,4.505,0,0,1-4.5,4.5h-5A4.505,4.505,0,0,1,2.25,14V10a4.505,4.505,0,0,1,4.5-4.5h5A4.505,4.505,0,0,1,16.25,10Zm4.6-2.261a1.689,1.689,0,0,0-1.736.085l-1.14.76A.5.5,0,0,0,17.75,9v6a.5.5,0,0,0,.223.416l1.138.759A1.7,1.7,0,0,0,21.75,14.76V9.24A1.7,1.7,0,0,0,20.849,7.739Z"
						/>
					</svg>
				</button>
			)}
			<button className="btn gap-2 btn-sm btn-error" onClick={handleLeaveRoom}>
				<svg
					width="24px"
					height="24px"
					viewBox="0 0 24 24"
					role="img"
					xmlns="http://www.w3.org/2000/svg"
					aria-labelledby="exitIconTitle"
					stroke="#000000"
					strokeWidth={2}
					strokeLinecap="round"
					strokeLinejoin="round"
					fill="none"
					color="#000000"
				>
					<title id="exitIconTitle">{"Exit"}</title>
					<path d="M18 15l3-3-3-3" />
					<path d="M11.5 12H20" />
					<path strokeLinecap="round" d="M21 12h-1" />
					<path d="M15 4v16H4V4z" />
				</svg>
				Leave Room
			</button>
		</div>
	);
}

export default Controls;
