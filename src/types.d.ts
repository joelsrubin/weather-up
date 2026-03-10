type TForecastData = {
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

type TForecastPeriod = {
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

type TWeatherPointResponse = {
    "@context": [
        "https://geojson.org/geojson-ld/geojson-context.jsonld",
        {
            "@version": "1.1";
            wx: "https://api.weather.gov/ontology#";
            s: "https://schema.org/";
            geo: "http://www.opengis.net/ont/geosparql#";
            unit: "http://codes.wmo.int/common/unit/";
            "@vocab": "https://api.weather.gov/ontology#";
            geometry: {
                "@id": "s:GeoCoordinates";
                "@type": "geo:wktLiteral";
            };
            city: "s:addressLocality";
            state: "s:addressRegion";
            distance: {
                "@id": "s:Distance";
                "@type": "s:QuantitativeValue";
            };
            bearing: {
                "@type": "s:QuantitativeValue";
            };
            value: {
                "@id": "s:value";
            };
            unitCode: {
                "@id": "s:unitCode";
                "@type": "@id";
            };
            forecastOffice: {
                "@type": "@id";
            };
            forecastGridData: {
                "@type": "@id";
            };
            publicZone: {
                "@type": "@id";
            };
            county: {
                "@type": "@id";
            };
        }
    ];
    id: string;
    type: "Feature";
    geometry: {
        type: "Point";
        coordinates: [number, number];
    };
    properties: {
        "@id": string;
        "@type": "wx:Point";
        cwa: string;
        type: "land";
        forecastOffice: string;
        gridId: string;
        gridX: number;
        gridY: number;
        forecast: string;
        forecastHourly: string;
        forecastGridData: string;
        observationStations: string;
        relativeLocation: {
            type: "Feature";
            geometry: {
                type: "Point";
                coordinates: [number, number];
            };
            properties: {
                city: string;
                state: string;
                distance: {
                    unitCode: string;
                    value: number;
                };
                bearing: {
                    unitCode: string;
                    value: number;
                };
            };
        };
        forecastZone: string;
        county: string;
        fireWeatherZone: string;
        timeZone: string;
        radarStation: string;
        astronomicalData: {
            sunrise: string;
            sunset: string;
            transit: string;
            civilTwilightBegin: string;
            civilTwilightEnd: string;
            nauticalTwilightBegin: string;
            nauticalTwilightEnd: string;
            astronomicalTwilightBegin: string;
            astronomicalTwilightEnd: string;
        };
        nwr: {
            transmitter: string;
            sameCode: string;
            areaBroadcast: string;
            pointBroadcast: string;
        };
    };
};