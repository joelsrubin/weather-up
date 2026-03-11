type TForecastPeriod = {
    number: number;
    name: string;
    startTime: string;
    endTime: string;
    isDaytime: boolean;
    temperature: number;
    temperatureUnit: string;
    temperatureTrend: string | null;
    probabilityOfPrecipitation: {
        unitCode: string;
        value: number | null;
    };
    windSpeed: string;
    windDirection: string;
    icon: string;
    shortForecast: string;
    detailedForecast: string;
};

type TDayForecast = {
    date: string;
    dayName: string;
    high: number;
    low: number;
    daytimePeriod: TForecastPeriod | null;
    overnightPeriod: TForecastPeriod | null;
};

export function groupForecastByDay(periods: TForecastPeriod[] | undefined): TDayForecast[] {
    if (!periods) {
        return []
    }
    const dayMap = new Map<string, TForecastPeriod[]>();

    for (const period of periods) {
        const date = period.startTime.split("T")[0];
        if (!dayMap.has(date)) {
            dayMap.set(date, []);
        }
        dayMap.get(date)?.push(period);
    }

    return Array.from(dayMap.entries()).map(([date, dayPeriods]) => {

        const temps = dayPeriods.map((p) => p.temperature);
        const high = Math.max(...temps);
        const low = Math.min(...temps);

        // Anchor to noon to avoid UTC midnight rolling back a day
        const dayName = new Date(`${date}T12:00:00`).toLocaleDateString("en-US", {
            weekday: "short",
        });

        const daytimePeriod = dayPeriods.find((p) => p.isDaytime) ?? null;
        const overnightPeriod = dayPeriods.find((p) => !p.isDaytime) ?? null;

        return { date, dayName, high, low, daytimePeriod, overnightPeriod };
    });
}