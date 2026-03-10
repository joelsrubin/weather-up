
import { Sun } from "lucide-react"

import { useEffect, useState } from "react"
import { Spinner } from "./components/ui/spinner"

type TLatLong = {
  lat: number;
  long: number
}

export function App() {
  const [latLong, setLatLong] = useState<TLatLong | null>(null)
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      console.log(pos.coords)
      setLatLong({
        lat: pos.coords.latitude,
        long: pos.coords.longitude
      })
      setIsLoading(false)
    });
  }, [])

  return (
    <div className="flex flex-col min-h-svh">
      <div className="flex space-x-2 p-6 w-full h-full bg-accent">
        <h1 className="font-medium">Weather Up</h1>
        <Sun />
      </div>
      <div className="flex flex-1 flex-col items-center justify-center w-full space-y-2">
        {isLoading ? (
          <>
            <h1 className="text-secondary-foreground">Grabbing User Location</h1>
            <Spinner />
          </>
        ) : (
          <div>
            <pre>lat: {latLong?.lat}</pre>
            <pre>long: {latLong?.long}</pre>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
