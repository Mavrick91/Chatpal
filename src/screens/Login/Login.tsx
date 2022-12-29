import { useCallback } from "react"
import { Link } from "react-router-dom"

import logoChatPal from "../../assets/logo_chat_pal.png"
import Button from "../../components/Button"
import { useUserInfo } from "../../context/UserInfoProvider"
import ROUTES from "../../routes/constants"
import { LoginResponse } from "../../types/facebook"

const Login = () => {
	const { setUserInfo } = useUserInfo()

	const handleLogin = useCallback(() => {
		window.FB.login((response: LoginResponse) => {
			setUserInfo((prev) => ({ ...prev, ...response }))
		})
	}, [setUserInfo])

	return (
		<div className="flex flex-col items-center w-full justify-between">
			<div className="flex items-center justify-center flex-col">
				<img
					alt="Logo chatpal"
					className="h-60 aspect-square"
					src={logoChatPal}
				/>
				<Button
					className={` rounded py-4 px-8 bg-[#4b565c] text-white text-lg hover:bg-[#434E53]`}
					onClick={handleLogin}
				>
					Log in with facebook
				</Button>
			</div>
			<div className="mb-7 flex gap-8">
				<Link className="text-white underline" to={ROUTES.PRIVACY_POLICY}>
					Privacy Policy
				</Link>
				<Link className="text-white underline" to={ROUTES.TERMS_OF_SERVICES}>
					Terms of service
				</Link>
			</div>
		</div>
	)
}

export default Login
