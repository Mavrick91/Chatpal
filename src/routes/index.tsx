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

const Router = () => {
	const isAuth = false

	window.FB.getLoginStatus((response: LoginStatus) => {
		console.log("🚀 ~ response", response)
	})

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
