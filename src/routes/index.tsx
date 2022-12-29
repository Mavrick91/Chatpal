import { useMemo } from "react"
import {
	createBrowserRouter,
	RouteObject,
	RouterProvider,
} from "react-router-dom"

import ErrorPage from "../screens/ErrorPage"
import Login from "../screens/Login"
import PrivacyPolicy from "../screens/PrivacyPolicy/PrivacyPolicy"
import TermsOfService from "../screens/TermsOfService/TermsOfService"
import { LoginStatus } from "../types/facebook"

import ROUTES from "./constants"
import { useUserInfo } from "../context/UserInfoProvider"

const Router = () => {
	const { userInfo, setUserInfo } = useUserInfo()
	const isAuth = false

	if (!userInfo.facebook.verified) {
		window.FB.getLoginStatus((response: LoginStatus) => {
			setUserInfo((prev) => ({
				...prev,
				facebook: { ...response, verified: true },
			}))
		})
	}

	const routes = useMemo(
		() =>
			[
				{ path: ROUTES.PRIVACY_POLICY, element: <PrivacyPolicy /> },
				{ path: ROUTES.TERMS_OF_SERVICES, element: <TermsOfService /> },
			] as RouteObject[],
		[]
	)

	if (!isAuth) {
		routes.push({
			path: ROUTES.LOGIN,
			element: <Login />,
			errorElement: <ErrorPage />,
		})
	}

	const router = createBrowserRouter(routes)

	return <RouterProvider router={router} />
}

export default Router
