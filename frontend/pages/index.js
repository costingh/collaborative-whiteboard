import React, {useEffect} from 'react';
import { useRouter } from 'next/router'
// method to generate ramdom strings
import randomString from 'random-string'

export default function Home() {  
	const router = useRouter()
	
	useEffect(() => {
		// create a room and join user 
		const roomId = randomString({length: 15});
		router.push(`/room/${roomId}`);
	}, [])
  return <div></div>
}