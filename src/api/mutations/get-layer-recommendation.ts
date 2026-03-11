
import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import { generateText, Output } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { z } from 'zod';
// we'd want to move this to server side code in order to hide the key from the client
const google = createGoogleGenerativeAI({
    apiKey: import.meta.env.VITE_GOOGLE_GENERATIVE_AI_API_KEY,
});

type TForecastWithLocation = TForecastData & {
    city: string;
    state: string;
};

export async function getLayerRecommendation(forecast: TForecastWithLocation): Promise<{ layers: string[]; summary: string; }> {

    const today = forecast.properties.periods[0];
    const { output } = await generateText({
        model: google("gemini-2.5-flash"),
        output: Output.object({
            schema: z.object({
                layers: z.array(z.string()),
                summary: z.string(),
            }),
        }),
        prompt: `
You are an expert parent helping another parent decide what clothing layers their kid should wear today based on the weather.

Weather location: ${forecast.city}, ${forecast.state}
Today's forecast JSON:
${JSON.stringify(today)}
`.trim(),
    });

    return output;
}

export function useLayerRecommendationMutation(
    options?: UseMutationOptions<{ layers: string[]; summary: string; }, Error, TForecastWithLocation>
) {
    return useMutation<{ layers: string[]; summary: string; }, Error, TForecastWithLocation>({
        mutationFn: (forecast) => getLayerRecommendation(forecast),
        mutationKey: ['layers'],
        ...options,
    });
}


