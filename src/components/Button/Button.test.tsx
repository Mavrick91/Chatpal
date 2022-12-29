import { screen } from "../../test-utils"
import userEvent from "@testing-library/user-event"

import { render } from "../../test-utils"

import Button from "./Button"

describe("Button", () => {
	test("renders button with children", () => {
		render(<Button>Click me</Button>)

		expect(screen.getByText("Click me")).toBeInTheDocument()
	})

	test("renders button with specified type", () => {
		render(<Button type="submit">Click me</Button>)
		const button = screen.getByText("Click me")

		expect(button).toBeInTheDocument()
		expect(button).toHaveAttribute("type", "submit")
	})

	test("button is disabled when disabled prop is passed", () => {
		render(<Button disabled>Click me</Button>)
		const button = screen.getByText("Click me")

		expect(button).toBeInTheDocument()
		expect(button).toHaveAttribute("disabled")
	})

	test("button has specified class when disabled prop is passed", () => {
		render(<Button disabled>Click me</Button>)
		const button = screen.getByText("Click me")

		expect(button).toHaveClass("disabled:opacity-50")
	})

	test("button has specified testId", () => {
		render(<Button testId="test-button">Click me</Button>)
		const button = screen.getByTestId("test-button")

		expect(button).toBeInTheDocument()
	})

	test("button onClick handler is called", async () => {
		const handleClick = jest.fn()
		render(<Button onClick={handleClick}>Click me</Button>)
		const button = screen.getByText("Click me")

		await userEvent.click(button)

		expect(handleClick).toHaveBeenCalled()
	})

	test("Button component applies custom class name correctly", () => {
		render(<Button className="custom-class">Click me</Button>)

		expect(screen.getByText("Click me")).toHaveClass("custom-class")
	})
})
