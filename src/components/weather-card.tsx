import { Cloud, CloudRain, Droplets, Sun, Wind } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { formatUTC } from "@/utils/formatUTC"

type WeatherCondition = "cloudy" | "sunny" | "rainy"

interface DayForecast {
    day: string
    condition: WeatherCondition
    high: number
    low: number
}

const forecast: DayForecast[] = [
    { day: "Mon", condition: "cloudy", high: 24, low: 16 },
    { day: "Tue", condition: "sunny", high: 26, low: 17 },
    { day: "Wed", condition: "rainy", high: 22, low: 15 },
    { day: "Thu", condition: "sunny", high: 25, low: 16 },
    { day: "Fri", condition: "cloudy", high: 23, low: 14 },
]

function WeatherIcon({ condition, size = 28 }: { condition: WeatherCondition; size?: number }) {
    if (condition === "sunny") {
        return <Sun size={size} className="text-amber-400" strokeWidth={1.5} />
    }
    if (condition === "rainy") {
        return <CloudRain size={size} className="text-blue-500" strokeWidth={1.5} />
    }
    return <Cloud size={size} className="text-zinc-400" strokeWidth={1.5} />
}

function mergeForecasts(periods: TForecastData['properties']['periods'] | undefined) {
    if (!periods) return [];
    const days = [];

    for (let i = 0; i < periods.length; i += 2) {
        const day = periods[i];
        const night = periods[i + 1];

        days.push({
            date: day.startTime.split('T')[0],
            name: day.name,
            high: day.temperature,
            low: night?.temperature ?? null,
            shortForecast: day.shortForecast,
            nightForecast: night?.shortForecast ?? null,
            probabilityOfPrecipitation: Math.max(
                day.probabilityOfPrecipitation.value ?? 0,
                night?.probabilityOfPrecipitation.value ?? 0
            ),
            windSpeed: day.windSpeed,
            windDirection: day.windDirection,
        });
    }

    return days;
}

type TWeatherCardData = TForecastData & {
    city: string;
    state: string;
} | undefined
export function WeatherCard({ data }: { data: TWeatherCardData }) {
    console.log({ data })
    const today = data?.properties.periods[0]
    const windSpeed = today?.windSpeed


    const forecasts = mergeForecasts(data?.properties.periods)
    console.log({ forecasts })


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
                    <div className="flex flex-col items-center gap-2 pt-1">
                        <Cloud size={56} className="text-zinc-400" strokeWidth={1.5} />
                        <p className="text-sm font-bold text-foreground">Partly Cloudy</p>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-border" />

                {/* Humidity & Wind */}
                <div className="flex gap-8">
                    <div className="flex items-center gap-3">
                        <Droplets size={22} className="text-blue-400" strokeWidth={1.5} />
                        <div>
                            <p className="text-xs text-muted-foreground">Humidity</p>
                            <p className="text-base font-semibold text-foreground">58%</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Wind size={22} className="text-zinc-400" strokeWidth={1.5} />
                        <div>
                            <p className="text-xs text-muted-foreground">Wind</p>
                            <p className="text-base font-semibold text-foreground">{windSpeed} mp/h</p>
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
                            <div key={day.name} className="flex flex-col items-center gap-2">
                                <p className="text-sm text-muted-foreground">{day.name}</p>
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
