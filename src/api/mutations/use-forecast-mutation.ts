import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
const API_ENDPOINT = 'https://api.weather.gov'
export const geocodeCity = async (searchQuery: string) => {
    const response = await fetch(
        `https://nominatim.openstreetmap.org/search?` +
        `q=${encodeURIComponent(searchQuery)}&` +
        `format=json&limit=1`
    );
    const data = await response.json();

    if (data.length === 0) {
        throw new Error('City not found');
    }

    const { lat, lon } = data[0];
    const gridpointsData = await fetch(`${API_ENDPOINT}/points/${lat},${lon}`);
    const gridpointsResponse = await gridpointsData.json() as TWeatherPointResponse;
    const forecastUrl = gridpointsResponse.properties.forecast;
    const city = gridpointsResponse.properties.relativeLocation.properties.city;
    const state = gridpointsResponse.properties.relativeLocation.properties.state;
    const forecastData = await fetch(forecastUrl);
    const forecastResponse = await forecastData.json() as TForecastData;

    return { city, state, ...forecastResponse };

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
