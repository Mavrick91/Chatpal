import { waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import axios from "axios"
import moxios from "moxios"

import { render, screen } from "../../test-utils"

import ChatInput from "./ChatInput"

describe("ChatInput", () => {
	beforeEach(() => {
		moxios.install(axios)
	})

	afterEach(() => {
		moxios.uninstall(axios)
	})

	it("renders an input and a submit button", () => {
		render(<ChatInput />)

		const input = screen.getByTestId("message-input") as HTMLInputElement
		expect(input).toBeInTheDocument()

		const submitButton = screen.getByTestId(
			"button-submit"
		) as HTMLButtonElement
		expect(submitButton).toBeInTheDocument()
	})

	it("submits the form and clears the input when the submit button is clicked", async () => {
		render(<ChatInput />)

		const input = screen.getByTestId("message-input") as HTMLInputElement
		await userEvent.type(input, "Hello, world!")
		expect(input.value).toBe("Hello, world!")

		const submitButton = screen.getByTestId(
			"button-submit"
		) as HTMLButtonElement
		userEvent.click(submitButton)

		await waitFor(() => expect(input.value).toBe(""))
	})

	it("calls the saveMessage mutate function with the correct payload", async () => {
		const message = "Hello, world!"

		render(<ChatInput />)
		const inputElement = screen.getByTestId("message-input")
		const submitButton = screen.getByTestId("button-submit")

		await userEvent.type(inputElement, message)
		await userEvent.click(submitButton)

		await waitFor(() => {
			const request = moxios.requests.mostRecent()

			expect(JSON.parse(request.config.data)).toMatchObject({
				message,
				date: expect.any(String),
				id: expect.any(String),
			})
		})
	})

	it("disables the submit button when the input value is empty", async () => {
		render(<ChatInput />)

		const input = screen.getByTestId("message-input") as HTMLInputElement
		await userEvent.clear(input)
		expect(input.value).toBe("")

		const submitButton = screen.getByTestId(
			"button-submit"
		) as HTMLButtonElement
		expect(submitButton).toBeDisabled()
	})
})
