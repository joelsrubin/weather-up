import type { TLatLong } from "@/hooks/use-coords";
import { type TForecastData } from "@/types";
import { useQuery } from "@tanstack/react-query";

const API_ENDPOINT = 'https://api.weather.gov'



async function getForecast({ lat, long }: TLatLong) {
    const data = await fetch(`${API_ENDPOINT}/points/${lat},${long}`)
    const response = await data.json();
    const forecastUrl = response.properties.forecast

    const forecastData = await fetch(forecastUrl)
    const forecastResponse = await forecastData.json();
    console.log({ forecastResponse })
    return forecastResponse
}

export function useForecastQuery({ lat, long }: TLatLong) {

    return useQuery<TForecastData>({
        queryKey: ["coords", lat, long],
        queryFn: () => getForecast({ lat, long }),
        staleTime: Infinity,
        gcTime: Infinity,
        enabled: !!lat && !!long
    })


}

