import React, { useState, useEffect } from 'react';

const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

interface WeatherData {
    name: string;
    main: {
        temp: number;
        feels_like: number;
        humidity: number;
        temp_min: number;
        temp_max: number;
    };
    wind: {
        speed: number;
    };
    weather: {
        description: string;
    }[];
    rain?: {
        '1h'?: number;
    };
}

const WeatherApp = () => {
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const initialCity = 'London';

    // API fetching function

    // useEffect hook

    return (
        <div className="weather-container">
            <h1>UK Weather Finder</h1>

            {loading && <p>Loading weather for {initialCity}...</p>}

            {error && <p style={{ color: 'red' }}>Error: {error}</p>}

            {weatherData && (
                <div>
                    <h2>Weather in {weatherData.name}</h2>
                    <p>Temperature: {weatherData.main.temp}°C</p>
                </div>
            )}
        </div>
    );
};

export default WeatherApp;