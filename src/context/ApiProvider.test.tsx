import { render, screen } from "@testing-library/react"

import ApiProvider, { useApi } from "./ApiProvider"

describe("ApiProvider", () => {
	afterEach(() => {
		jest.clearAllMocks()
	})

	it("provides the axios client to its children", () => {
		const TestComponent = () => {
			useApi()
			return <div data-testid="axios-client"></div>
		}

		render(
			<ApiProvider>
				<TestComponent />
			</ApiProvider>
		)

		const axiosClientElement = screen.getByTestId("axios-client")
		expect(axiosClientElement).toBeInTheDocument()
	})

	it("throws an error if useApi is used outside of an ApiProvider", () => {
		jest.spyOn(console, "error").mockImplementation(() => null)

		// Define a component that uses the useApi hook outside of an ApiProvider
		const TestComponent = () => {
			useApi()
			return null
		}

		// Assert that the component throws an error when rendered
		expect(() => render(<TestComponent />)).toThrowError(
			"useApi must be used within a ApiProvider"
		)
	})
})
