
import { Moon, Sun } from "lucide-react"
import { Spinner } from "./components/ui/spinner"
import { useCoords } from "./hooks/use-coords"
import { useForecastQuery } from "./api/queries/use-forecast-query"
import { WeatherCard } from "./components/weather-card"

import { Button } from "./components/ui/button"
import { useLayerRecommendationMutation } from "./api/mutations/get-layer-recommendation"
import { LoadingCard } from "./components/loading-card"
import { useTheme } from "./components/theme-provider"

export function App() {
  const { coords, isLoading: isFetchingCoords, error } = useCoords()
  const { data: forecast, isLoading: isFetchingForecast } = useForecastQuery({ lat: coords?.lat, long: coords?.long })
  const { setTheme, theme } = useTheme();
  const { mutateAsync: getRecommendation, data: suggestion, isPending } = useLayerRecommendationMutation({
    onSuccess: (suggestion) => {

    }
  })

  const isLoading = isFetchingCoords || isFetchingForecast

  return (
    <div className="flex flex-col min-h-svh">
      <div className="flex align-middle space-x-2 p-6 w-full h-full bg-accent/50">
        <h1 className="font-medium self-center">Weather Up</h1>
        <Button variant="outline" className="" size="icon-sm" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>{theme === 'dark' ? <Moon /> : <Sun />}</Button>
      </div>
      <div className="flex flex-1 flex-col items-center justify-start w-full space-y-2 p-6">
        {isLoading && (
          <LoadingCard />
        )}
        {!isLoading && error && (
          <p className="text-destructive">Unable to retrieve location</p>
        )}
        {!isLoading && !error && coords && (
          <WeatherCard data={forecast} />
        )}
        <Button disabled={isPending} onClick={async () => {
          const layers = await getRecommendation(forecast)
          console.log(layers)
        }}>{isPending ? "Getting" : "Get"} AI Layers Recommendation {isPending ? <Spinner /> : null}</Button>
      </div>
    </div>
  )
}

export default App
