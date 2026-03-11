import type { TLatLong } from "@/hooks/use-coords";

import { useQuery } from "@tanstack/react-query";

const API_ENDPOINT = 'https://api.weather.gov'



async function getForecast({ lat, long }: TLatLong): Promise<TForecastData & { city: string; state: string }> {
    const data = await fetch(`${API_ENDPOINT}/points/${lat},${long}`);
    const response = await data.json() as TWeatherPointResponse;
    const forecastUrl = response.properties.forecast;
    const city = response.properties.relativeLocation.properties.city;
    const state = response.properties.relativeLocation.properties.state;
    const forecastData = await fetch(forecastUrl);
    const forecastResponse = await forecastData.json() as TForecastData;

    return { city, state, ...forecastResponse };
}

export function useForecastQuery({ lat, long }: TLatLong) {

    return useQuery<TForecastData & { city: string; state: string }>({
        queryKey: ["coords", lat, long],
        queryFn: () => getForecast({ lat, long }),
        staleTime: Infinity,
        gcTime: Infinity,
        enabled: !!lat && !!long
    })


}

