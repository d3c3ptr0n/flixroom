import React from 'react'
import Hero from '../components/Hero'

import { useDispatch } from 'react-redux'

import { resetState } from '../features/roomSlice'
import Navbar from '../components/Navbar';

function LandingPage() {
	const dispatch = useDispatch();
	dispatch(resetState());
	return (
		<>
			<Navbar />
			<Hero />
		</>
	)
}

export default LandingPage