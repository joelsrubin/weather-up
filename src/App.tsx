
import { Bot, Moon, Sun } from "lucide-react"
import { Spinner } from "./components/ui/spinner"


import { WeatherCard } from "./components/weather-card"

import { Button } from "./components/ui/button"
import { useLayerRecommendationMutation } from "./api/mutations/get-layer-recommendation"

import { useTheme } from "./components/theme-provider"
import { useState } from "react"
import { RecommendationModal } from "./components/recommendation-modal"

import { GetStarted } from "./components/get-started-card"
import { useForecastMutation } from "./api/mutations/use-forecast-mutation"
import { toast } from "sonner"
import { VIEWS } from "./constants/views"


export function App() {

  const [view, setView] = useState<typeof VIEWS[keyof typeof VIEWS]>(VIEWS.SEARCH)
  const { setTheme, theme } = useTheme();

  const [isOpen, setIsOpen] = useState(false);
  const { data: forecast, mutate: getForecast, isPending: isFetchingForecast } = useForecastMutation({
    onSuccess: () => {
      setView(VIEWS.FORECAST)
    },
    onError: (error) => {
      if (error.message.includes("forecast")) {
        return toast.error("Enter valid city and state")
      }
      toast.error(error.message)
    }
  });
  const { mutate: getRecommendation, isPending, data: recommendationData } = useLayerRecommendationMutation({
    onSuccess: () => {
      setIsOpen(true)
    },
    onError: () => {
      toast.error("Failed to get recommendation")
      setIsOpen(false)
    }
  })


  return (
    <>
      <div className="flex flex-col min-h-dvh" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
        <div className="flex align-middle space-x-2 p-6 w-full h-full bg-accent/50">
          <h1 className="font-medium self-center">Weather Up</h1>
          <Button variant="outline" className="" size="icon-sm" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>{theme === 'dark' ? <Moon /> : <Sun />}</Button>
        </div>
        <div className="flex flex-1 flex-col items-center justify-start w-full space-y-2 p-6">
          {view === VIEWS.SEARCH ? (<GetStarted getForecast={getForecast} isFetchingForecast={isFetchingForecast} />) : (
            <>
              <WeatherCard data={forecast} setView={setView} />
              <Button className="w-full max-w-sm" size="lg" disabled={isPending} onClick={() => {
                if (forecast) getRecommendation(forecast)
              }}><Bot /> Dress my kid with AI {isPending ? <Spinner /> : null}</Button>
            </>
          )}
        </div>
      </div>
      <RecommendationModal data={recommendationData} open={isOpen} onOpenChange={setIsOpen} location={`${forecast?.city}, ${forecast?.state}`} temperature={forecast?.properties.periods[0].temperature} />
    </>
  )
}

export default App
