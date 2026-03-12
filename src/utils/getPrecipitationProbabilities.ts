export function getPrecipitationProbabilities(periods: TForecastPeriod[]) {
    return periods.slice(0, 10).map((period) => ({
        precipitation: period.probabilityOfPrecipitation?.value,
        date: new Date(period.startTime).toLocaleDateString(undefined, {
            weekday: "short",
        }),
    }))
}
