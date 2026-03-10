import { useQuery } from "@tanstack/react-query"

export type TLatLong = {
  lat: number | undefined
  long: number | undefined
}

function getCurrentPosition(): Promise<TLatLong> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported"))
      return
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        resolve({
          lat: pos.coords.latitude,
          long: pos.coords.longitude,
        })
      },
      (error) => {
        reject(error)
      }
    )
  })
}

export function useCoords() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["coords"],
    queryFn: getCurrentPosition,
    staleTime: Infinity,
    gcTime: Infinity,
  })

  return {
    coords: data ?? null,
    isLoading,
    error,
  }
}

