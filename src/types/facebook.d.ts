type FacebookAuthResponse = {
	accessToken: string
	userID: string
	expiresIn: number
	signedRequest: string
	graphDomain: string
	data_access_expiration_time: number
}

export type FacebookLoginResponse = {
	authResponse: FacebookAuthResponse | null
	status: "connected" | "not_authorized" | "unknown"
}

export type LoginStatus = {
	loginSource?: string | null
} & FacebookLoginResponse
