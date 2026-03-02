import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders the book list heading", async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve([])
    })
  );

  render(<App />);
  const headingElement = screen.getByText(/book list/i);
  expect(headingElement).toBeInTheDocument();
  expect(await screen.findByText(/author/i)).toBeInTheDocument();
});
