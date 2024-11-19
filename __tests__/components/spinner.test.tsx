import React from "react";
import { render, screen } from "@testing-library/react";
import Loader from "@/components/spinner";

describe("Loader Component", () => {
  it("renders the loader spinner", () => {
    render(<Loader />);

    const spinner = screen.getByTestId("loader-spinner");

    expect(spinner).toBeInTheDocument();
  });

  it("ensures the loader is centered in the viewport", () => {
    render(<Loader />);

    const loaderContainer = screen.getByTestId("loader-container");

    expect(loaderContainer).toBeInTheDocument();
  });
});
