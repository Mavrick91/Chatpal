import { render, screen } from "@testing-library/react"

import SocketIOProvider, { useSocket } from "./SocketIOProvider"

describe("SocketIOProvider", () => {
	afterEach(() => {
		jest.clearAllMocks()
	})

	it("provides the socket client to its children", () => {
		const TestComponent = () => {
			useSocket()
			return <div data-testid="socket-client"></div>
		}

		render(
			<SocketIOProvider>
				<TestComponent />
			</SocketIOProvider>
		)

		const socketClientElement = screen.getByTestId("socket-client")
		expect(socketClientElement).toBeInTheDocument()
	})

	it("throws an error if useSocket is used outside of a SocketIOProvider", () => {
		jest.spyOn(console, "error").mockImplementation(() => null)

		// Define a component that uses the useApi hook outside of an ApiProvider
		const TestComponent = () => {
			useSocket()
			return null
		}

		// Assert that the component throws an error when rendered
		expect(() => render(<TestComponent />)).toThrowError(
			"useSocket must be used within a SocketIOProvider"
		)
	})
})
