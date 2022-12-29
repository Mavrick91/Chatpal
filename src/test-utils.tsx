import React, { ReactElement } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { render, RenderOptions } from "@testing-library/react"
import moxios from "moxios"

import ApiProvider from "./context/ApiProvider"
import SocketIOProvider from "./context/SocketIOProvider"

const queryClient = new QueryClient()

const AllTheProviders = ({ children }: { children: React.ReactNode }) => (
	<QueryClientProvider client={queryClient}>
		<ApiProvider>
			<SocketIOProvider>{children}</SocketIOProvider>
		</ApiProvider>
	</QueryClientProvider>
)

const customRender = (
	ui: ReactElement,
	options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options })

const stubRequest = (url: string, response: any) => {
	moxios.stubRequest(url, {
		status: 200,
		response,
	})
}

export * from "@testing-library/react"
export { customRender as render, stubRequest }
