import axios from "axios"
import moxios from "moxios"

import { render, stubRequest, waitFor, screen } from "../../test-utils"

import ChatConversation from "./ChatConversation"

describe("ChatConversation", () => {
	beforeEach(() => {
		moxios.install(axios)
	})

	afterEach(() => {
		moxios.uninstall(axios)
	})

	it("renders the conversation container", () => {
		stubRequest("/getAllMessages", [])
		render(<ChatConversation />)
		const conversationContainer = screen.getByTestId("conversation-container")

		expect(conversationContainer).toBeInTheDocument()
	})

	it("renders a message element for each message in the 'messages' array", async () => {
		const mockMessages = [
			{ id: "1", message: "Hello, world!", date: new Date().toISOString() },
			{ id: "2", message: "Another message", date: new Date().toISOString() },
		]
		stubRequest("/getAllMessages", mockMessages)

		render(<ChatConversation />)

		await waitFor(() => {
			const messageElements = screen.getAllByTestId("message")
			expect(messageElements).toHaveLength(2)
		})
	})
})
