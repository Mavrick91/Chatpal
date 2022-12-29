import {
	createContext,
	Dispatch,
	ReactNode,
	SetStateAction,
	useContext,
	useMemo,
	useState,
} from "react"

import { FacebookLoginResponse } from "../types/facebook"

type UserInfo = {
	facebook: Partial<FacebookLoginResponse> & { verified: boolean }
}

type ProviderContext = {
	userInfo: UserInfo
	setUserInfo: Dispatch<SetStateAction<UserInfo>>
}

const ApiContext = createContext<ProviderContext | null>(null)

type Props = {
	children: ReactNode
}

const UserInfoProvider = ({ children }: Props) => {
	const [userInfo, setUserInfo] = useState<UserInfo>({
		facebook: { verified: false },
	})

	const value = useMemo(
		() => ({
			userInfo,
			setUserInfo,
		}),
		[userInfo]
	)

	return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>
}

export const useUserInfo = () => {
	const context = useContext(ApiContext)
	if (context === null) {
		throw new Error("useUserInfo must be used within a UserInfoProvider")
	}
	return context
}

export default UserInfoProvider
