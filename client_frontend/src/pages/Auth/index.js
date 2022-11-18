import { Outlet } from "react-router-dom";

import Logo from './assets/logo.svg';
import Pose from './assets/pose.png';
import Divider from './assets/divider.svg';

function Auth() {

	const mobileNumber = "+91-9380644532"

  	return (
	  	<div className="grid grid-cols-12 min-h-screen font-poppins">
			{/* Sidebar */}
	    	<div className="col-span-5 md:block hidden bg-sidebar-blue">
	    		<div className="flex flex-col min-h-screen">
		    		<div className="flex-1 flex items-center justify-center">
						{/* company logo */}
		    			<img className="w-full h-[150px] w-[210px]" src={Logo} alt="Logo" />
		    		</div>
		    		<div className="flex-none">
						{/* Welcome message */}
		    			<div className="flex flex-rows">
	    					<div className="flex-none flex justify-center items-end">
	    						<div>
	    							<img className="h-full w-[165px] max-w-full" src={Pose} alt="Pose" />
	    						</div>
	    					</div>
			    			<div className="grow text-white pb-4 pr-4">
			    				<div className="text-xl font-bold mb-3">
			    					Welcome back!
			    				</div>
			    				<p>
			    					Sign In to find opportunities that match your interests.
			    					We have both part-time and full-time roles that can be done online and in-person.
			    				</p>
			    				<div className="my-12">
									<img src={Divider} alt="Divider" />
			    				</div>
			    				<p className="text-sm">
									{/* Contact info */}
			    					Please contact us at {mobileNumber} if you need any assistance.
			    				</p>
			    			</div>
		    			</div>
		    		</div>
	    		</div>
	    	</div>

			{/* Container to show nested component, SignUp and SignIn */}
	    	<Outlet />

		</div>	
  	);
}

export default Auth;
