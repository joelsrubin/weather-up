
import { Sun } from "lucide-react"
import { Spinner } from "./components/ui/spinner"
import { useCoords } from "./hooks/use-coords"
import { useForecastQuery } from "./api/queries/use-forecast-query"

export function App() {
  const { coords, isLoading, error } = useCoords()
  const { data } = useForecastQuery({ lat: coords?.lat, long: coords?.long })

  console.log({ data })
  return (
    <div className="flex flex-col min-h-svh">
      <div className="flex space-x-2 p-6 w-full h-full bg-accent">
        <h1 className="font-medium">Weather Up</h1>
        <Sun />
      </div>
      <div className="flex flex-1 flex-col items-center justify-center w-full space-y-2">
        {isLoading && (
          <>
            <h1 className="text-secondary-foreground">Grabbing User Location</h1>
            <Spinner />
          </>
        )}
        {!isLoading && error && (
          <p className="text-destructive">Unable to retrieve location</p>
        )}
        {!isLoading && !error && coords && (
          <div>
            <pre>lat: {coords.lat}</pre>
            <pre>long: {coords.long}</pre>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
