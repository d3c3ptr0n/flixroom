import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import JoinRoomPage from './pages/JoinRoomPage';
import RoomPage from './pages/RoomPage';
import ErrorPage from './pages/ErrorPage';
import { Provider } from 'react-redux/es/exports';
import store from './app/store'
import { connectToSocketIOServer } from './utils/wss'

function App() {
	useEffect(() => {
		connectToSocketIOServer();
	})
	return (
		<Provider store={store}>
		<Router>
			<Routes>
				<Route path="/" element={<LandingPage />} />
				<Route path='/room' element={<RoomPage />} />
				<Route path='/join-room' element={<JoinRoomPage />} />
				<Route path='*' element={<ErrorPage />} />
			</Routes>
		</Router>  
		</Provider>  
	);
}

export default App;
