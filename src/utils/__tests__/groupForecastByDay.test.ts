import { describe, it, expect } from "vitest";
import { groupForecastByDay } from "../groupForecastByDay";

type TForecastPeriod = NonNullable<
    Parameters<typeof groupForecastByDay>[0]
>[number];

const createPeriod = (
    overrides: Partial<TForecastPeriod>,
): TForecastPeriod => ({
    number: 1,
    name: "Default",
    startTime: "2024-01-01T06:00:00",
    endTime: "2024-01-01T18:00:00",
    isDaytime: true,
    temperature: 70,
    temperatureUnit: "F",
    temperatureTrend: null,
    probabilityOfPrecipitation: {
        unitCode: "wmoUnit:percent",
        value: 10,
    },
    windSpeed: "5 mph",
    windDirection: "N",
    icon: "icon",
    shortForecast: "Clear",
    detailedForecast: "Clear throughout the day.",
    ...overrides,
});

describe("groupForecastByDay", () => {
    it("returns an empty array when periods is undefined", () => {
        const result = groupForecastByDay(undefined);
        expect(result).toEqual([]);
    });

    it("groups forecast periods by date and calculates highs and lows", () => {
        const periods: TForecastPeriod[] = [
            createPeriod({
                number: 1,
                name: "New Year's Day",
                startTime: "2024-01-01T09:00:00",
                endTime: "2024-01-01T18:00:00",
                isDaytime: true,
                temperature: 70,
            }),
            createPeriod({
                number: 2,
                name: "New Year's Night",
                startTime: "2024-01-01T21:00:00",
                endTime: "2024-01-02T06:00:00",
                isDaytime: false,
                temperature: 60,
            }),
            createPeriod({
                number: 3,
                name: "Second Day",
                startTime: "2024-01-02T09:00:00",
                endTime: "2024-01-02T18:00:00",
                isDaytime: true,
                temperature: 80,
            }),
            createPeriod({
                number: 4,
                name: "Second Night",
                startTime: "2024-01-02T21:00:00",
                endTime: "2024-01-03T06:00:00",
                isDaytime: false,
                temperature: 50,
            }),
        ];

        const result = groupForecastByDay(periods);

        expect(result).toHaveLength(2);

        const firstDay = result[0];
        expect(firstDay.date).toBe("2024-01-01");
        expect(firstDay.dayName).toBe("Mon");
        expect(firstDay.high).toBe(70);
        expect(firstDay.low).toBe(60);
        expect(firstDay.daytimePeriod?.name).toBe("New Year's Day");
        expect(firstDay.overnightPeriod?.name).toBe("New Year's Night");

        const secondDay = result[1];
        expect(secondDay.date).toBe("2024-01-02");
        expect(secondDay.dayName).toBe("Tue");
        expect(secondDay.high).toBe(80);
        expect(secondDay.low).toBe(50);
        expect(secondDay.daytimePeriod?.name).toBe("Second Day");
        expect(secondDay.overnightPeriod?.name).toBe("Second Night");
    });

    it("sets daytime or overnight period to null when missing", () => {
        const periods: TForecastPeriod[] = [
            // Only daytime for this date
            createPeriod({
                number: 1,
                name: "Day Only",
                startTime: "2024-01-03T09:00:00",
                endTime: "2024-01-03T18:00:00",
                isDaytime: true,
                temperature: 72,
            }),
            // Only overnight for this date
            createPeriod({
                number: 2,
                name: "Night Only",
                startTime: "2024-01-04T21:00:00",
                endTime: "2024-01-05T06:00:00",
                isDaytime: false,
                temperature: 55,
            }),
        ];

        const result = groupForecastByDay(periods);

        const thirdDay = result.find((d) => d.date === "2024-01-03");
        expect(thirdDay).toBeDefined();
        expect(thirdDay?.daytimePeriod?.name).toBe("Day Only");
        expect(thirdDay?.overnightPeriod).toBeNull();

        const fourthDay = result.find((d) => d.date === "2024-01-04");
        expect(fourthDay).toBeDefined();
        expect(fourthDay?.daytimePeriod).toBeNull();
        expect(fourthDay?.overnightPeriod?.name).toBe("Night Only");
    });
});
