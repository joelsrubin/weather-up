import { describe, expect, test, vi } from "vitest";
import { render } from "vitest-browser-react";
import { App } from "@/App";
import { toast } from "sonner";
import { ThemeProvider } from "./components/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const fakeForecast: any = {
  city: "Testville",
  state: "TS",
  properties: {
    periods: [
      {
        number: 1,
        name: "Today",
        startTime: "2024-01-01T09:00:00",
        endTime: "2024-01-01T21:00:00",
        isDaytime: true,
        temperature: 72,
        temperatureUnit: "F",
        temperatureTrend: null,
        probabilityOfPrecipitation: {
          unitCode: "wmoUnit:percent",
          value: 20,
        },
        windSpeed: "5 mph",
        windDirection: "N",
        icon: "",
        shortForecast: "Sunny",
        detailedForecast: "Sunny and pleasant.",
      },
    ],
  },
};

const fakeRecommendation = {
  layers: ["Warm jacket", "Jeans", "Sneakers", "Beanie"],
  summary: "Test summary explaining the outfit.",
};

vi.mock("./api/mutations/use-forecast-mutation", () => {
  return {
    useForecastMutation: (options?: {
      onError?: (error: Error) => void;
      onSuccess?: () => void;
    }) => ({
      data: fakeForecast,
      isPending: false,
      mutate: (search: string) => {
        if (search === "21146") {
          options?.onError?.(new Error("forecast not found"));
        } else {
          options?.onSuccess?.();
        }
      },
    }),
  };
});

vi.mock("./api/mutations/get-layer-recommendation", () => {
  return {
    useLayerRecommendationMutation: (options?: { onSuccess?: () => void }) => ({
      mutate: vi.fn(() => {
        options?.onSuccess?.();
      }),
      isPending: false,
      data: fakeRecommendation,
    }),
  };
});

const queryClient = new QueryClient();
function renderWithProviders(children: React.ReactNode) {
  return render(
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>{children}</ThemeProvider>
    </QueryClientProvider>,
  );
}

describe("App invalid search", () => {
  test("shows an error toast when submitting invalid 21146", async () => {
    const toastErrorSpy = vi.spyOn(toast, "error");

    const { getByLabelText, getByRole } = await renderWithProviders(<App />);

    await getByLabelText("Location").fill("21146");
    await getByRole("button", { name: /search/i }).click();

    expect(toastErrorSpy).toHaveBeenCalledWith("Enter valid city and state");
  });
});

describe("App recommendation modal", () => {
  test("opens and shows recommendation data when layer recommendation succeeds", async () => {
    const { getByLabelText, getByRole, getByText } = await renderWithProviders(
      <App />,
    );

    // Submit a valid search to switch to forecast view
    await getByLabelText("Location").fill("Valid City");
    await getByRole("button", { name: /search/i }).click();

    // Click the "Dress my kid with AI" button to trigger recommendation mutation
    await getByRole("button", { name: /dress my kid with ai/i }).click();

    // Modal should open and display the fake recommendation data
    getByText("Warm jacket");
    getByText("Test summary explaining the outfit.");
  });
});

