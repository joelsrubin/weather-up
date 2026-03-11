import { Wind } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

import { groupForecastByDay } from "@/utils/groupForecastByDay"








type TWeatherCardData = TForecastData & {
    city: string;
    state: string;
} | undefined
export function WeatherCard({ data }: { data: TWeatherCardData }) {

    const today = data?.properties.periods[0]
    const windSpeed = today?.windSpeed


    const forecasts = groupForecastByDay(data?.properties.periods)


    return (
        <Card className="w-full max-w-sm rounded-3xl border-border shadow-sm bg-card">
            <CardContent className="p-8 space-y-6">
                {/* Location */}
                <p className="text-muted-foreground text-base font-normal">{data?.city}, {data?.state}</p>

                {/* Temperature & Condition */}
                <div className="flex items-start justify-between">
                    <div>
                        <p className="text-7xl font-bold tracking-tight text-foreground leading-none">
                            {today?.temperature}°
                        </p>

                    </div>

                </div>

                {/* Divider */}
                <div className="border-t border-border" />

                {/* Humidity & Wind */}
                <div className="flex gap-8">

                    <div className="flex items-center gap-3">
                        <Wind size={22} className="text-zinc-400" strokeWidth={1.5} />
                        <div>
                            <p className="text-xs text-muted-foreground">Wind</p>
                            <p className="text-base font-semibold text-foreground">{windSpeed}</p>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-border" />

                {/* 5-Day Forecast */}
                <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">5-Day Forecast</p>
                    <div className="flex justify-between">
                        {forecasts.slice(0, 5).map((day) => (
                            <div key={day.dayName} className="flex flex-col items-center gap-2">
                                <p className="text-sm text-muted-foreground">{day.dayName}</p>
                                {/* <WeatherIcon condition={day.condition} size={26} /> */}
                                <p className="text-sm font-semibold text-foreground">{day.high}°</p>
                                <p className="text-sm text-muted-foreground">{day.low}°</p>
                            </div>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
