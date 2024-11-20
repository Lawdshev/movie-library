import React, { ReactElement } from "react";
import { render, RenderOptions, RenderResult } from "@testing-library/react";
import { FavouriteProvider } from "@/providers/Favorite-provider";

const customRender = (
  ui: ReactElement,
  options?: RenderOptions
): RenderResult =>
  render(ui, {
    wrapper: ({ children }) => (
      <FavouriteProvider>{children}</FavouriteProvider>
    ),
    ...options,
  });

// Re-export everything
export * from "@testing-library/react";

// Override render method
export { customRender as render };
