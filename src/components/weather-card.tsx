import { ArrowLeft, Wind } from "lucide-react"

import { groupForecastByDay } from "@/utils/groupForecastByDay"
import { Button } from "./ui/button"
import {
    ChartContainer,
    type ChartConfig,
} from "./ui/chart"
import {
    Area,
    AreaChart,

} from "recharts"
import { getPrecipitationProbabilities } from "@/utils/getPrecipitationProbabilities"
import { DisplayCard } from "./ui/display-card"
import { VIEWS } from "@/constants/views"

import { useMutationState } from "@tanstack/react-query"

type TWeatherCardData = TForecastData & {
    city: string
    state: string
} | undefined

const chartConfig = {
    desktop: {
        label: "Desktop",
        color: "var(--chart-1)",
    },
    mobile: {
        label: "Mobile",
        color: "var(--chart-2)",
    },
} satisfies ChartConfig

export function WeatherCard({
    data,
    setView,
}: {
    data: TWeatherCardData
    setView: (view: typeof VIEWS[keyof typeof VIEWS]) => void
}) {

    const today = data?.properties.periods[0]
    const windSpeed = today?.windSpeed

    const forecasts = groupForecastByDay(data?.properties.periods)
    const precipitationProbabilities = getPrecipitationProbabilities(
        data?.properties.periods ?? []
    )

    const mutationsArray = useMutationState({ filters: { mutationKey: ['geocode'] } })

    const lastUpdated = new Date(mutationsArray[mutationsArray.length - 1].submittedAt).toLocaleString()
    return (
        <DisplayCard>
            {/* Temperature & Condition */}
            <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                    <Button
                        variant="default"
                        size="icon-sm"
                        className="p-0"
                        onClick={() => setView(VIEWS.SEARCH)}
                    >
                        <ArrowLeft />
                    </Button>
                    <p className="text-3xl font-bold tracking-tight text-foreground leading-none">
                        {data?.city}, {data?.state}
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
                        <p className="text-base font-semibold text-foreground">
                            {windSpeed}
                        </p>
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
                        <div
                            key={day.dayName}
                            className="flex flex-col items-center gap-2"
                        >
                            <p className="text-sm text-muted-foreground">{day.dayName}</p>
                            <p className="text-sm font-semibold text-foreground">
                                {day.high}°
                            </p>
                            <p className="text-sm text-muted-foreground">{day.low}°</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Precipitation area chart */}
            <div className="space-y-2">

                <ChartContainer
                    config={chartConfig}
                    className="h-32 w-full"

                >
                    <AreaChart data={precipitationProbabilities}>
                        <defs>
                            <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                                <stop
                                    offset="5%"
                                    stopColor="var(--color-mobile)"
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="var(--color-mobile)"
                                    stopOpacity={0.1}
                                />
                            </linearGradient>

                        </defs>


                        <Area
                            type="monotone"
                            dataKey="precipitation"
                            isAnimationActive={false}
                            fillOpacity={0.5}
                            fill="url(#fillMobile)"
                        />
                    </AreaChart>
                </ChartContainer>
                <p className="text-xs text-muted-foreground">
                    Chance of precipitation throughout the week
                </p>
                <p className="text-xs text-muted-foreground">Forecast last updated: {lastUpdated}</p>
            </div>


        </DisplayCard>
    )
}

