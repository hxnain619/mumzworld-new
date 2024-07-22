import React from "react";
import { render, screen } from "@testing-library/react-native";

import Chip from "../Chip";
import Loader from "../Loader";
import Divider from "../Divider";

describe("Testing components", () => {
  it("should render Divider correctly", () => {
    render(<Divider />);

    const elem = screen.getByTestId("divider-component");
    expect(elem).toBeTruthy();
  });
  it("should render Loader correctly", () => {
    render(<Loader />);

    const elem = screen.getByTestId("loader-component");
    expect(elem).toBeTruthy();
  });
  it("should render Chip correctly", () => {
    render(<Chip />);

    const elem = screen.getByTestId("chip-component");
    expect(elem).toBeTruthy();
  });

});
