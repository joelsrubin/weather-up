import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import { ENDPOINTS } from "@/constants/endpoints";

export const geocodeCity = async (searchQuery: string) => {

    const response = await fetch(
        `${ENDPOINTS.GEOCODE}/search?` +
        `q=${encodeURIComponent(searchQuery)}&` +
        `format=json&limit=1`
    );
    const data = await response.json();

    if (data.length === 0) {
        throw new Error('City not found');
    }

    const { lat, lon, display_name } = data[0];

    const gridpointsData = await fetch(`${ENDPOINTS.WEATHER_API}/points/${lat},${lon}`);
    const gridpointsResponse = await gridpointsData.json() as TWeatherPointResponse;

    const forecastUrl = gridpointsResponse.properties.forecast;
    const { state } = gridpointsResponse.properties.relativeLocation.properties;

    const forecastData = await fetch(forecastUrl);
    const forecastResponse = await forecastData.json() as TForecastData;

    return { city: display_name.split(',')[0], state, ...forecastResponse };

};


export function useForecastMutation
    (
        options?: UseMutationOptions<any, Error, string>
    ) {
    return useMutation<any, Error, string>({
        mutationFn: (searchQuery) => geocodeCity(searchQuery),
        mutationKey: ['geocode'],
        ...options,
    });
}
