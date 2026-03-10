export type TForecastData = {
    "@context": (string | {
        "@version": string;
        wx: string;
        geo: string;
        unit: string;
        "@vocab": string;
    })[];
    type: "Feature";
    geometry: {
        type: "Polygon";
        coordinates: number[][][]; // [ [ [lon, lat], ... ] ]
    };
    properties: {
        units: string; // "us"
        forecastGenerator: string;
        generatedAt: string;
        updateTime: string;
        validTimes: string;
        elevation: {
            unitCode: string; // "wmoUnit:m"
            value: number | null;
        };
        periods: TForecastPeriod[];
    };
};

export type TForecastPeriod = {
    number: number;
    name: string;
    startTime: string;
    endTime: string;
    isDaytime: boolean;
    temperature: number;
    temperatureUnit: string; // "F"
    temperatureTrend: string | null;
    probabilityOfPrecipitation: {
        unitCode: string; // "wmoUnit:percent"
        value: number | null;
    };
    windSpeed: string;
    windDirection: string;
    icon: string;
    shortForecast: string;
    detailedForecast: string;
};