
import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import { generateText } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";

// we'd want to move this to server side code in order to hide the key from the client
const google = createGoogleGenerativeAI({
    apiKey: import.meta.env.VITE_GOOGLE_GENERATIVE_AI_API_KEY,
});

type TForecastWithLocation = TForecastData & {
    city: string;
    state: string;
};



const recommendationCache = new Map<string, string>();

export async function getLayerRecommendation(forecast: TForecastWithLocation | undefined): Promise<string | null> {
    if (!forecast) return null
    const today = forecast.properties.periods[0];

    const cacheKey = `${forecast.city}-${forecast.state}-${today.startTime}`;
    const cached = recommendationCache.get(cacheKey);
    if (cached) {
        return cached;
    }

    const { text } = await generateText({
        model: google("gemini-2.5-flash"),
        prompt: `
You are an expert parent helping another parent decide what clothing layers their kid should wear today based on the weather.

Weather location: ${forecast.city}, ${forecast.state}
Today's forecast JSON:
${JSON.stringify(today)}

Return ONLY valid JSON with this exact shape:
{
  "layers": string[],
  "summary": string
}
        `.trim(),
    });
    console.log({ text })

    recommendationCache.set(cacheKey, text);
    return text;
}

export function useLayerRecommendationMutation(
    options?: UseMutationOptions<string | null, Error, TForecastWithLocation | undefined>
) {
    return useMutation<string | null, Error, TForecastWithLocation | undefined>({
        mutationFn: (forecast) => getLayerRecommendation(forecast),
        ...options,
    });
}


