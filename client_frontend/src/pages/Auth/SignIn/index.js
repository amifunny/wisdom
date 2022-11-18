import { useState } from 'react'
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom'

import {BsFillEyeFill, BsFillEyeSlashFill} from 'react-icons/bs'
import LogoMobile from './../assets/logo_mobile.svg';
import axiosClient from "../../../utils/axiosClient"

function SignIn() {

	const { register, setError, handleSubmit, formState: {errors}, reset } = useForm();

	const navigate = useNavigate()

	const [passwordVisible, setPasswordVisible] = useState(false);
    
	// on click toggle password between plain and hidden 
	const togglePasswordVisiblity = () => {
    	setPasswordVisible(passwordVisible ? false : true);
	};

	const validateEmail = (email) => {
	    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	    return re.test(email)
	}

	const validateMobile = (mobile) => {
	    var re = /^(\+\d{1,3}[- ]?)?\d{10}$/;
	    return re.test(mobile);
	}

	// return payload after validation
	const getPayload = (emailMobile, password) => {
		
		// if first character is numeric,
		// check validation of mobile
		// else check for email
		if( emailMobile[0] >= '0' && emailMobile[0] <= '9' ){
			
			if( validateMobile(emailMobile) ){
				const mobile = emailMobile
				// add mobile and password to payload
				return { mobile, password }
				
			}else{
				setError('emailMobile', { 
					type: 'custom',
					message: 'Please enter a valid mobile number' 
				});
				return
			}
			
		} else {

			if( validateEmail(emailMobile) ){
				const email = emailMobile
				// add email and password to payload
				return { email, password }
			}else{
				setError('emailMobile', { 
					type: 'custom',
					message: 'Please enter a valid email' 
				});
				return
			}

		}

	}

	const handleFormSubmit = async (data, e) => {
		e.preventDefault()

		// stores either email or mobile given by user
		const emailMobile = data.emailMobile.trim()
		const password = data.password.trim()

		// stores data for signin credentials
		let payload = getPayload(emailMobile, password)	
		if(!payload) return

		try{
			const res = await axiosClient.post('/signin', payload)
			// rest input field
			reset()
			// store response token of user
			localStorage.setItem('token', res.token)
	  		navigate('/success')			
		}
		catch({data}){
			// set errors to form input field
			switch(data.errors[0].param){
				case "password": 
					setError('password', { 
						type: 'custom',
						message: 'Sorry! Password entered is incorrect'
					});
					break
				case "email": 
					setError('emailMobile', { 
						type: 'custom',
						message: 'Sorry! This email is not registered.'
					});
					break
				case "mobile": 
					setError('emailMobile', { 
						type: 'custom',
						message: 'Sorry! This mobile number is not registered.'
					});
					break
			}
		}

	}

	return (
	<div className="col-span-12 md:col-span-7 text-neutral-black flex md:items-center justify-center">
		{/* Sign In form */}
		<form className="md:w-[384px] relative px-4" onSubmit={handleSubmit(handleFormSubmit)}>
			
			{/* Logo for mobile */}
			<div className="md:hidden flex md:items-center justify-center my-10">
				<img className="w-[150px] h-[50px]" src={LogoMobile} alt="Logo Mobile" />
			</div>
			<div className="text-xl font-bold mb-1">
				Sign In to WisdomCircle
			</div>
			{/* Sign Up Link */}
			<div className="text-base text-neutral-grey mb-6">
				Don’t have an account? 
				<Link className="font-semibold text-royal-blue ml-1" 
				to='/signin'>Sign Up</Link>
			</div>

			{/* Email or Mobile input field */}
			<div className="relative">
				<input 
				className={"w-full \
				outline-none \
				border-2 border-solid border-neutral-divider rounded \
				px-4 py-3 "+ 
				(errors.emailMobile ? 
				'text-error border-error hover:border-error active:border-error focus:border-error' :
				'hover:border-neutral-grey focus:border-neutral-grey')} 
				name='emailMobile'
				{...register("emailMobile", {
					required: "Email or Mobile is required"
				})}
				placeholder="Email or Mobile Number" />
					{/* Error message for email or mobile */}
					{errors.emailMobile && 
					<p className="absolute -bottom-6 text-xs text-error">{errors.emailMobile.message}</p>}
			</div>

			{/* Password input field */}
			<div className="relative mt-6">
				<input 
				className={"w-full \
				border-2 border-solid border-red rounded \
				outline-none \
				py-3 pl-4 pr-8 "+
				(errors.password ? 
				'text-error border-error hover:border-error active:border-error focus:border-error' :
				'hover:border-neutral-grey focus:border-neutral-grey')}
				name='password'
				{...register("password", {
					required: "Password is required",
					minLength: {		
						value: 6,
						message: "Min 6 char"
					}
				})}
				type={passwordVisible ? "text" : "password"}
				placeholder="Password" />
				{/* Show or Hide password button */}
				<span className={"cursor-pointer absolute \
				top-1/2 right-1 transform -translate-x-1/2 -translate-y-1/2 "+
				(errors.password ? 'text-error' : 'text-charcoal')}
			 	onClick={togglePasswordVisiblity}>
					{ passwordVisible ? <BsFillEyeSlashFill /> : <BsFillEyeFill /> }
				</span>
				{/* Error message for password */}
				{errors.password && 
				<p className="absolute -bottom-6 text-xs text-error">{errors.password.message}</p>}
			</div>

			{/* Forget password link */}
			<div className="w-full text-royal-blue font-semibold 
			text-right text-sm leading-[22px] md:mt-1 mt-5">
				<Link to="/signin">Forgot password</Link>
			</div>
			{/* Form submit button */}
			<div className="w-full absolute md:static
				left-0 bottom-8 px-4 md:px-0">
				<button 
				className="w-full bg-golden font-semibold 
				text-[18px] leading-[26px] 
				py-3 px-8 mt-6">
					Sign In
				</button>
			</div>
		</form>
	</div>
	);
}

export default SignIn;
