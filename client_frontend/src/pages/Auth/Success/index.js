import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import axiosClient from "../../../utils/axiosClient"

function Success() {

	const navigate = useNavigate()
	const [user,setUser] = useState()

	useEffect(() => {
		const checkAuth = async () => {
			
			const token = localStorage.getItem('token')
			// if no token stored
			if(!token){
				navigate('/signin')
				return
			}

			try {
				if (token){
					// validate token with stored users
					const res = await axiosClient.post('/check-token')
					setUser(res.user)
				}
			} catch(err) {
				navigate('/signin')
			}
		
		}
		checkAuth()
  	}, [setUser,navigate])

	const logout = () => {
		// delete authorization token
    	localStorage.removeItem('token')
    	navigate('/signin')		
  	}

	return (
	<div className="md:col-span-7 col-span-12 flex items-center justify-center">
		{/* User details if signed in */}
		{
			user && 
			<div className="md:w-384 py-4 px-2">
				<div className="text-xl font-bold my-4 ">
					Successful Loggged In!
				</div>
				<div className="text-base my-2">
					Hi, {`${user.firstName} ${user.lastName}`}
				</div>
				<button onClick={logout} 
				className="bg-golden font-semibold w-full my-2 py-4 px-4">
					Log Out
				</button>
			</div>
		}
		
	</div>
	);
}

export default Success;
