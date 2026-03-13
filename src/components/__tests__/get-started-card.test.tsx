import { expect, test, describe, vi } from 'vitest'
import { render } from 'vitest-browser-react'
import { GetStarted } from "../get-started-card";

describe("GetStarted", async () => {
  test("does not call getForecast when the input is empty", async () => {
    const mockMutate = vi.fn();

    const { getByRole } = await render(<GetStarted getForecast={mockMutate as any} isFetchingForecast={false} />);

    const button = await getByRole("button", { name: /search/i }).click();
    expect(button).toBeInTheDocument

    expect(mockMutate).not.toHaveBeenCalled();
  });
});
